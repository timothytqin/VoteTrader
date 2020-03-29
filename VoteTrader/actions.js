export const authenticate = data => ({
  type: "AUTHENTICATE",
  payload: data
});

export const loadProfile = data => ({
  type: "LOAD_PROFILE",
  payload: data
});

export const loadTrades = data => ({
  type: "LOAD_TRADES",
  payload: data
});
