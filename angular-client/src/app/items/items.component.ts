import { Component } from '@angular/core';
import { DataStorageService } from '../data-storage.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: [ './items.component.css' ],
})
export class ItemsComponent {
  constructor(private dataStorageService: DataStorageService) {
    this.dataStorageService.fetchItems().subscribe();
  }
}
