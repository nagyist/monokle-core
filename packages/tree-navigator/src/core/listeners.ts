import isEqual from "lodash.isequal";
import cloneDeep from "lodash.clonedeep";
import { triggerSectionListener, updateSectionInstance, updateTreeNavigatorState } from "../slice";
import {
  ItemInstance,
  ITreeNavigator,
  RtkListener,
  SectionBlueprint,
  SectionInstance,
  TreeNavigatorState,
} from "../types";
import { computeSectionCheckable } from "./checkable";
import { buildItemInstances } from "./itemBuilder";
import { getRowIndexToScroll, makeNavigatorRows } from "./rows";
import { buildSectionInstance } from "./sectionBuilder";
import { computeSectionVisibility } from "./visibility";

export const createTreeNavigatorListener = (treeNavigator: ITreeNavigator) => {
  const listener: RtkListener = {
    predicate: (action) => {
      if (action.type === updateSectionInstance.type) {
        console.log({ action });
        const sectionInstance: SectionInstance = action.payload.sectionInstance;
        return sectionInstance.treeNavigatorId === treeNavigator.id;
      }
      return false;
    },
    effect: async (action, { cancelActiveListeners, dispatch, getState }) => {
      cancelActiveListeners();

      const rootSectionId = treeNavigator.getRootSectionId();

      if (!rootSectionId) {
        return;
      }

      const state = getState();
      const treeNavigatorState = state.treeNavigator.stateByTreeNavigatorId[treeNavigator.id];

      if (!treeNavigatorState) {
        return;
      }

      const sectionInstanceMap: Record<string, SectionInstance> = cloneDeep(treeNavigatorState.sectionInstanceMap);
      const itemInstanceMap: Record<string, ItemInstance> = cloneDeep(treeNavigatorState.itemInstanceMap);

      const rootSectionInstance: SectionInstance | undefined = sectionInstanceMap[rootSectionId];
      if (!rootSectionInstance) {
        return;
      }
      const rootSectionBlueprint = treeNavigator.getSectionBlueprint(rootSectionInstance.id);
      if (!rootSectionBlueprint) {
        return;
      }
      computeSectionVisibility(treeNavigator, rootSectionInstance, sectionInstanceMap, rootSectionBlueprint);
      // this has to run after the `computeSectionVisibility` because it depends on the `section.visibleDescendantItemIds`
      Object.values(sectionInstanceMap).forEach((sectionInstance) => {
        if (sectionInstance.rootSectionId !== rootSectionId) {
          return;
        }
        const sectionBlueprint = treeNavigator.getSectionBlueprint(sectionInstance.id);
        if (!sectionBlueprint) {
          return;
        }
        const sectionScope = sectionBlueprint.getScope(state);
        computeSectionCheckable(sectionBlueprint, sectionInstance, sectionScope);
      });

      const navigatorRows = makeNavigatorRows(treeNavigator, rootSectionInstance, sectionInstanceMap, itemInstanceMap);

      const rowIndexToScroll = getRowIndexToScroll({ rows: navigatorRows, itemInstanceMap });

      const newNavigatorInstanceState: TreeNavigatorState = {
        sectionInstanceMap,
        itemInstanceMap,
        rows: navigatorRows,
        rowIndexToScroll,
        collapsedSectionIds: state.treeNavigator.stateByTreeNavigatorId[treeNavigator.id]?.collapsedSectionIds || [],
      };

      dispatch(updateTreeNavigatorState({ id: treeNavigator.id, state: newNavigatorInstanceState }));
    },
  };
  return listener;
};

export const createTreeNavigatorSectionListener = (
  treeNavigatorId: string,
  sectionBlueprint: SectionBlueprint<any>
) => {
  const listener: RtkListener = {
    predicate: (action, currentState, originalState) => {
      if (action.type === updateSectionInstance.type || action.type === updateTreeNavigatorState.type) {
        return false;
      }
      if (
        action.type === triggerSectionListener.type &&
        action.payload?.treeNavigatorId === treeNavigatorId &&
        action.payload?.sectionId === sectionBlueprint.id
      ) {
        return true;
      }
      const currentScope = sectionBlueprint.getScope(currentState);
      const originalScope = sectionBlueprint.getScope(originalState);
      return isEqual(currentScope, originalScope);
    },
    effect: async (action, { dispatch, getState, cancelActiveListeners }) => {
      console.log("Section Listener Effect");
      cancelActiveListeners();
      const state = getState();
      const treeNavigatorState = state.treeNavigator.stateByTreeNavigatorId[treeNavigatorId];
      const { collapsedSectionIds = [] } = treeNavigatorState || {};
      const sectionScope = sectionBlueprint.getScope(state);

      const itemInstanceMap: Record<string, ItemInstance> = {};

      const { itemInstances, rawItems } = buildItemInstances({
        treeNavigatorId,
        sectionBlueprint,
        sectionScope,
      });

      itemInstances.forEach((itemInstance) => {
        itemInstanceMap[itemInstance.id] = itemInstance;
      });

      const sectionInstance = buildSectionInstance({
        treeNavigatorId,
        sectionBlueprint,
        sectionScope,
        itemInstances,
        rawItems,
        collapsedSectionIds,
      });

      const lastVisibleItemId = sectionInstance.visibleItemIds.at(-1);
      if (lastVisibleItemId) {
        const lastVisibleItem = itemInstanceMap[lastVisibleItemId];
        if (lastVisibleItem) {
          itemInstanceMap[lastVisibleItemId] = {
            ...lastVisibleItem,
            isLast: true,
          };
        }
      }

      dispatch(
        updateSectionInstance({
          treeNavigatorId: sectionInstance.treeNavigatorId,
          sectionInstance,
          itemInstanceMap,
        })
      );
    },
  };

  return listener;
};
