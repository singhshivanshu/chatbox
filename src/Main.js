import React, { useState, useEffect } from "react";
import { PrivateRoute, PublicRoute } from "./utils/routetype";
import { Route, Switch } from "react-router-dom";
import { auth } from "./firebase/firebase";
import WelcomePage from "./pages/Welcome";
import Chat from "./pages/Chat";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

function Main(props) {
  const [authentication, setAuthentication] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (user) {
        setAuthentication(true);
        setLoading(false);
      } else {
        setAuthentication(false);
        setLoading(false);
      }
    });
    console.log(authentication);
  }, []);

  useEffect(() => {
    props.callBackFromApp(authentication);
  }, [authentication]);

  return (
    <div>
      {loading ? (
        <div>
          <span>loading....</span>
        </div>
      ) : (
        <Switch>
          <Route exact path="/" component={WelcomePage} />
          <PrivateRoute
            authentication={authentication}
            path="/chat"
            component={Chat}
          />
          <PublicRoute
            authentication={authentication}
            path="/signup"
            component={Signup}
          />
          <PublicRoute
            authentication={authentication}
            path="/login"
            component={Login}
          />
        </Switch>
      )}
    </div>
  );
}

export default Main;
