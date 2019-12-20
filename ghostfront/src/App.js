import React, { Component } from "react";
import "./App.css";
import Messages from "./Messages.js";
import { NavLink, Route, withRouter } from "react-router-dom";
import { Switch } from "react-router";
import axios from "axios";

const API_HOST = "http://localhost:8000/boastsandroasts/";

class App extends Component {
  state = {
    content: "",
    is_boast: false,
    all_messages: []
  };

  componentDidMount() {
    fetch(API_HOST)
      .then(res => {
        return res.json();
      })
      .then(myJson => {
        console.log(JSON.stringify(myJson));
        console.log(this);
        this.setState({
          all_messages: myJson
        });
      });
  }

  handleReroute = () => {
    let path = '/';
    this.props.history.push(path);
  }

  handleCreateMessage = (is_boast, content)   => {
    let payload = JSON.stringify({
      is_boast: is_boast,
      content: content
    });
    axios
      .post(API_HOST, payload, {
        headers: { "Content-Type": "application/json" }
      })
      .then(res => {
        console.log(res);
        this.handleReroute()
      })
      .catch(error => {
        console.log(error);
      });
  };

  handlePost = event => {
    event.preventDefault();
    let content = event.target.children[3].value;
    let is_boast = event.target.children[1].checked;
    console.log(content, is_boast);
    this.setState({
      is_boast: is_boast,
      content: content
    });
    console.log(this.state);
    this.handleCreateMessage(is_boast, content);
  };
  render() {
    return (
      <React.Fragment>
        <Switch>
          <div>
            <NavLink to="/">Homepage</NavLink>
            <br></br>
            <NavLink to="/post">Post</NavLink>
            <br></br>
            <NavLink to="/boasts">Boasts</NavLink>
            <br></br>
            <NavLink to="/roasts">Roasts</NavLink>
            <br></br>
            <NavLink to="/upvoted">Upvote</NavLink>
            <br></br>
            <NavLink to="/downvoted">Downvote</NavLink>
          </div>
        </Switch>
        <Route
          exact
          path="/"
          render={() => <Messages all_messages={this.state.all_messages} />}
        ></Route>
        <Route
          path="/boasts"
          render={() => (
            <Messages
              all_messages={this.state.all_messages.filter(all_boasts => {
                if (all_boasts.is_boast === true) {
                  return all_boasts;
                } else {
                  return false;
                }
              })}
            />
          )}
        ></Route>
        <Route
          path="/roasts"
          render={() => (
            <Messages
              all_messages={this.state.all_messages.filter(all_roasts => {
                if (all_roasts.is_boast === false) {
                  return all_roasts;
                } else {
                  return false;
                }
              })}
            />
          )}
        ></Route>
        <Route
          path="/upvoted"
          render={() => (
            <Messages
              all_messages={this.state.all_messages.sort((upvote, downvote) => {
                return downvote.total_votes - upvote.total_votes;
              })}
            />
          )}
        />
        <Route
          path="/downvoted"
          render={() => (
            <Messages
              all_messages={this.state.all_messages.sort((upvote, downvote) => {
                return upvote.total_votes - downvote.total_votes;
              })}
            />
          )}
        />
        <Route
          path="/post"
          render={() => (
            <form onSubmit={this.handlePost}>
              <label>Boast</label>
              <input type="checkbox" value="boast" />
              <br />
              <input type="text" />
              <input type="submit" value="Submit" />
            </form>
          )}
        />
      </React.Fragment>
    );
  }
}

export default withRouter(App);
