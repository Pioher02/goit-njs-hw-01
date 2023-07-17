const nanoid = require("nanoid");
const fs = require("fs").promises;

const contactsPath = "./db/contacts.json";

function listContacts() {
  return fs.readFile(contactsPath).then((data) => {
    return JSON.parse(data.toString());
  });
}

function getContactById(contactId) {
  return listContacts().then((list) => {
    return list.find((contact) => contact.id === contactId);
  });
}

function removeContact(contactId) {
  return listContacts().then((list) => {
    const filteredList = list.filter((contact) => contact.id !== contactId);
    return fs
      .writeFile(contactsPath, JSON.stringify(filteredList), (err) => {
        if (err) {
          console.err(err);
        }
      })
      .then(() => `Contact with id ${contactId} was successfully removed`);
  });
}

function addContact(name, email, phone) {
  return listContacts().then((list) => {
    const newContact = {
      id: nanoid(),
      name: name,
      email: email,
      phone: phone,
    };
    list.push(newContact);

    return fs
      .writeFile(contactsPath, JSON.stringify(list), (err) => {
        if (err) {
          console.err(err);
        }
      })
      .then(() => `The contact was successfully added`);
  });
}

module.exports = { listContacts, getContactById, removeContact, addContact };
