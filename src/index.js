/**
 * 0. `npm init -y`
 * 1. Install Firebase Packages
 * 2. Import Firebase
 * 3. Connect / Initialize the database
 * 4. Access the collections
 * 5. Read Documents
 * 6. Insert Documents
 * 7. Search/Find Document
 * 8. Edit/Update Documents
 */

// 2. Import Firebase
const {
  initializeApp,
  applicationDefault,
  cert,
} = require("firebase-admin/app");
const {
  getFirestore,
  Timestamp,
  FieldValue,
} = require("firebase-admin/firestore");

const serviceAccount = require("./firebase_keys.json");

// 3a. Initialize the app
initializeApp({
  credential: cert(serviceAccount),
});

// 3b. Connect to the database (i.e. Firestore)
const db = getFirestore();

async function readUserDocuments() {
  // 4. Access Users collection; collection reference
  const usersCollection = db.collection("users");
  // 5a. Read Documents
  const snapshot = await usersCollection.get();

  let allUsersDocuments = [];

  // 5b. Iterate through snapshot documents
  snapshot.forEach(function (document) {
    const documentObject = document.data();
    allUsersDocuments.push(documentObject);
  });

  return allUsersDocuments;
}

// readUserDocuments()

/**
 * Create 2 functions
 * reading documents from the following collections:
 * - my_shows
 * - content
 */

async function readContentDocuments() {
  const contentCollection = db.collection("content");

  // 5a. Read Documents
  const snapshot = await contentCollection.get();

  // 5b. Iterate through snapshot documents
  snapshot.forEach(function (document) {
    const documentObject = document.data();
    console.log(documentObject);
  });
}

// readContentDocuments()

async function readMyShowsDocuments() {
  const myShowsCollection = db.collection("my_shows");

  // 5a. Read Documents
  const snapshot = await myShowsCollection.get();

  // 5b. Iterate through snapshot documents
  snapshot.forEach(function (document) {
    const documentObject = document.data();
    console.log(documentObject);
  });
}

// readMyShowsDocuments()

// 6. Insert Documents
async function registerUser(userObject) {
  // Collection reference
  const usersCollection = db.collection("users");

  // Create a document
  const newUserDocument = usersCollection.doc();

  // Set/Insert a new document
  await newUserDocument.set(userObject);

  console.log(`User of document id: ${newUserDocument.id}\nhas been added`);
}

//  const newUserObject = {
//      name: 'Peter 2',
//      phone: 12344504044,
//      email: 'peter@bocacode.com',
//      isAnAdult: true
//  }

// registerUser(newUserObject)

// 7. Search/Find Document
async function updateUserFullName(name, inputEmail) {
  // Collection reference
  const usersCollection = db.collection("users");

  // Finding the document with a given email (using .get method)
  const snapshot = await usersCollection.where("email", "==", inputEmail).get();

  snapshot.forEach(function (document) {
    // This is the document found
    const documentReference = document.ref;

    // 8. Update document
    documentReference.update({ name: name });

    console.log(`We've update document of id: ${document.id} name to: ${name}`);
  });
}

// updateUserFullName('peter b', 'peter@bocacode.com')

module.exports = {
  updateUserFullName,
  registerUser,
  readUserDocuments,
  readMyShowsDocuments,
  readContentDocuments,
};
