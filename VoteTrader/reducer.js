import { combineReducers } from "redux";

export const INITIAL_STATE = {
  authenticated: null,
  profile: {
    _id: "",
    username: "",
    email: "",
    password: "",
    thumbnail: ""
  },
  trades: {
    history: [],
    myTrades: [],
    activeTrades: []
  },
  filters: {
    author: "",
    policy: "",
    scope: "",
    tags: []
  }
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
    case "LOAD_HISTORY_TRADES":
      console.log("Loading Trade History: " + JSON.stringify(action.payload));
      return {
        ...state,
        trades: { ...state.trades, history: action.payload }
      };
    case "LOAD_MY_TRADES":
      console.log("Loading My Trades: " + JSON.stringify(action.payload));
      return {
        ...state,
        trades: { ...state.trades, myTrades: action.payload }
      };
    case "LOAD_ACTIVE_TRADES":
      console.log("Loading Active Trades: " + JSON.stringify(action.payload));
      return {
        ...state,
        trades: { ...state.trades, activeTrades: action.payload }
      };
    case "SET_TRADE_FILTERS":
      console.log("Setting Trade Filters: " + JSON.stringify(action.payload));
      return { ...state, filters: action.payload };
    default:
      return state;
  }
};

export default combineReducers({
  reducer: reducer
});
