import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageCache {
  get<T>(key: string): T | null {
    try {
      const storedData = localStorage.getItem(key);
      if (storedData) {
        return JSON.parse(storedData) as T;
      }
    } catch (e) {
      console.error(`Error retrieving data from localstorage for key "${key}": `, e);
    }

    return null;
  }

  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(`Error saving data to localstorage for key "${key}": `, e);
    }
  }

  remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error(`Error removing data from localstorage for key "${key}": `, e);
    }
  }

  clearAll(): void {
    try {
      localStorage.clear();
    } catch (e) {
      console.error(`Error clearing localstorage: `, e);
    }
  }
}
