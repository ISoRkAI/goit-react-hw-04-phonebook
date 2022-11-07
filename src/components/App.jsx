import { useState } from 'react';
import { defaultItem } from 'utils/DefaultItem';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import css from './App.module.css';
import useLocalStorage from 'utils/LocalStorage';

export default function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', defaultItem);
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
