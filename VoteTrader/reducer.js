import { combineReducers } from "redux";

const INITIAL_STATE = {
  authenticated: null,
  profile: null,
  trades: null
};

const reducer = (state = INITIAL_STATE, action) => {
  // Make sure you spread prev states before updating state
  switch (action.type) {
    case "AUTHENTICATE":
      console.log("Authenticating: " + JSON.stringify(action.payload));
      return { ...state, authenticated: action.payload };
    case "LOAD_PROFILE":
      console.log("Loading Profile: " + JSON.stringify(action.payload));
      return { ...state, profile: action.payload };
    case "LOAD_TRADES":
      console.log("Loading Trades: " + JSON.stringify(action.payload));
      return { ...state, trades: action.payload };
    default:
      return state;
  }
};

export default combineReducers({
  reducer: reducer
});
