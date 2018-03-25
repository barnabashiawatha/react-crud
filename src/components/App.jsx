var React = require("react");
var Login = require("./Login.jsx");
var Register = require("./Register.jsx");
var Crud = require("./Crud.jsx");
var createReactClass = require('create-react-class');

var App = createReactClass({
  getInitialState: function() {
    return {
      inputRegisterLoginValue: "",
      inputRegisterPasswordValue: "",
      mode: 0,
      login: ""
    };
  },

  handleSignUp: function() {
    this.setState({ mode: 1 });
  },

  handleSignIn: function() {
    this.setState({ mode: 0 });
  },

  handleMode: function() {
    this.setState({ mode: 2 });
  },

  handleLogin: function(login) {
    this.setState({ 
      login: login,
      mode: 2 
    });
  },

  render: function() {
    if (this.state.mode == 0) {
      return (
        <Login onSignUp={this.handleSignUp} onLogin={this.handleLogin} />
      );
    } else if (this.state.mode == 1) {
      return (
        <Register onSignIn={this.handleSignIn} />
      );
    } else if (this.state.mode == 2) {
      return (
        <Crud login={this.state.login} />
      );
    }
  }
});

module.exports = App;