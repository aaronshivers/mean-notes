import { Component, OnChanges, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { Item } from '../item';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  items$: Observable<Item[]>;

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    this.getItems();
  }

  onDelete(id: string): void {
    this.itemService.deleteItem(id);
  }

  onToggleCompleted(item: Item): void {
    this.itemService.toggleCompleted(item);
  }

  getItems(): void {
    this.items$ = this.itemService.getItems();
  }
}
