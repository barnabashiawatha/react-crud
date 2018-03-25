var React = require("react");
var Table = require("./Table.jsx");
var NoteAdder = require("./NoteAdder.jsx");
var createReactClass = require('create-react-class');
require("./Crud.css");

class Crud extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: [],
      login: this.props.login
    };

    this.handleAddNote = this.handleAddNote.bind(this);
    this.handleDeleteNote = this.handleDeleteNote.bind(this);
    this.handleEditNote = this.handleEditNote.bind(this);
    this._updateLocalStorage = this._updateLocalStorage.bind(this);
    this._loadLocalStorage = this._loadLocalStorage.bind(this);
  }

  handleAddNote(note) {
    var newNotes = this.state.notes;
    newNotes.unshift(note);


    this.setState({
      notes: newNotes
    });
  }

  handleDeleteNote(note) {
    var noteId = note.id;
    var newNotes = this.state.notes.filter(function(note) {
      return note.id !== noteId;
    });

    this.setState({
      notes: newNotes
    });
  }

  handleEditNote(note) {
    for (var i = 0; i < this.state.notes.length; i++) {
      if (this.state.notes[i].id == note.id) {
        var newNotes = this.state.notes;
        newNotes[i] = note;
        this.setState({
          notes: newNotes
        });
      }
    }
  }

  _updateLocalStorage() {
    var accounts = JSON.parse(localStorage.getItem("accounts"));

    for (var i = 0; i < accounts.length; i++) {
      if (accounts[i].login == this.state.login) {
        accounts[i].info = this.state.notes;
        localStorage.setItem("accounts", JSON.stringify(accounts));
      }
    }
  }

  _loadLocalStorage() {
    var accounts = JSON.parse(localStorage.getItem("accounts"));

    for (var i = 0; i < accounts.length; i++) {
      if (accounts[i].login == this.state.login) {
        this.setState({
          notes: accounts[i].info
        });
      }
    } 
  }

  render() {
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
  }

  componentWillMount() {
    this._loadLocalStorage();
  }

  componentDidUpdate() {
    this._updateLocalStorage();
  }
};

module.exports = Crud;