import { state, els } from './state.js';
import { setStatus, toast } from './ui.js';

const DB_NAME = 'ideiahub_db';
const DB_STORE = 'projects';
let db;

export function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 2);
    req.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains('projects')) {
        db.createObjectStore('projects', { keyPath: 'id', autoIncrement: true });
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

export async function saveProject() {
  if (!db) await openDB();
  const project = {
    name: els.projectName.value || "Projeto sem título",
    framework: state.currentFramework,
    template: state.currentTemplate,
    blocks: state.blocks,
    updatedAt: new Date().toISOString()
  };

  if (typeof state.currentProjectId === 'number' && Number.isFinite(state.currentProjectId)) {
    project.id = state.currentProjectId;
  }

  const { store } = dbTx('readwrite');
  const req = store.put(project);
  return new Promise((resolve, reject) => {
    req.onsuccess = () => {
      state.currentProjectId = req.result;
      state.dirty = false;
      setStatus('salvo');
      toast('Projeto salvo', 'success');
      resolve(req.result);
    };
    req.onerror = () => reject(req.error);
  });
}

export async function listProjects() {
  if (!db) await openDB();
  const { store } = dbTx('readonly');
  const req = store.getAll();
  return new Promise((resolve, reject) => {
    req.onsuccess = () => resolve(req.result.sort((a,b)=> new Date(b.updatedAt)-new Date(a.updatedAt)));
    req.onerror = () => reject(req.error);
  });
}

export async function getProject(id) {
  if (!db) await openDB();
  const { store } = dbTx('readonly');
  const req = store.get(id);
  return new Promise((resolve, reject) => {
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function deleteProject(id) {
  if (!db) await openDB();
  const { store } = dbTx('readwrite');
  const req = store.delete(id);
  return new Promise((resolve, reject) => {
    req.onsuccess = () => resolve(true);
    req.onerror = () => reject(req.error);
  });
}