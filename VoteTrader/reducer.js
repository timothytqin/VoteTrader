import { combineReducers } from "redux";

const INITIAL_STATE = {
  authenticated: null
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "AUTHENTICATE":
      console.log("Authenticating: " + JSON.stringify(action.payload));
      return { authenticated: action.payload };
    default:
      return state;
  }
};

export default combineReducers({
  reducer: reducer
});
