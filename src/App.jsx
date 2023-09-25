import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useAuthContext } from "./hook/useAuthContext";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Navbar from "./components/Navbar";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

function App() {
  const { authIsReady, user } = useAuthContext();

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          <Navbar />

          <Switch>
            <Route exact path="/">
              {!user && <Redirect to="/login" />}
              {user && <Home />}
            </Route>
            <Route exact path="/login">
              {!user && <Login />}
              {user && <Redirect to="/" />}
            </Route>
            <Route exact path="/signup">
              {!user && <Signup />}
              {user && <Redirect to="/" />}
            </Route>
          </Switch>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
