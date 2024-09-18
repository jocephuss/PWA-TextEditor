import { openDB } from "idb";
// The function below initializes the IndexedDB database
const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  // console.error("putDb not implemented");
  const jateDB = await openDB("jate", 1); // Get the jate database instance
  const tx = jateDB.transaction("jate", "readwrite"); // Get a transaction on the jate object store
  const store = tx.objectStore("jate"); // Get the jate object store
  const request = store.put({ content }); // Add the content to the database transaction
  const result = await request; // Wait for the transaction to complete
  console.log("Content added to the database:", result);
};
// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  // console.error("getDb not implemented");
  const jateDB = await openDB("jate", 1); // Get the jate database instance
  const tx = jateDB.transaction("jate", "readonly"); // Get a read-only transaction on the jate object store
  const store = tx.objectStore("jate"); // Get the jate object store
  const request = store.getAll(); // Get all the content from the database transaction
  const result = await request; // Wait for the transaction to complete
  console.log("Content retrieved:", result);
};
initdb();
