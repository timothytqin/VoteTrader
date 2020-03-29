import store from "./store";
import { loadTrades } from "./actions";
import { constants } from "./shared/constants";
import { httpPostOptions } from "./shared/http";

export const fetchTrades = model => {
  console.log("Model: " + JSON.stringify(model));
  console.log("URL: " + constants.server.ngrok + constants.urls.getTrades);
  fetch(
    constants.server.ngrok + constants.urls.getTrades,
    httpPostOptions(model)
  )
    .then(res => res.json())
    .then(res => {
      console.log("Trade Response: " + res);
      store.dispatch(loadTrades(res));
    });
};
