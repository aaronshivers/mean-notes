import {
  EventEmitter,
  Injectable,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { Item } from './item';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

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
    console.log('setItems()', items);
    this.itemsChanged.next(this.items.slice());
  }

  getItems(): Item[] {
    return this.items.slice();
  }

  addItem(item: Item): void {
    this.items.push(item);
    this.itemsChanged.next(this.items.slice());
    this.http.post<Item>(this.itemsUrl, item)
      .subscribe((item: Item) => console.log(item));
  }

  deleteItem(id: string): void {
    this.items = this.items.filter(item => item._id !== id);
    this.itemsChanged.next(this.items.slice());
    this.http.delete<Item>(this.itemsUrl + id).subscribe();
  }

  toggleCompleted(item: Item): void {
    item.completed = !item.completed;
    this.itemsChanged.next(this.items.slice());
    this.http.patch<Item>(this.itemsUrl + item._id, item).subscribe();
  }
}
