import * as actionTypes from "./mainReduxActionTypes";

export function update_letters_section(data) {
  return {
    type: actionTypes.UPDATE_LETTERS_SECTION,
    data
  };
}

