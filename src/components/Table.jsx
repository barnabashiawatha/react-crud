var React = require("react");
var ReactDOM = require("react-dom");
var createReactClass = require('create-react-class');
require("./Table.css");

var Table = createReactClass({
  getInitialState: function() {
    return ({
      editDisable: true,
      buttonMode: 0,
      nameIsEmpty: false,
      lastNameIsEmpty: false,
      addressIsEmpty: false,
      phone: false
    });
  },

  handleOnDelete: function(note) {
    this.props.onNoteDelete(note);
  },

  handleOnEdit: function(note) {
    ReactDOM.findDOMNode(this.refs[note.id + 1]).disabled = !ReactDOM.findDOMNode(this.refs[note.id + 1]).disabled;
    ReactDOM.findDOMNode(this.refs[note.id + 2]).disabled = !ReactDOM.findDOMNode(this.refs[note.id + 2]).disabled;
    ReactDOM.findDOMNode(this.refs[note.id + 3]).disabled = !ReactDOM.findDOMNode(this.refs[note.id + 3]).disabled;
    ReactDOM.findDOMNode(this.refs[note.id + 4]).disabled = !ReactDOM.findDOMNode(this.refs[note.id + 4]).disabled;

    if (ReactDOM.findDOMNode(this.refs[note.id + 5]).buttonMode == 0) {
      ReactDOM.findDOMNode(this.refs[note.id + 5]).className = "button button_enable button_table";
      ReactDOM.findDOMNode(this.refs[note.id + 5]).buttonMode = "1";
      ReactDOM.findDOMNode(this.refs[note.id + 5]).innerHTML = "edit";

      var name = ReactDOM.findDOMNode(this.refs[note.id + 1]).value;
      var lastName = ReactDOM.findDOMNode(this.refs[note.id + 2]).value;
      var address = ReactDOM.findDOMNode(this.refs[note.id + 3]).value;
      var phone = ReactDOM.findDOMNode(this.refs[note.id + 4]).value;

      var newNote = {
        name: name,
        lastName: lastName,
        address: address,
        phone: phone,
        id: note.id
      };

      this.props.onNoteEdit(newNote);
    } else {
      ReactDOM.findDOMNode(this.refs[note.id + 5]).className = "button button_enable button_table_edit";
      ReactDOM.findDOMNode(this.refs[note.id + 5]).buttonMode = "0";
      ReactDOM.findDOMNode(this.refs[note.id + 5]).innerHTML = "ok";
    }
  },

  onFieldChange: function(note) {
    var name = ReactDOM.findDOMNode(this.refs[note.id + 1]).value.length > 0;
    var lastName = ReactDOM.findDOMNode(this.refs[note.id + 2]).value.length > 0;
    var address = ReactDOM.findDOMNode(this.refs[note.id + 3]).value.length > 0;
    var phone = ReactDOM.findDOMNode(this.refs[note.id + 4]).value.length > 0;
    var buttonMode = (name && lastName && address && phone);

    if (buttonMode) {
      ReactDOM.findDOMNode(this.refs[note.id + 5]).disabled = false;
      ReactDOM.findDOMNode(this.refs[note.id + 5]).className = "button button_enable button_table_edit";
    } else {
      ReactDOM.findDOMNode(this.refs[note.id + 5]).disabled = true;
      ReactDOM.findDOMNode(this.refs[note.id + 5]).className = "button button_table_disable";
    }
  },

  render: function() {
    return (
      <table className="table">
        <thead>
          <tr className="table__row">
            <th className="table__cell table__cell_th">Name</th>
            <th className="table__cell table__cell_th">last name</th>
            <th className="table__cell table__cell_th">Address</th>
            <th className="table__cell table__cell_th">Phone</th>
            <th className="table__cell table__cell_th">Edit</th>
            <th className="table__cell table__cell_th">Delete</th>
          </tr>
        </thead>
        <tbody>
          {
            this.props.notes.map(function(note) {
              return (
                <tr key={note.id} >
                  <td className="table__cell">
                    <input 
                      type="text" 
                      defaultValue={note.name} 
                      className="table__input" 
                      disabled={this.state.editDisable}
                      onChange={this.onFieldChange.bind(this, note)}
                      ref={note.id + 1} />
                  </td>
                  <td className="table__cell">
                    <input 
                      type="text" 
                      defaultValue={note.lastName} 
                      className="table__input" 
                      disabled={this.state.editDisable}
                      onChange={this.onFieldChange.bind(this, note)}
                      ref={note.id + 2} />
                  </td>
                  <td className="table__cell">
                    <input 
                      type="text" 
                      defaultValue={note.address} 
                      className="table__input" 
                      disabled={this.state.editDisable}
                      onChange={this.onFieldChange.bind(this, note)}
                      ref={note.id + 3} />
                  </td>
                  <td className="table__cell">
                    <input 
                      type="text" 
                      defaultValue={note.phone} 
                      className="table__input" 
                      disabled={this.state.editDisable}
                      onChange={this.onFieldChange.bind(this, note)}
                      ref={note.id + 4} />
                  </td>
                  <td className="table__cell table__cell_button">
                    <button 
                      type="button"
                      buttonMode="0"
                      className={"button button_enable button_table"}
                      onClick={this.handleOnEdit.bind(null, note)}
                      ref={note.id + 5} >
                      edit
                    </button>
                  </td>
                  <td className="table__cell table__cell_button">
                    <button type="button" 
                      className="button button_enable button_table" 
                      onClick={this.handleOnDelete.bind(null, note)} >
                      delete
                    </button>
                  </td>
                </tr>   
              );
            }, this)
          }
        </tbody>
      </table>
    );
  }
});

module.exports = Table;