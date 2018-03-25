var React = require("react");
var Login = require("./Login.jsx");
var Register = require("./Register.jsx");
var Crud = require("./Crud.jsx");

class App extends React.Component {
  constructor(props) {
    super(props);

      this.state = {
      inputRegisterLoginValue: "",
      inputRegisterPasswordValue: "",
      mode: 0,
      login: ""
    }

    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleMode = this.handleMode.bind(this);
  }

  handleSignUp() {
    this.setState({ mode: 1 });
  }

  handleSignIn() {
    this.setState({ mode: 0 });
  }

  handleMode() {
    this.setState({ mode: 2 });
  }

  handleLogin(login) {
    this.setState({ 
      login: login,
      mode: 2 
    });
  }

  render() {
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
}

module.exports = App;