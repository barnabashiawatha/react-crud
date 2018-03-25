var React = require("react");
var ReactDOM = require("react-dom");
var createReactClass = require('create-react-class');
require("./Login.css");

var Login = createReactClass({
  getInitialState: function() {
    return {
      loginIsEmpty: true,
      passwordIsEmpty: true,
      infoMassageText: "",
    };
  },

  onFieldChange: function(fieldName, event) {
    if (event.target.value.trim().length > 0) {
      this.setState({["" + fieldName]: false});
    } else {
      this.setState({["" + fieldName]: true});
    }
  },

  handleLogin: function() {
    var login = ReactDOM.findDOMNode(this.refs.login).value;
    var password = ReactDOM.findDOMNode(this.refs.password).value;

    var account = [{
      login: login,
      password: password
    }];

    this._checkLocalStorage(account);
    ReactDOM.findDOMNode(this.refs.login).value = "";
    ReactDOM.findDOMNode(this.refs.password).value = "";

    this.setState({
      loginIsEmpty: true,
      passwordIsEmpty: true
    });
  },

  _checkLocalStorage: function(account) {
    var accounts = JSON.parse(localStorage.getItem("accounts"));

    if (accounts) {
      for (var i = 0; i < accounts.length; i++) {
        if ((accounts[i].login == account[0].login) && (accounts[i].password == account[0].password)) {
          this.setState({
            infoMassageText: "Login complete!"
          });
          this.props.onLogin(account[0].login);
          return;
        } else {
          continue;
        }
      }

      this.setState({
        infoMassageText: "No account matches these login and password."
      });
    }

    this.setState({
        infoMassageText: "No account matches these login and password."
    });
  },

  componentDidMount: function() {
    ReactDOM.findDOMNode(this.refs.login).focus();
  },

  render: function() {
    var loginIsEmpty = this.state.loginIsEmpty;
    var passwordIsEmpty = this.state.passwordIsEmpty;
    var infoMassageText = this.state.infoMassageText;
    var buttonMode = (loginIsEmpty || passwordIsEmpty);

    return (
      <div>
        <form className="form">
          <fieldset className="form__fieldset">
            <legend>Sign up</legend>
            <input 
              className="login" 
              type="text" 
              placeholder="login"
              defaultValue=""
              onChange={this.onFieldChange.bind(this, "loginIsEmpty")}
              ref="login" />
            <input 
              className="password" 
              type="password" 
              placeholder="password"
              defaultValue=""
              onChange={this.onFieldChange.bind(this, "passwordIsEmpty")}
              ref="password" />
            <button 
              className={"button button_up " + (buttonMode ? "button_disable" : "button_enable")} 
              type="button" 
              onClick={this.handleLogin}
              disabled={buttonMode}>
              Log in
            </button>
            <button 
              className="button button_enable"  
              onClick={this.props.onSignUp}>
              Sign up
            </button>
          </fieldset>
        </form>
        <p className="form-massage">{infoMassageText}</p>
      </div>
    );
  }
});

module.exports = Login;