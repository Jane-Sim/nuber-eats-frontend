import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/client/react";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./styles/styles.css";
import { client } from "./apollo";

// graphql과 연동을 위해, react에 Apollo Provider를 추가한다.
ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
