export const DB_NAME = 'ideiahub_db';
const DB_STORE = 'projects';
let db;

export function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(DB_STORE)) {
        const store = db.createObjectStore(DB_STORE, { keyPath: 'id', autoIncrement: true });
        store.createIndex('by_updated', 'updatedAt');
        store.createIndex('by_name', 'name');
      }
    };
    req.onsuccess = () => { db = req.result; resolve(db); };
    req.onerror = () => reject(req.error);
  });
}
function tx(mode='readonly') {
  const t = db.transaction(DB_STORE, mode);
  return { t, store: t.objectStore(DB_STORE) };
}
export async function saveProject(project) {
  if (!db) await openDB();
  const { store } = tx('readwrite');
  const req = store.put(project);
  await new Promise((res, rej)=>{ req.onsuccess = res; req.onerror = ()=> rej(req.error); });
  return req.result;
}
export async function listProjects() {
  if (!db) await openDB();
  const { store } = tx('readonly');
  const req = store.getAll();
  const result = await new Promise((res, rej)=>{ req.onsuccess = ()=>res(req.result); req.onerror = ()=>rej(req.error); });
  return result.sort((a,b)=> new Date(b.updatedAt)-new Date(a.updatedAt));
}
export async function getProject(id) {
  if (!db) await openDB();
  const { store } = tx('readonly');
  const req = store.get(id);
  return new Promise((res, rej)=>{ req.onsuccess = ()=>res(req.result); req.onerror = ()=>rej(req.error) });
}
export async function deleteProject(id) {
  if (!db) await openDB();
  const { store } = tx('readwrite');
  const req = store.delete(id);
  return new Promise((res, rej)=>{ req.onsuccess = ()=>res(true); req.onerror = ()=>rej(req.error) });
}