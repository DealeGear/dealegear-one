/**

IndexedDB simples para projetos do IdeiaHub
Store: projects
Schema: { id, name, createdAt, updatedAt, type: 'framework'|'model', key: string, fields: { [block]: text } }
*/
const DB_NAME = 'ideiahub_db';
const DB_VERSION = 1;
const STORE = 'projects';
function openDB() {
return new Promise((resolve, reject) => {
const req = indexedDB.open(DB_NAME, DB_VERSION);
req.onupgradeneeded = (e) => {
const db = req.result;
if (!db.objectStoreNames.contains(STORE)) {
const store = db.createObjectStore(STORE, { keyPath: 'id', autoIncrement: true });
store.createIndex('name', 'name', { unique: false });
store.createIndex('updatedAt', 'updatedAt', { unique: false });
}
};
req.onsuccess = () => resolve(req.result);
req.onerror = () => reject(req.error);
});
}

async function dbListProjects() {
const db = await openDB();
return new Promise((resolve, reject) => {
const tx = db.transaction(STORE, 'readonly');
const store = tx.objectStore(STORE);
const req = store.getAll();
req.onsuccess = () => resolve(req.result.sort((a,b)=>b.updatedAt-a.updatedAt));
req.onerror = () => reject(req.error);
});
}

async function dbGetProject(id) {
const db = await openDB();
return new Promise((resolve, reject) => {
const tx = db.transaction(STORE, 'readonly');
const store = tx.objectStore(STORE);
const req = store.get(id);
req.onsuccess = () => resolve(req.result || null);
req.onerror = () => reject(req.error);
});
}

async function dbCreateProject(project) {
const db = await openDB();
return new Promise((resolve, reject) => {
const tx = db.transaction(STORE, 'readwrite');
const store = tx.objectStore(STORE);
const now = Date.now();
const data = { ...project, createdAt: now, updatedAt: now };
const req = store.add(data);
req.onsuccess = () => resolve({ ...data, id: req.result });
req.onerror = () => reject(req.error);
});
}

async function dbUpdateProject(project) {
const db = await openDB();
return new Promise((resolve, reject) => {
const tx = db.transaction(STORE, 'readwrite');
const store = tx.objectStore(STORE);
const data = { ...project, updatedAt: Date.now() };
const req = store.put(data);
req.onsuccess = () => resolve(data);
req.onerror = () => reject(req.error);
});
}

async function dbDeleteProject(id) {
const db = await openDB();
return new Promise((resolve, reject) => {
const tx = db.transaction(STORE, 'readwrite');
const store = tx.objectStore(STORE);
const req = store.delete(id);
req.onsuccess = () => resolve(true);
req.onerror = () => reject(req.error);
});
}

window.IHDB = {
list: dbListProjects,
get: dbGetProject,
create: dbCreateProject,
update: dbUpdateProject,
remove: dbDeleteProject
};