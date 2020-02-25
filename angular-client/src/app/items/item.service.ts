import { Injectable } from '@angular/core';
import { Item } from './item';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  url: string = 'http://localhost:3000/notes/';

  constructor(private http: HttpClient) {}

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.url);
  }

  postItem(text: string): Observable<Item> {
    return this.http.post<Item>(this.url, { text });
  }

  deleteItem(id: string): Observable<Item> {
    return this.http.delete<Item>(this.url + id);
  }

  toggleCompleted(item: Item): Observable<Item> {
    item.completed = !item.completed;
    return this.http.patch<Item>(this.url + item._id, item);
  }
}
