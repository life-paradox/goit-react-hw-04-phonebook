import React, { useEffect, useState } from 'react';
import css from './App.module.css';
import { nanoid } from 'nanoid';

import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';

const DEFAULT_CONTACTS = [
  { id: 'id-1', name: 'Thomas Eddison ', number: '459-12-56' },
  { id: 'id-2', name: 'Bill Gates', number: '443-89-12' },
  { id: 'id-3', name: 'Christopher Columbus', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) ?? DEFAULT_CONTACTS
  );
  const [filter, setFilter] = useState('');

  const formSubmitHandler = ({ name, number }) => {
    const checkName = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (checkName) {
      return alert(`${name} is already in contacts`);
    } else {
      const contact = { name, number, id: nanoid() };

      setContacts(prevState => [contact, ...prevState]);
    }
  };

  const filterHandler = e => {
    setFilter(e.currentTarget.value);
  };

  const onDeleteContact = e => {
    const rest = [...contacts];
    const currentContactId = e.target.id;
    const currentContact = contacts.find(
      contact => contact.id === currentContactId
    );

    rest.splice(contacts.indexOf(currentContact), 1);
    setContacts(rest);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  useEffect(() => {
    let parsedContacts = [];
    if (!localStorage.contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    } else {
      parsedContacts = JSON.parse(localStorage.getItem('contacts'));
      setContacts(parsedContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const visibleContacts = getVisibleContacts();

  return (
    <div className={css.container}>
      <h1 className={css.title}>Phonebook</h1>
      <ContactForm onSubmit={formSubmitHandler} />

      <h2 className={css.title}>Contacts</h2>
      <Filter value={filter} onChange={filterHandler} />

      {visibleContacts.length > 0 ? (
        <ContactList contacts={visibleContacts} onDelete={onDeleteContact} />
      ) : (
        <p>You can add contacts</p>
      )}
    </div>
  );
};

// class App extends Component {
//   state = {
//     contacts: [
//       { id: 'id-1', name: 'Thomas Eddison ', number: '459-12-56' },
//       { id: 'id-2', name: 'Bill Gates', number: '443-89-12' },
//       { id: 'id-3', name: 'Christopher Columbus', number: '645-17-79' },
//       { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//     ],
//     filter: '',
//   };

//   formSubmitHandler = ({ name, number }) => {
//     const checkName = this.state.contacts.find(
//       contact => contact.name.toLowerCase() === name.toLowerCase()
//     );

//     if (checkName) {
//       return alert(`${name} is already in contacts`);
//     } else {
//       const contact = { name, number, id: nanoid() };

//       this.setState(prevState => {
//         return { contacts: [contact, ...prevState.contacts] };
//       });
//     }
//   };

//   filterHandler = e => {
//     this.setState({ filter: e.currentTarget.value });
//   };

//   onDeleteContact = e => {
//     const { contacts } = this.state;
//     const rest = [...contacts];
//     const currentContactId = e.target.id;
//     const currentContact = contacts.find(
//       contact => contact.id === currentContactId
//     );

//     rest.splice(contacts.indexOf(currentContact), 1);
//     this.setState({
//       contacts: rest,
//     });
//   };

//   getVisibleContacts = () => {
//     const { filter, contacts } = this.state;
//     const normalizedFilter = filter.toLowerCase();

//     return contacts.filter(contact =>
//       contact.name.toLowerCase().includes(normalizedFilter)
//     );
//   };

//   componentDidMount() {
//     if (!localStorage.contacts) {
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     } else {
//       const contactsFromLocal = JSON.parse(localStorage.getItem('contacts'));

//       this.setState({
//         contacts: contactsFromLocal,
//       });
//     }
//   }

//   componentDidUpdate() {
//     localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//   }

//   render() {
//     const { filter } = this.state;
//     const visibleContacts = this.getVisibleContacts();

//     return (
//       <div className={css.container}>
//         <h1 className={css.title}>Phonebook</h1>
//         <ContactForm onSubmit={this.formSubmitHandler} />

//         <h2 className={css.title}>Contacts</h2>
//         <Filter value={filter} onChange={this.filterHandler} />

//         {visibleContacts.length > 0 ? (
//           <ContactList
//             contacts={visibleContacts}
//             onDelete={this.onDeleteContact}
//           />
//         ) : (
//           <p>You can add contacts</p>
//         )}
//       </div>
//     );
//   }
// }

export default App;
