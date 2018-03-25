var React = require("react");
var Table = require("./Table.jsx");
var NoteAdder = require("./NoteAdder.jsx");
var createReactClass = require('create-react-class');
require("./Crud.css");

var Crud = createReactClass({
  getInitialState: function() {
     return ({
      notes: [],
      login: this.props.login
     });
  },

  handleAddNote: function(note) {
    var newNotes = this.state.notes;
    newNotes.unshift(note);


    this.setState({
      notes: newNotes
    });
  },

  handleDeleteNote: function(note) {
    var noteId = note.id;
    var newNotes = this.state.notes.filter(function(note) {
      return note.id !== noteId;
    });

    this.setState({
      notes: newNotes
    });
  },

  handleEditNote: function(note) {
    for (var i = 0; i < this.state.notes.length; i++) {
      if (this.state.notes[i].id == note.id) {
        var newNotes = this.state.notes;
        newNotes[i] = note;
        this.setState({
          notes: newNotes
        });
      }
    }
  },

  _updateLocalStorage: function() {
    var accounts = JSON.parse(localStorage.getItem("accounts"));

    for (var i = 0; i < accounts.length; i++) {
      if (accounts[i].login == this.state.login) {
        accounts[i].info = this.state.notes;
        localStorage.setItem("accounts", JSON.stringify(accounts));
      }
    }
  },

  _loadLocalStorage: function() {
    var accounts = JSON.parse(localStorage.getItem("accounts"));

    for (var i = 0; i < accounts.length; i++) {
      if (accounts[i].login == this.state.login) {
        this.setState({
          notes: accounts[i].info
        });
      }
    } 
  },

  render: function() {
    return (
      <div className="crud">
        
        <NoteAdder onNoteAdd={this.handleAddNote} />
        <Table 
          notes={this.state.notes} 
          onNoteDelete={this.handleDeleteNote} 
          onNoteEdit={this.handleEditNote} 
          login={this.state.login} />
      </div>
    );
  },

  componentWillMount: function() {
    this._loadLocalStorage();
  },

  componentDidUpdate: function() {
    this._updateLocalStorage();
  }
});

module.exports = Crud;