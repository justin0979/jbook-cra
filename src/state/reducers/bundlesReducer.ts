import produce from "immer";
import { ActionType } from "../action-types";
import { Action } from "../actions";
import { stat } from "fs";

interface BundlesState {
  [cellId: string]: {
    loading: boolean; // tells if app is currently processing a bundle
    code: string;
    err: string;
  };
}

const initialState: BundlesState = {};

export const bundlesReducer = produce(
  (state: BundlesState = initialState, action: Action): BundlesState => {
    switch (action.type) {
      case ActionType.BUNDLE_START:
        return state;
      case ActionType.BUNDLE_COMPLETE:
        return state;
      default:
        return state;
    }
  },
  initialState
);
