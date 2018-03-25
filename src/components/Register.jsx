var React = require("react");
var ReactDOM = require("react-dom");
require("./Register.css");

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loginIsEmpty: true,
      passwordIsEmpty: true,
      buttonMode: false,
      infoMassageText: ""
    };

    this.onFieldChange - this.onFieldChange.bind(this);
    this.componentDidMount - this.componentDidMount.bind(this);
    this.handleRegister - this.handleRegister.bind(this);
    this._updateLocalStorage - this._updateLocalStorage.bind(this);
  }

  onFieldChange(fieldName, event) {
    if (event.target.value.trim().length > 0) {
      this.setState({["" + fieldName]: false});
    } else {
      this.setState({["" + fieldName]: true})
    }
  }

  componentDidMount() {
    ReactDOM.findDOMNode(this.refs.login).focus();
  }

  handleRegister() {
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
  }

  _updateLocalStorage(account) {
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
  }

  render() {
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
              onClick={this.handleRegister.bind(this)}
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
};

module.exports = Register;