import { paramCase, sentenceCase } from "change-case";
import { JsonObject } from "type-fest";
import { Document, isNode, Node, ParsedNode } from "yaml";
import { AbstractPlugin } from "../../common/AbstractPlugin.js";
import { ResourceParser } from "../../common/resourceParser.js";
import { ValidationResult, ValidationRule } from "../../common/sarif.js";
import { Incremental, PluginMetadata, Resource } from "../../common/types.js";
import { createLocations } from "../../utils/createLocations.js";
import { PluginInit, ReportArgs, RuleInit } from "./config.js";

type Runtime = {
  validate: RuleInit["validate"];
};

/**
 * Validator for simple custom policies.
 */
export class SimpleCustomValidator extends AbstractPlugin {
  private _parser: ResourceParser;
  private _settings: any = {};
  private _ruleRuntime: Record<string, Runtime>;

  constructor(plugin: PluginInit, parser: ResourceParser) {
    super(toPluginMetadata(plugin), toSarifRules(plugin));
    this._parser = parser;
    this._ruleRuntime = toRuntime(plugin);
  }

  protected override async configurePlugin(
    rawSettings: JsonObject = {}
  ): Promise<void> {
    this._settings = rawSettings;
  }

  async doValidate(
    resources: Resource[],
    incremental?: Incremental
  ): Promise<ValidationResult[]> {
    const results: ValidationResult[] = [];

    const dirtyResources = incremental
      ? resources.filter((r) => incremental.resourceIds.includes(r.id))
      : resources;

    for (const rule of this.rules) {
      if (!this.isRuleEnabled(rule.id)) {
        continue;
      }

      const { validate } = this._ruleRuntime[rule.id];

      await validate(
        {
          resources: dirtyResources,
          allResources: resources,
          settings: this._settings,
        },
        {
          parse: (resource) => {
            return this._parser.parse(resource).parsedDoc;
          },
          report: (resource, args) => {
            const result = this.adaptToValidationResult(rule, resource, args);
            if (!result) return;
            results.push(result);
          },
        }
      );
    }

    return results;
  }

  private adaptToValidationResult(
    rule: ValidationRule,
    resource: Resource,
    args: ReportArgs
  ): ValidationResult | undefined {
    const { parsedDoc } = this._parser.parse(resource);

    const path = args.path.split(".");
    const node = determineClosestNodeForPath(parsedDoc, path);
    const region = node?.range
      ? this._parser.parseErrorRegion(resource, node.range)
      : undefined;

    const locations = createLocations(resource, region);

    return this.createValidationResult(rule.id, {
      message: {
        text: args.message ?? rule.shortDescription.text,
      },
      locations,
    });
  }
}

type YamlPath = Array<string | number>;

/**
 * Use a path hint to determine the node of the error or closest parent.
 *
 * Example:
 * - Hint: $container.securityContext.readOnlyRootFilesystem and desired value is `true`.
 * - When $container specifies `securityContext.readOnlyRootFilesystem` then it underlines the incorrect `false` value.
 * - When $container specifies `securityContext` then it underlines whole context object.
 * - When $container does not specify `securityContext` then it underlines whole container object.
 */
function determineClosestNodeForPath(
  resource: Document.Parsed<ParsedNode>,
  path: YamlPath,
  prefix: YamlPath = []
): Node | undefined {
  const currentPath = prefix.concat(path);

  while (currentPath.length > prefix.length) {
    const node = resource.getIn(currentPath, true);

    if (isNode(node)) {
      return node;
    }

    currentPath.pop();
  }

  const node = resource.getIn(currentPath, true);
  return isNode(node) ? node : undefined;
}

function toPluginMetadata(plugin: PluginInit): PluginMetadata {
  return {
    ...plugin,
    displayName: plugin.displayName ?? sentenceCase(plugin.name),
    icon: plugin.icon ?? "k8s-schema",
  };
}

function toSarifRules(plugin: PluginInit): ValidationRule[] {
  return Object.entries(plugin.rules).map(([name, r]) => {
    return {
      id: r.id,
      name: paramCase(name),
      shortDescription: {
        text: r.description,
      },
      fullDescription: {
        text: r.fullDescription ?? r.description,
      },
      help: {
        text: r.help ?? "No help available.",
      },
    };
  });
}

function toRuntime(plugin: PluginInit): Record<string, Runtime> {
  const entries = Object.entries(plugin.rules).map(([_, rule]) => {
    return [rule.id, { validate: rule.validate }];
  });

  return Object.fromEntries(entries);
}