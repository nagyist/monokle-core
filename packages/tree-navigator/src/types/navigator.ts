import { SectionBlueprint } from "./blueprint";
import { ItemInstance, SectionInstance } from "./instance";
import { StartListening, StopListening } from "./rtk";

export type TreeNavigatorRowSection = {
  type: "section";
  sectionId: string;
  treeNavigatorId: string;
  level: number; // TODO: is the level needed?
  fontSize: number;
  indentation: number;
  height: number;
  marginBottom: number;
};

export type TreeNavigatorRowItem = {
  type: "item";
  itemId: string;
  treeNavigatorId: string;
  sectionId: string;
  level: number;
  fontSize: number;
  indentation: number;
  height: number;
  marginBottom: number;
};

/**
 * This model represents the virtualized rows that will be rendered using react-virtual
 */
export type TreeNavigatorRow = TreeNavigatorRowSection | TreeNavigatorRowItem;

export type TreeNavigatorCustomization = {
  beforeInitializationText?: string;
  empty?: {
    component?: React.ComponentType;
  };
};

export type TreeNavigatorState = {
  sectionInstanceMap: Record<string, SectionInstance>;
  itemInstanceMap: Record<string, ItemInstance>;
  rows: TreeNavigatorRow[];
  rowIndexToScroll: number | undefined;
  collapsedSectionIds: string[];
};

export type TreeNavigatorRendererComponent = (props: { height: number }) => JSX.Element;

export interface ITreeNavigator {
  readonly id: string;
  readonly Renderer: TreeNavigatorRendererComponent;
  // startListeners(startListening: StartListening): void;
  // stopListeners(stopListening: StopListening): void;
  getRootSectionId(): string | undefined;
  getCustomization(): TreeNavigatorCustomization | undefined;
  getSectionBlueprint(sectionId: string): SectionBlueprint<any, any> | undefined;
  setRootSectionId(rootSectionId: string): void;
  registerSection<RawItemType, ScopeType>(sectionBlueprint: SectionBlueprint<RawItemType, ScopeType>): void;
  unregisterSection(sectionId: string): void;
  registerChildSection<RawItemType, ScopeType>(
    parentSectionId: string,
    sectionBlueprint: SectionBlueprint<RawItemType, ScopeType>
  ): void;
  unregisterChildSection(parentSectionId: string, sectionId: string): void;
}