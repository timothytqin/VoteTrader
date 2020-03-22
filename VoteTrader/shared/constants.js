export const constants = {
  server: {
    localhost: "http://localhost:3000",
    ngrok: "http://b1466f27.ngrok.io"
  },
  urls: {
    login: "/auth/login",
    signup: "/auth/signup"
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
  asyncStorageKey: {
    auth: "votetraderauth",
    profile: "votetraderprofile"
  }
};
