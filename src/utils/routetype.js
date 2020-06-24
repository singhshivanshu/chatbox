import React from "react";
import { Route, Redirect } from "react-router-dom";

export function PrivateRoute({ component: Component, authentication, ...rest }) {
    return (
      <Route
        {...rest}
        render={(props) =>
          authentication ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          )
        }
      />
    );
  }
  
  export function PublicRoute({ component: Component, authentication, ...rest}) {
      return (
          <Route
          {...rest}
          render={props => !authentication? (
              <Component {...props} />
          ):(
              <Redirect to= "/chat" />
          )}
           />
      )
  }