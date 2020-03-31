import store from "./store";
import { loadActiveTrades } from "./actions";
import { constants } from "./shared/constants";
import { httpPostOptions } from "./shared/http";

export const fetchTrades = (type, model) => {
  switch (type) {
    case "Trade History":
      fetch(
        constants.server.ngrok + constants.urls.getTrades,
        httpPostOptions(model)
      )
        .then(res => res.json())
        .then(res => {
          store.dispatch(loadActiveTrades(res));
        });
    case "My Trades":
      fetch(
        constants.server.ngrok + constants.urls.getTrades,
        httpPostOptions(model)
      )
        .then(res => res.json())
        .then(res => {
          store.dispatch(loadActiveTrades(res));
        });
    case "Active Trades":
      fetch(
        constants.server.ngrok + constants.urls.getTrades,
        httpPostOptions(model)
      )
        .then(res => res.json())
        .then(res => {
          store.dispatch(loadActiveTrades(res));
        });
  }
  fetch(
    constants.server.ngrok + constants.urls.getTrades,
    httpPostOptions(model)
  )
    .then(res => res.json())
    .then(res => {
      store.dispatch(loadActiveTrades(res));
    });
};
