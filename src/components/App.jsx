import { useState, useEffect, useRef, useMemo } from 'react';
import { nanoid } from 'nanoid';

import FormAddContact from './FormAddContact/FormAddContact';
import FilterSearch from './FilterSearch/FilterSearch';
import ContactsList from './ContactsList/ContactsList';

export function App() {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');
  
  const contactsRef = useRef(contacts.length);

  useEffect(() => {
    const contactsLocal = JSON.parse(localStorage.getItem('contacts'));

    if (contactsLocal) {
      setContacts([...contactsLocal]);
    }
  }, []);

  useEffect(() => {
    if (contactsRef.current === contacts.length) {
      return;
    }
    localStorage.setItem('contacts', JSON.stringify(contacts));
    contactsRef.current = contacts.length;
  }, [contacts]);

  const onHandleSubmit = data => {
    const number = data.number;
    const name = data.name;

    if (contacts.find(contact => contact.name === name)) {
      alert(`${name} is already in contacts`);
      return;
    }
    if (contacts.find(contact => contact.number === number)) {
      alert(`This number:${number} is already in contacts`);
      return;
    }
    const id = nanoid();
    const contact = { id, name, number };
    setContacts([...contacts, contact]);
  };

  const onSearchName = e => {
    setFilter(e.target.value);
  };

  const getVisibleContacts = useMemo(() => {
    if (contacts) {
      const lowerFilter = filter.toLowerCase();
      return contacts.filter(contact =>
        contact.name.toLowerCase().includes(lowerFilter)
      );
    }
  }, [contacts, filter]);

  const onDeleting = deleteId => {
    setContacts(contactsRef =>
      contactsRef.filter(contact => contact.id !== deleteId)
    );
  };

  return (
    <>
      <h1>Phonebook</h1>
      <FormAddContact onHandleSubmit={onHandleSubmit} />
      {Boolean(contacts[0]) && (
        <>
          <h2>Contacts</h2>
          <FilterSearch onSearchName={onSearchName} value={filter} />
          {getVisibleContacts.length === 0 || (
            <ContactsList
              getVisibleContacts={getVisibleContacts}
              onDelete={onDeleting}
            />
          )}
        </>
      )}
    </>
  );
}
