import {
  Resource,
  ResourceRefsProcessingConfig,
  ResourceRefType,
} from "../common/types.js";
import { NAME_REFNODE_PATH } from "../constants.js";
import { RefMapper } from "./mappers/index.js";

import { createImageRef } from "./utils/createImageRef.js";
import { createResourceRef, linkResources } from "./utils/createResourceRef.js";
import {
  joinPathParts,
  getResourceRefNodes,
} from "./utils/getResourceNodes.js";
import { isOptionalRef } from "./utils/helpers.js";
import { NodeWrapper } from "./utils/NodeWrapper.js";
import { shouldCreateSatisfiedRef } from "./utils/shouldCreateSatisfiedRef.js";
import { shouldCreateUnsatisfiedRef } from "./utils/shouldCreateUnsatisfiedRef.js";

/**
 * Creates resource refs from a specified resource to target resources using the specified refMapper
 */
export function handleRefMappingByKey(
  sourceResource: Resource,
  targetResources: Resource[],
  outgoingRefMapper: RefMapper,
  config: ResourceRefsProcessingConfig
) {
  const outgoingRefMapperSourcePath = joinPathParts(
    outgoingRefMapper.source.pathParts
  );
  const refNodes = getResourceRefNodes(sourceResource, config);
  const sourceRefNodes = refNodes
    ? refNodes[outgoingRefMapperSourcePath]
    : undefined;

  if (!sourceRefNodes) {
    return;
  }

  const sourceLineCounter = config.parser.parse(sourceResource).lineCounter;

  sourceRefNodes.forEach((sourceRefNode) => {
    const createRef =
      outgoingRefMapper.type === "image" ? createImageRef : createResourceRef;

    // if no target resources are found, then mark the source ref as unsatisfied
    if (targetResources.length === 0) {
      if (
        shouldCreateUnsatisfiedRef(
          outgoingRefMapper,
          config,
          sourceResource,
          sourceRefNode
        )
      ) {
        createRef(
          sourceResource,
          ResourceRefType.Unsatisfied,
          new NodeWrapper(sourceRefNode.scalar, sourceLineCounter),
          undefined,
          outgoingRefMapper.target.kind,
          isOptionalRef(
            sourceResource,
            sourceRefNode,
            outgoingRefMapper,
            config
          )
        );
      }
    } else {
      let hasSatisfiedRefs = false;

      targetResources.forEach((targetResource) => {
        const targetLineCounter =
          config.parser.parse(targetResource).lineCounter;

        if (outgoingRefMapper.type === "name") {
          if (targetResource.name === sourceRefNode.scalar.value) {
            if (
              shouldCreateSatisfiedRef(
                sourceRefNode,
                undefined,
                sourceResource,
                targetResource,
                outgoingRefMapper,
                config
              )
            ) {
              const targetRefNodes = getResourceRefNodes(
                targetResource,
                config
              );
              const targetNodes = targetRefNodes
                ? targetRefNodes[NAME_REFNODE_PATH]
                : undefined;
              hasSatisfiedRefs = true;
              linkResources(
                sourceResource,
                targetResource,
                new NodeWrapper(sourceRefNode.scalar, sourceLineCounter),
                targetNodes && targetNodes.length > 0
                  ? new NodeWrapper(targetNodes[0].scalar, targetLineCounter)
                  : undefined,
                isOptionalRef(
                  sourceResource,
                  sourceRefNode,
                  outgoingRefMapper,
                  config
                )
              );
            }
          }
        } else if (
          outgoingRefMapper.type === "path" &&
          outgoingRefMapper.target.pathParts
        ) {
          const outgoingRefMapperTargetPath = joinPathParts(
            outgoingRefMapper.target.pathParts
          );
          const targetRefNodes = getResourceRefNodes(targetResource, config);
          const targetNodes = targetRefNodes
            ? targetRefNodes[outgoingRefMapperTargetPath]
            : undefined;

          targetNodes?.forEach((targetNode) => {
            if (
              shouldCreateSatisfiedRef(
                sourceRefNode,
                targetNode,
                sourceResource,
                targetResource,
                outgoingRefMapper,
                config
              )
            ) {
              hasSatisfiedRefs = true;
              linkResources(
                sourceResource,
                targetResource,
                new NodeWrapper(sourceRefNode.scalar, sourceLineCounter),
                new NodeWrapper(targetNode.scalar, targetLineCounter),
                isOptionalRef(
                  sourceResource,
                  sourceRefNode,
                  outgoingRefMapper,
                  config
                )
              );
            }
          });
        }
      });

      if (
        !hasSatisfiedRefs &&
        shouldCreateUnsatisfiedRef(
          outgoingRefMapper,
          config,
          sourceResource,
          sourceRefNode
        )
      ) {
        createRef(
          sourceResource,
          ResourceRefType.Unsatisfied,
          new NodeWrapper(sourceRefNode.scalar, sourceLineCounter),
          undefined,
          outgoingRefMapper.target.kind,
          isOptionalRef(
            sourceResource,
            sourceRefNode,
            outgoingRefMapper,
            config
          )
        );
      }
    }
  });
}
