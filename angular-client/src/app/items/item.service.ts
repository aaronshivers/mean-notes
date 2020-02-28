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
export class ItemService implements OnInit, OnChanges {
  itemsUrl: string = 'http://localhost:3000/notes/';
  itemsChanged = new Subject<Item[]>();
  private items: Item[] = [];

  constructor(private http: HttpClient) {}

  setItems(items: Item[]): void {
    this.items = items;
    console.log('setItems()', items);
    this.itemsChanged.next(this.items.slice());
  }

  ngOnInit(): void {
    console.log(this.items);
  }

  ngOnChanges(): void {
    console.log(this.items);
  }

  getItems(): Item[] {
    console.log(this.items);
    return this.items.slice();
  }

  addItem(item: Item): Observable<Item> {
    return this.http.post<Item>(this.itemsUrl, item);
  }

  deleteItem(id: string): Observable<Item> {
    return this.http.delete<Item>(this.itemsUrl + id);
  }

  toggleCompleted(item: Item): Observable<Item> {
    console.log(item);
    item.completed = !item.completed;
    console.log(item);
    return this.http.patch<Item>(this.itemsUrl + item._id, item);
  }
}
