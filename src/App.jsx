import { BrowserRouter, Switch, Route } from "react-router-dom";

//import pages
import Create from "./pages/create/Create";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Project from "./pages/project/Project";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="container">
          <Switch>
            <Route exact path="/">
              <Dashboard />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/create">
              <Create />
            </Route>
            <Route path="/projects/:id">
              <Project />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
