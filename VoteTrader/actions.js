export const authenticate = data => ({
  type: "AUTHENTICATE",
  payload: data
});

export const loadProfile = data => ({
  type: "LOAD_PROFILE",
  payload: data
});

export const loadHistoryTrades = data => ({
  type: "LOAD_HISTORY_TRADES",
  payload: data
});

export const loadMyTrades = data => ({
  type: "LOAD_MY_TRADES",
  payload: data
});

export const loadActiveTrades = data => ({
  type: "LOAD_ACTIVE_TRADES",
  payload: data
});

export const setTradeFilters = data => ({
  type: "SET_TRADE_FILTERS",
  payload: data
});
