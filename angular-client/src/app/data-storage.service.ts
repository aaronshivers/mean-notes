import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ItemService } from './items/item.service';
import { Observable } from 'rxjs';
import { Item } from './items/item';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  itemsUrl: string = 'http://localhost:3000/notes/';

  constructor(
    private http: HttpClient,
    private itemService: ItemService,
  ) {}

  storeItems(): void {
    const items = this.itemService.getItems();
    this.http.patch(this.itemsUrl, items).subscribe();
  }

  fetchItems(): Observable<Item[]> {
    return this.http.get(this.itemsUrl).pipe(
      map((items: Item[]) => items),
      tap(items => this.itemService.setItems(items)),
    );
  }
}
