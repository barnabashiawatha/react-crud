var React = require("react");
var ReactDOM = require("react-dom");
var createReactClass = require('create-react-class');
require("./Register.css");

var Register = createReactClass({
  getInitialState: function() {
    return {
      loginIsEmpty: true,
      passwordIsEmpty: true,
      buttonMode: false,
      infoMassageText: ""
    };
  },

  onFieldChange: function(fieldName, event) {
    if (event.target.value.trim().length > 0) {
      this.setState({["" + fieldName]: false});
    } else {
      this.setState({["" + fieldName]: true})
    }
  },

  componentDidMount: function() {
    ReactDOM.findDOMNode(this.refs.login).focus();
  },

  handleRegister: function() {
    var login = ReactDOM.findDOMNode(this.refs.login).value;
    var password = ReactDOM.findDOMNode(this.refs.password).value;

    var account = [{
      login: login,
      password: password,
      info: []
    }];

    this._updateLocalStorage(account);

    ReactDOM.findDOMNode(this.refs.login).value = "";
    ReactDOM.findDOMNode(this.refs.password).value = "";

    this.setState({
      loginIsEmpty: true,
      passwordIsEmpty: true
    });
  },

  _updateLocalStorage: function(account) {
    var accounts = JSON.parse(localStorage.getItem("accounts"));

    if (accounts) {
      for (var i = 0; i < accounts.length; i++) {
        if (accounts[i].login != account[0].login) {
          continue;
        } else {
          this.setState({
            infoMassageText: "This login is already taken."
          });
          return;
        }
      }

      accounts.push(account[0]);
      localStorage.setItem("accounts", JSON.stringify(accounts));
      this.setState({
        infoMassageText: "Registration complete."
      });
      return;
    }

    localStorage.setItem("accounts", JSON.stringify(account));
    this.setState({
      infoMassageText: "Registration complete."
    });     
  },

  render: function() {
    var loginIsEmpty = this.state.loginIsEmpty;
    var passwordIsEmpty = this.state.passwordIsEmpty;
    var buttonMode = (loginIsEmpty || passwordIsEmpty);
    var infoMassageText = this.state.infoMassageText;

    return (
      <div>
        <form className="form">
          <fieldset className="form__fieldset">
            <legend>Sign in</legend>
            <input 
              className="login" 
              type="text" 
              name="login" 
              placeholder="login"
              onChange={this.onFieldChange.bind(this, "loginIsEmpty")}
              defaultValue=""
              ref="login" />
            <input 
              className="password" 
              type="password" 
              name="password"
              placeholder="password"
              defaultValue=""
              onChange={this.onFieldChange.bind(this, "passwordIsEmpty")}
              ref="password" />
            <button 
              className={"button button_up " + (buttonMode ? "button_disable" : "button_enable")} 
              type="button"
              onClick={this.handleRegister}
              disabled={passwordIsEmpty || loginIsEmpty}>
              Register  
            </button>
            <button 
              className="button button_enable"
              onClick={this.props.onSignIn}>
              Sign in
            </button>
          </fieldset>
        </form>
        <p className="form-massage">{infoMassageText}</p>
      </div>
    );
  }
});

module.exports = Register;