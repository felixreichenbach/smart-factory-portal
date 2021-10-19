import logo from "./logo.svg";
import React from "react";
import "./App.css";
import { LoginForm } from "./LoginForm";
import { ContentView } from "./ContentView";
import { StatusBar } from "./StatusBar";

import * as Realm from "realm-web";

// Apollo
import {
  ApolloProvider,
  ApolloClient,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { OrderForm } from "./OrderForm";


// Connect to your MongoDB Realm app
const APP_ID = "YOUR-REALM-APP-ID";
const app = new Realm.App(APP_ID);


// Configure the ApolloClient to connect to your app's GraphQL endpoint
const client = new ApolloClient({
  link: new HttpLink({
    uri: `https://us-east-1.aws.realm.mongodb.com/api/client/v2.0/app/${APP_ID}/graphql`,
    // We define a custom fetch handler for the Apollo client that lets us authenticate GraphQL requests.
    // The function intercepts every Apollo HTTP request and adds an Authorization header with a valid
    // access token before sending the request.

    fetch: async (uri, options) => {
      const accessToken = await getValidAccessToken();
      options.headers.Authorization = `Bearer ${accessToken}`;
      return fetch(uri, options);
    },
  }),
  cache: new InMemoryCache(),
});

// Gets a valid Realm user access token to authenticate requests
async function getValidAccessToken() {
  // Guarantee that there's a logged in user with a valid access token
  if (!app.currentUser) {
    console.log("Error: No CurrentUser!");
  } else {
    // An already logged in user's access token might be stale. To guarantee that the token is
    // valid, we refresh the user's custom data which also refreshes their access token.
    await app.currentUser.refreshCustomData();
  }
  return app.currentUser.accessToken;
}


function App(props) {
  // Keep the logged in Realm user in local state. This lets the app re-render
  // whenever the current user changes (e.g. logs in or logs out).
  const [user, setUser] = React.useState(app.currentUser);

  // Conditional Rendering ->> https://reactjs.org/docs/conditional-rendering.html  

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div>
          {user ? (
            <ApolloProvider client={client}>
              <ContentView />
              <OrderForm app={app} />
              </ApolloProvider>
          ) : (
            <LoginForm app={app} setUser={setUser} />
          )}
        {user ? <StatusBar app={app} setUser={setUser} /> : <div />}
      </div>
    </div>
  );
}

export default App;
