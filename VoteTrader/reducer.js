import { combineReducers } from "redux";

const INITIAL_STATE = {
  authenticated: null,
  profile: null
};

const reducer = (state = INITIAL_STATE, action) => {
  // Make sure you spread prev states before updating state
  switch (action.type) {
    case "AUTHENTICATE":
      console.log("Authenticating: " + JSON.stringify(action.payload));
      global.authenticated = true;
      return { ...state, authenticated: action.payload };
    case "LOAD_PROFILE":
      console.log("Loading Profile: " + JSON.stringify(action.payload));
      return { ...state, profile: action.payload };
    default:
      return state;
  }
};

export default combineReducers({
  reducer: reducer
});
