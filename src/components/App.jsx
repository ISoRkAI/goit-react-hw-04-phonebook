import { useState, useEffect } from 'react';
import shortid from 'shortid';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import css from './App.module.css';

export default function App() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts')) ?? '';
  }, [
    { id: shortid.generate(), name: 'Rosie Simpson', number: '459-12-56' },
    { id: shortid.generate(), name: 'Hermione Kline', number: '443-89-12' },
    { id: shortid.generate(), name: 'Eden Clements', number: '645-17-79' },
    { id: shortid.generate(), name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  const addContacts = ({ id, name, number }) => {
    if (
      contacts.find(contact => {
        return contact.name === name;
      })
    ) {
      return alert(`${name} is already in contacts`);
    }
    const contact = {
      id,
      name,
      number,
    };
    setContacts(prevState => [contact, ...prevState]);
  };
  const deleteontact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };
  const filterChange = e => {
    setFilter(e.currentTarget.value);
  };

  const filterContact = contacts.filter(contact => {
    return contact.name.toLowerCase().includes(filter.toLowerCase());
  });

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  });
  return (
    <>
      <div className={css.container}>
        <h1>Phonebook</h1>
        <ContactForm addContacts={addContacts} />
        <h2>Contacts</h2>
        <Filter filter={filterChange} />
        <ContactList filter={filterContact} onDeleteContact={deleteontact} />
      </div>
    </>
  );
}
