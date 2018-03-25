var React = require("react");
var ReactDOM = require("react-dom");
var createReactClass = require('create-react-class');
require("./NoteAdder.css");

var NoteAdder = createReactClass({
  getInitialState: function() {
    return {
      name: ["", true],
      lastName: ["", true],
      address: ["", true],
      phone: ["", true]
    };
  },

  handleAddNote: function() {
    var name = this.state.name[0];
    var lastName = this.state.lastName[0];
    var address = this.state.address[0];
    var phone = this.state.phone[0];

    var note = {
      name: name,
      lastName: lastName,
      address: address,
      phone: phone,
      id: Date.now()
    };

    this.props.onNoteAdd(note);

    ReactDOM.findDOMNode(this.refs.name).value = "";
    ReactDOM.findDOMNode(this.refs.lastName).value = "";
    ReactDOM.findDOMNode(this.refs.address).value = "";
    ReactDOM.findDOMNode(this.refs.phone).value = "";

    this.setState({
      name: ["", true],
      lastName: ["", true],
      address: ["", true],
      phone: ["", true]
    });
  },

  onFieldChange: function(fieldName, event) {
    var note = [event.target.value.trim()]
    this.setState({
      ["" + fieldName]: note
    });

    if (event.target.value.trim().length > 0) {
      note[1] = false
      this.setState({
        [this.refs["" + fieldName]]: note
      });
    } else {
      note[1] = true;
      this.setState({
        [this.refs["" + fieldName]]: note
      });
    }
  },

  render: function() {
    var nameIsEmpty = this.state.name[1];
    var lastNameIsEmpty = this.state.lastName[1];
    var addressIsEmpty = this.state.address[1];
    var phoneIsEmpty = this.state.phone[1];
    var buttonMode = (nameIsEmpty || lastNameIsEmpty || addressIsEmpty || phoneIsEmpty);

    return (
      <table className="table">
        <tbody>
          <tr>
            <td className="table__cell">
              <input 
                type="text" 
                placeholder="Name"
                className="table__input" 
                onChange={this.onFieldChange.bind(this, "name")} 
                ref="name" />
            </td>
            <td className="table__cell">
              <input 
                type="text" 
                placeholder="Last name" 
                className="table__input" 
                onChange={this.onFieldChange.bind(this, "lastName")} 
                ref="lastName" />
            </td> 
            <td className="table__cell">
              <input 
                type="text" 
                placeholder="Address" 
                className="table__input" 
                onChange={this.onFieldChange.bind(this, "address")} 
                ref="address" />
            </td>
            <td className="table__cell">
              <input 
                type="text" 
                placeholder="Phone" 
                className="table__input" 
                onChange={this.onFieldChange.bind(this, "phone")} 
                ref="phone" />
            </td>
            <td className="table__cell table__cell_button">
              <button
                type="button"
                className={"button button_table-add " + ( buttonMode ? "button_disable" : "button_enable button_enable_table-add")} 
                onClick={this.handleAddNote}
                disabled={buttonMode}>
                add
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
});

module.exports = NoteAdder;