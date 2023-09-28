import "./App.css";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useAuthContext } from "./hook/useAuthContext";

//import pages
import Create from "./pages/create/Create";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Project from "./pages/project/Project";

//import components
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

function App() {
  const { user, authIsReady } = useAuthContext();

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          <Sidebar />
          <div className="container">
            <Navbar />
            <Switch>
              <Route exact path="/">
                {user && <Dashboard />}
                {!user && <Redirect to="/login" />}
              </Route>
              <Route path="/login">
                {user && <Dashboard />}
                {!user && <Login />}
              </Route>
              <Route path="/signup">
                {user && <Dashboard />}
                {!user && <Signup />}
              </Route>
              <Route path="/create">
                {!user && <Login />}
                {user && <Create />}
              </Route>
              <Route path="/projects/:id">
                {!user && <Login />}
                {user && <Project />}
              </Route>
            </Switch>
          </div>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
