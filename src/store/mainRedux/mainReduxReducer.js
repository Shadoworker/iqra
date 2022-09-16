import * as types from "./mainReduxActionTypes";
import initialState from "./mainReduxInitialState";

export default function mainReduxReducer(
  state = initialState.mainReduxState,
  action
) {
  switch (action.type) {
    
    case types.UPDATE_LETTERS_SECTION:
      return {
        ...state,
        currentLettersSection: action.data
      };

   

    default:
      return state;
  }
}
