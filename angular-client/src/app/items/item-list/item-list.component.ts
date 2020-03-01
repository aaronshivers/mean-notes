import { Component, OnDestroy, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { Item } from '../item';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: [ './item-list.component.css' ],
})
export class ItemListComponent implements OnInit, OnDestroy {
  items: Item[];
  private itemSubscription: Subscription;

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    this.getItems();
    this.updateItems();
  }

  ngOnDestroy(): void {
    this.itemSubscription.unsubscribe();
  }

  getItems(): void {
    this.items = this.itemService.getItems();
  }

  updateItems(): void {
    this.itemSubscription = this.itemService.itemsChanged
      .subscribe((items: Item[]) => {
        this.items = items;
      });
  }

  onDelete(id: string): void {
    this.itemService.deleteItem(id);
  }

  onToggleCompleted(id: string): void {
    this.itemService.toggleCompleted(id);
  }
}
