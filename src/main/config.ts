// src/main/config.ts
import Store from 'electron-store';
import { SelkiesConnection } from './types';

type Schema = { connections: SelkiesConnection[]; lastLaunchedId?: string; };

const store = new Store<Schema>({
  name: 'selkies-config',
  clearInvalidConfig: true,
  defaults: { connections: [] }
});

export const ConfigRepo = {
  list(): SelkiesConnection[] { return store.get('connections', []); },
  get(id: string): SelkiesConnection | undefined { return this.list().find(c => c.id === id); },
  upsert(conn: SelkiesConnection) {
    const all = this.list();
    const idx = all.findIndex(c => c.id === conn.id);
    conn.updatedAt = new Date().toISOString();
    if (idx >= 0) all[idx] = conn;
    else { conn.createdAt ||= new Date().toISOString(); all.push(conn); }
    store.set('connections', all);
  },
  remove(id: string) { store.set('connections', this.list().filter(c => c.id !== id)); },
  setLastLaunched(id: string) { store.set('lastLaunchedId', id); }
};
