import { Injectable } from '@angular/core';
import { DataStorageService, ItemService } from './items/item.service';
import { Item } from './items/item';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ItemResolverService implements Resolve<Item[]> {

  constructor(
    private dataStorageService: DataStorageService,
    private itemService: ItemService,
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<Item[]> | Promise<Item[]> | Item[] {
    const items = this.itemService.getItems();

    if (items.length === 0) {
      return this.dataStorageService.fetchItems();
    } else {
      return items;
    }
  }
}
