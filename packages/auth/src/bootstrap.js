import React from "react";
import ReactDOM from "react-dom";
import { createMemoryHistory, createBrowserHistory } from "history";

import App from "./App";

// Mount function to start up the app
const mount = (el, { defaultHistory, onNavigate, initialPath }) => {
  const history =
    defaultHistory ||
    createMemoryHistory({
      initialEntries: [initialPath],
    });

  if (onNavigate) {
    history.listen(onNavigate);
  }

  ReactDOM.render(<App history={history} />, el);

  return {
    onParentNavigate(location) {
      const { pathname: nextPathname } = location;
      const { pathname } = history.location;

      console.log("nextPathName -chk", nextPathname);

      if (pathname !== nextPathname) {
        history.push(nextPathname);
      }
    },
  };
};

const AuthApp = App;

//  If we are in development and in isolation, call mount immediately
if (process.env.NODE_ENV === "development") {
  const devRoot = document.querySelector("#_auth-dev-root");

  if (devRoot) {
    mount(devRoot, { defaultHistory: createBrowserHistory() });
  }
}

// If we are running through container, we should export the mount function
export { mount, AuthApp };
