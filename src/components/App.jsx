import { Component } from 'react';
import { nanoid } from 'nanoid';

import FormAddContact from './FormAddContact/FormAddContact';
import FilterSearch from './FilterSearch/FilterSearch';
import ContactsList from './ContactsList/ContactsList';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    if (contacts) {
      this.setState({ contacts });
    }
  }

  componentDidUpdate(prevState) {
    const { contacts } = this.state;
    if (prevState.contacts !== contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  onHandleSubmit = data => {
    const number = data.number;
    const name = data.name;
    if (this.state.contacts.find(contact => contact.name === name)) {
      alert(`${name} is already in contacts`);
      return;
    }
    if (this.state.contacts.find(contact => contact.number === number)) {
      alert(`This number:${number} is already in contacts`);
      return;
    }
    const id = nanoid();
    const contact = { id, name, number };
    this.setState(({ contacts }) => ({ contacts: [...contacts, contact] }));
  };

  onSearchName = e => {
    this.setState({ filter: e.target.value });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    const lowerFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(lowerFilter)
    );
  };

  onDeleting = deleteId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== deleteId),
    }));
  };
  render() {
    const { filter, contacts } = this.state;
    return (
      <>
        <h1>Phonebook</h1>
        <FormAddContact onHandleSubmit={this.onHandleSubmit} />
        {Boolean(contacts[0]) && (
          <>
            <h2>Contacts</h2>
            <FilterSearch onSearchName={this.onSearchName} value={filter} />
            {this.getVisibleContacts().length === 0 || (
              <ContactsList
                getVisibleContacts={this.getVisibleContacts()}
                onDelete={this.onDeleting}
              />
            )}
          </>
        )}
      </>
    );
  }
}
