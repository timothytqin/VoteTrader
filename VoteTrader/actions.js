export const authenticate = data => ({
  type: "AUTHENTICATE",
  payload: data
});

export const loadProfile = data => ({
  type: "LOAD_PROFILE",
  payload: data
});
