import produce from "immer";
import { ActionType } from "../action-types";
import { Action } from "../actions";
import { Cell } from "../cell";

interface CellState {
  loading: boolean;
  error: string | null;
  order: string[]; // array of cell id's, i.e., ["ar1w", "br212", "hij", "z2fe"]
  data: {
    [cellId: string]: Cell;
  };
}

const initialState: CellState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const reducer = produce(
  (state: CellState = initialState, action: Action): CellState => {
    switch (action.type) {
      case ActionType.UPDATE_CELL:
        /*
         *  below code uses immer
         */
        state.data[action.payload.id].content = action.payload.content;
        return state;
      /*
       *  below return does not use immer
       */
      // return {
      //   ...state,
      //   data: {
      //     ...state.data,
      //     [action.payload.id]: {
      //       ...state.data[action.payload.id],
      //       content: action.payload.content,
      //     },
      //   },
      // };
      case ActionType.DELETE_CELL:
        delete state.data[action.payload];
        state.order = state.order.filter((id) => id !== action.payload);
        return state;
      case ActionType.MOVE_CELL:
        const { direction } = action.payload;
        const index = state.order.findIndex(
          (id) => id === action.payload.id
        );
        const targetIndex = direction === "up" ? index - 1 : index + 1;

        // check to make sure that the targetIndex is within order array bounds
        if (targetIndex < 0 || targetIndex > state.order.length - 1) {
          return state;
        }

        state.order[index] = state.order[targetIndex];
        state.order[targetIndex] = action.payload.id;

        return state;
      case ActionType.INSERT_CELL_BEFORE:
        const cell: Cell = {
          content: "",
          type: action.payload.type,
          id: randomId(),
        };

        state.data[cell.id] = cell;

        const foundIndex = state.order.findIndex(
          (id) => id === action.payload.id
        );

        if (foundIndex < 0) {
          state.order.push(cell.id);
        } else {
          state.order.splice(foundIndex, 0, cell.id);
        }

        return state;
      default: {
        return state;
      }
    }
  },
  initialState
);

const randomId = () => {
  return Math.random().toString(36).substring(2, 5);
};

export default reducer;
