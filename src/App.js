import React, { Component } from 'react';
import './App.css';
import contactsjson from './contacts.json';

class App extends Component {
  state = {
    contacts: contactsjson.slice(0,5),
  };

  render() {
    const ContactList = (props) => {
      return (
        <tr>
        <td><img className="img_list" src={props.pictureUrl} alt={props.name}/></td>
        <td><h3>{props.name}</h3></td>
        <td><p>{props.popularity}</p></td>
        <td><button onClick={() => this.deleteContact(props.contactID)}>Delete</button></td>
        </tr>
      )
    }

    const allContact = this.state.contacts.map (function (contact) {
      return(
        <ContactList key={contact.id} contactID={contact.id} pictureUrl={contact.pictureUrl} name={contact.name} popularity={contact.popularity.toFixed(2)} />
      )
    })

    return (
      <div>
        <h1>IronContacts</h1>
        <button onClick={this.addNewRandom}>Add Random Contact</button>
        <button onClick={this.sortByName}>Sort by name</button>
        <button onClick={this.sortByPopularity}>Sort by popularity</button>
        <table>
          <thead>
            <tr>
              <th>Picture</th>
              <th>Name</th>
              <th>Popularity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{allContact}</tbody>
        </table>
      </div>
    )
  }

  addNewRandom = () => {
    let randomContact;
    let inList = true;
    while (inList) {
      randomContact = contactsjson[Math.floor(Math.random()*contactsjson.length)];
      inList=false;
      this.state.contacts.forEach((e) => {
        if (e.name === randomContact.name) {
          inList = true;
        }
      });
    }
    this.setState({
      contacts: [...this.state.contacts, randomContact],
    });
  }

  sortByName = () => {
    const contactsCopy = [...this.state.contacts];
    let sortedContacts = contactsCopy.sort(function (a, b) {return a.name > b.name 
      ? 
        1 
      : 
        -1;
    });

    this.setState({
      contacts: sortedContacts
    });
  }

  sortByPopularity = () => {
    let contactsCopy = [...this.state.contacts];
    let sortedContacts = contactsCopy.sort(function (a, b) {
      return b.popularity - a.popularity;
    });
    this.setState({
      contacts: sortedContacts
    })
  }

  deleteContact = (contact) => {
    const contactsCopy = [...this.state.contacts];
    let contactDeleted = contactsCopy.filter((data) => {
      return data.id !== contact;
    });

    this.setState({
      contacts: contactDeleted
    });
  };

}
export default App;
