import React from "react";
import ReactDOM from "react-dom/client";
import "./css/index.css";
import App from "./App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware,compose } from "redux";
import allReducers from "./reducers/allReducers";
import thunk from "redux-thunk";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import createUploadLink from "apollo-upload-client/public/createUploadLink";

const httpLink = createUploadLink({
  uri: "https://testing.mawared-hr.com/graphql",
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization:
        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyIiwianRpIjoiMDMwZjllODlkZWIyMzVlYmRkNzkxYWRiZmNmNWU0NDNhOGRkZDAwNWIzMjM5OTRmM2JmYTQzNDU3NjM2MWU3MzI3ZTcyNDRhMDI1MjkyM2MiLCJpYXQiOjE2NTMwNzEyMTUuMzI3NDM3LCJuYmYiOjE2NTMwNzEyMTUuMzI3NDM5LCJleHAiOjE2ODQ2MDcyMTUuMzE4NjUxLCJzdWIiOiIzIiwic2NvcGVzIjpbXX0.hPisQC41bEzVfUCjDCOsc6MzIhD6JyXj9VumuLrxV2JcpdZ2IcGphJO1A_C0-vRIVgHbjPOJvRO2O97Fr1GMqVOtsV_MoZ9YHnzIhkCOI96sV2MNZNGjHDVZqZUKOQqnTI79JJ1o_ZwUA9vw2T5HLb193Npy0lsaDljEzj5kzQpnQRt5A-Y2m69a0pzsy-FSveih5tXqewdLSXoUu-Ec4YpnGTgO5vHAhAh1mb9w4OnXQkZV9oLfdw2-rYJfcdXgM8l-zxsrplu2IxWC1wUhSWMc19lmtVp1h9YWYoKaVQrmxElfDyx0Xqo4JlxRpGkiUGjPSVUU1GpVzDxCLtHQPecQhgQOQJH1W62tzG5Y_l3H4EftLotpRz3gx3rpCbTCeTYlL0APiyac6g9rXzRmOka5U71iYI2I4Zl-vmxeznqXiU5ltfYmBuEwMaIeA7XChzebOiCh_zpnrNt2ioCafaDf7AWVNjGY7OKPuKCGXuB-Qxh6CyaI9_x63pzNd8TVgN8j8fmIqXu2RmRQOqQ_RchudmV7sC4yWEjpBTtDCN5SzbQoumzAQHjhFD-QOR3gSAeeehjgW7T0dmVITxZGAseii9STakopQ98GuaNtKUJvjLN_DGiM6J7MHgvuqRm1SZ3q8yxqH4itVECdnHLtnOXjxZwvWiWn4vRW0eyk7BQ",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "network-only",
    },
  },
  cache: new InMemoryCache(),
});

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const store = createStore(
  allReducers,
  composeEnhancers(applyMiddleware(thunk))
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </Provider>
  </React.StrictMode>
);
