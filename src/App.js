import React from 'react';
import './App.scss';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";

import FroalaExample from './components/editor/FroalaExample';
import EditorJsExample from './components/editor/EditorJsExample';
import CodoxExample from './components/editor/CodoxExample';

function App() {
  
  return (
    // <div className="App">
    //   {/* <ScriptTag type="text/javascript" src="src/assets/js/customPlugin.js"/> */}
    //   {/* <CodoxExample name="Siva Sai" />
    //   <CodoxExample name="Sushanth K" /> */}
    //   <div className="header">
    //     <label>Text editor</label>
    //   </div>
    //   <div className="editorDiv">
    //     <FroalaExample />
    //     {/* <TapableEditor /> */}
    //     {/* <EditorJsExample /> */}
    //   </div>
    // </div>
    <div className="app">
      <Router>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#">Editors POC</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <div className="nav-link"><NavLink to="/froala" exact strict>Froala</NavLink></div>
              </li>
              <li className="nav-item">
                <div className="nav-link"><NavLink to="/editorjs" exact strict>Editor JS</NavLink></div>
              </li>
              <li className="nav-item">
                <div className="nav-link"><NavLink to="/codoxUser1" exact strict>Codox User1</NavLink></div>
              </li>
              <li className="nav-item">
                <div className="nav-link"><NavLink to="/codoxUser2" exact strict>Codox User2</NavLink></div>
              </li>
            </ul>
          </div>
        </nav>
        <div className="editorsDiv">
          <Switch>
            <Route path="/froala">
              <FroalaExample />
            </Route>
            <Route path="/editorjs">
              <EditorJsExample />
            </Route>
            <Route path="/codoxUser1">
              <CodoxExample name="Siva Sai" />
            </Route>
            <Route path="/codoxUser2">
              <CodoxExample name="Sushanth K" />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
