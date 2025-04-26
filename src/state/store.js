const STORAGE_KEY = 'employees';

class Store {
  constructor() {
    this.state = {
      employees: this.loadFromLocalStorage()
    };
    this.listeners = [];
  }

  subscribe(callback) {
    this.listeners.push(callback);
    return () => this.unsubscribe(callback);
  }

  unsubscribe(callback) {
    this.listeners = this.listeners.filter(fn => fn !== callback);
  }

  setState(key, value) {
    this.state[key] = value;
    if (key === 'employees') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    }
    this.notify();
  }

  getState(key) {
    return this.state[key];
  }

  loadFromLocalStorage() {
    const raw = localStorage.getItem(STORAGE_KEY);
    try {
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  notify() {
    for (const callback of this.listeners) {
      callback(this.state);
    }
  }
}

export const store = new Store();
