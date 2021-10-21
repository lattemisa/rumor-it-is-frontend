import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Articles from "./components/Articles";
import LoginPopUp from "./components/LoginPopUp";
import { useState } from "react";
import Logout from "./components/Logout";
import SingleArticle from "./components/SingleArticle";

function App() {
  const [topics, setTopics] = useState([]);

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Nav topics={topics} setTopics={setTopics} />
        <Switch>
          <Route exact path="/articles">
            <Articles topics={topics} />
          </Route>
          <Route exact path="/login">
            <LoginPopUp />
          </Route>
          <Route exact path="/logout">
            <Logout />
          </Route>
          <Route exact path="/user">
            <Articles topics={topics} />
          </Route>
          <Route exact path="/articles/:topic">
            <Articles topics={topics} />
          </Route>
          <Route exact path="/article/:article_id">
            <SingleArticle />
          </Route>
          <Route exact path="/user">
            <Articles />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
