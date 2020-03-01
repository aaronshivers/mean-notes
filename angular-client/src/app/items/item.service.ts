import { Injectable } from '@angular/core';
import { Item } from './item';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  itemsUrl: string = 'http://localhost:3000/notes/';
  itemsChanged = new Subject<Item[]>();
  private items: Item[] = [];

  constructor(private http: HttpClient) {}

  setItems(items: Item[]): void {
    this.items = items;
    this.itemsChanged.next(this.items.slice());
  }

  getItems(): Item[] {
    return this.items.slice();
  }

  addItem(item: Item): void {
    this.http.post<Item>(this.itemsUrl, item)
      .subscribe((item: Item) => {
        this.items.push(item);
        this.itemsChanged.next(this.items.slice());
      });
  }

  deleteItem(id: string): void {
    const itemIndex = this.getItemIndex(id);
    if (itemIndex >= 0) {
      this.items.splice(itemIndex, 1);
      this.http.delete<Item>(this.itemsUrl + id)
        .subscribe(() => {
          this.itemsChanged.next(this.items.slice());
        });
    }
  }

  toggleCompleted(item: Item): void {
    item.completed = !item.completed;
    this.http.patch<Item>(this.itemsUrl + item._id, item)
      .subscribe(() => {
        this.itemsChanged.next(this.items.slice());
      });
  }

  private getItemIndex(id: string): number {
    return this.items.findIndex(item => item._id === id);
  }
}
