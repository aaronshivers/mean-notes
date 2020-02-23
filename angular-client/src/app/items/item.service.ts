import { Injectable } from '@angular/core';
import { Item } from './item';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  url: string = 'http://localhost:3000/notes';
  // initialize the items array
  items: Item[] = [];

  constructor(
    private http: HttpClient,
  ) {
  }

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.url);
  }

  postItem(text: string): Observable<Item> {
    return this.http.post<Item>(this.url, { text });
  }

  // delete item
  deleteItem(id: string): void {
    // get the item index
    const itemIndex = this.getItemIndex(id);

    if (itemIndex >= 0) {
      // remove the item from the items array
      this.items.splice(itemIndex, 1);

      // save all items
      this.saveItems();
    }
  }

  // change completed property
  toggleCompleted(id: string): void {
    // get the item index
    const itemIndex = this.getItemIndex(id);

    if (itemIndex >= 0) {
      // toggle the completed boolean
      this.items[itemIndex].completed = !this.items[itemIndex].completed;

      // save all items
      this.saveItems();
    }
  }

  // load existing items from localStorage
  private loadItems(): void {
    const itemsJSON = localStorage.getItem('items');
    this.items = itemsJSON ? JSON.parse(itemsJSON) : [];
  }

  // save items to localStorage
  private saveItems(): void {
    const itemsJSON = JSON.stringify(this.items);
    localStorage.setItem('items', itemsJSON);
  }

  // get the item index
  private getItemIndex(id: string): number {
    return this.items.findIndex(item => item.id === id);
  }
}
