export const constants = {
  urls: {
    login: "http://localhost:3000/auth/login",
    signup: "http://localhost:3000/auth/signup"
  },
  oauthConfigIOS: {
    issuer: "https://accounts.google.com",
    scopes: ["openid", "profile", "email"],
    clientId:
      "430219175681-2ukkf78koed14s9l50glk3pjjj5nplok.apps.googleusercontent.com"
  },
  oauthConfigAndroid: {
    issuer: "https://accounts.google.com",
    scopes: ["openid", "profile", "email"],
    clientId:
      "430219175681-honkp3d4epf8dh3lh0oeania0duonnej.apps.googleusercontent.com"
  },
  storageKey: "@MyApp:CustomGoogleOAuthKey"
};
