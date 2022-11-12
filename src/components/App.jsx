import React, { Component } from 'react';
import css from './App.module.css';
import { nanoid } from 'nanoid';

import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Thomas Eddison ', number: '459-12-56' },
      { id: 'id-2', name: 'Bill Gates', number: '443-89-12' },
      { id: 'id-3', name: 'Christopher Columbus', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  formSubmitHandler = ({ name, number }) => {
    const checkName = this.state.contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (checkName) {
      return alert(`${name} is already in contacts`);
    } else {
      const contact = { name, number, id: nanoid() };

      this.setState(prevState => {
        return { contacts: [contact, ...prevState.contacts] };
      });
    }
  };

  filterHandler = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  onDeleteContact = e => {
    const { contacts } = this.state;
    const rest = [...contacts];
    const currentContactId = e.target.id;
    const currentContact = contacts.find(
      contact => contact.id === currentContactId
    );

    rest.splice(contacts.indexOf(currentContact), 1);

    this.setState({
      contacts: rest,
    });
  };

  getvisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const { filter } = this.state;
    const visibleContacts = this.getvisibleContacts();

    return (
      <div className={css.container}>
        <h1 className={css.title}>Phonebook</h1>
        <ContactForm onSubmit={this.formSubmitHandler} />

        <h2 className={css.title}>Contacts</h2>
        <Filter value={filter} onChange={this.filterHandler} />
        <ContactList
          contacts={visibleContacts}
          onDelete={this.onDeleteContact}
        />
      </div>
    );
  }
}

export default App;
