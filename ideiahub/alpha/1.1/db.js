// IndexedDB util
const DB_NAME = 'ideiahub_db';
const DB_STORE = 'projects';
let db;

function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(DB_STORE)) {
        db.createObjectStore(DB_STORE, { keyPath: 'id', autoIncrement: true });
      }
    };
    req.onsuccess = () => { db = req.result; resolve(db); };
    req.onerror = () => reject(req.error);
  });
}

function dbTx(mode='readonly') {
  const tx = db.transaction(DB_STORE, mode);
  return { tx, store: tx.objectStore(DB_STORE) };
}

async function dbSaveProject(project) {
  if (!db) await openDB();
  const { store } = dbTx('readwrite');
  const req = store.put(project);
  return new Promise((resolve, reject) => {
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function dbListProjects() {
  if (!db) await openDB();
  const { store } = dbTx('readonly');
  const req = store.getAll();
  return new Promise((resolve, reject) => {
    req.onsuccess = () => resolve(req.result.sort((a,b)=> new Date(b.updatedAt)-new Date(a.updatedAt)));
    req.onerror = () => reject(req.error);
  });
}

async function dbGetProject(id) {
  if (!db) await openDB();
  const { store } = dbTx('readonly');
  const req = store.get(id);
  return new Promise((resolve, reject) => {
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function dbDeleteProject(id) {
  if (!db) await openDB();
  const { store } = dbTx('readwrite');
  const req = store.delete(id);
  return new Promise((resolve, reject) => {
    req.onsuccess = () => resolve(true);
    req.onerror = () => reject(req.error);
  });
}