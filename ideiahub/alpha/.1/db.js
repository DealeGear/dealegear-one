// IndexedDB wrapper for IdeiaHub (versão com índice por nome)
const DB_NAME = 'ideiahub_db';
const DB_VERSION = 2; // incrementado
const STORE_PROJECTS = 'projects';
const STORE_META = 'meta';

const DB = {
  db: null,
  async open() {
    if (this.db) return this.db;
    this.db = await new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains(STORE_PROJECTS)) {
          const store = db.createObjectStore(STORE_PROJECTS, { keyPath: 'id' });
          store.createIndex('by_updated_at', 'updatedAt', { unique: false });
          store.createIndex('by_category', 'category', { unique: false });
          store.createIndex('by_name', 'name', { unique: false });
        } else {
          const store = req.transaction.objectStore(STORE_PROJECTS);
          if (!store.indexNames.contains('by_name')) {
            store.createIndex('by_name', 'name', { unique: false });
          }
        }
        if (!db.objectStoreNames.contains(STORE_META)) {
          db.createObjectStore(STORE_META, { keyPath: 'key' });
        }
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
    return this.db;
  },
  async put(storeName, value) {
    const db = await this.open();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(storeName, 'readwrite');
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => reject(tx.error);
      tx.objectStore(storeName).put(value);
    });
  },
  async get(storeName, key) {
    const db = await this.open();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(storeName, 'readonly');
      tx.onerror = () => reject(tx.error);
      const req = tx.objectStore(storeName).get(key);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error);
    });
  },
  async delete(storeName, key) {
    const db = await this.open();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(storeName, 'readwrite');
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => reject(tx.error);
      tx.objectStore(storeName).delete(key);
    });
  },
  async getAll(storeName) {
    const db = await this.open();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(storeName, 'readonly');
      tx.onerror = () => reject(tx.error);
      const req = tx.objectStore(storeName).getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => reject(req.error);
    });
  }
};