import { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import EsportsList from "./components/esports-list.component";
import AddEsports from "./components/add-esports.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-primary">
          <Link to={"/esports"} className="navbar-brand font-Roboto">
            TrialProject
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/esports"} className="nav-link">
                Esports
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add Esports
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3 ">
          <h2 className="text-primary mt-5 mb-5 font-Roboto">
            A Simple CRUD Application Using React-Typescript with FireBase
          </h2>
          <Switch>
            <Route exact path={["/", "/esports"]} component={EsportsList} />
            <Route exact path="/add" component={AddEsports} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
