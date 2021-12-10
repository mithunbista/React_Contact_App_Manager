import React, { useState, useEffect } from "react";
import { uuid } from "uuidv4";
import "./App.css";
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import Constants from "../common/Constants";

function App() {
  //for state management
  const [contacts, setContacts] = useState([]);

  const validateContactList = (list2Validate) => {
    const returnFlag = true;
    if(list2Validate && list2Validate.length > 0){
      alert(Constants.ContactExists);
      return !returnFlag;
    }
    return returnFlag;
  };

  const addContactHandler = (addContact) => {
    console.log(addContact);
    const list2Validate = contacts.filter((contact) => {
      return contact.name === addContact.name && contact.email === addContact.email;
    });

    if(!validateContactList(list2Validate)){
      return;
    }

    setContacts([...contacts, { id: uuid(), ...addContact }]);
  };

  const removeContactHandler = (id) => {
    const response = window.confirm(Constants.DeleteRecords);
    if (response) {
      const newContactList = contacts.filter((contact) => {
        return contact.id !== id;
      });
      setContacts(newContactList);
    } 
  };

  useEffect(() => {
    const retrieveContacts = JSON.parse(localStorage.getItem(Constants.LOCAL_STORAGE_KEY));
    if(retrieveContacts){
      setContacts(retrieveContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(Constants.LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className="ui container">
      <Header />
      <AddContact addContactHandler={addContactHandler} />
      <ContactList contacts={contacts} removeContactHandler={removeContactHandler} />
    </div>
  );
}

export default App;
