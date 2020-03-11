import { Component } from '@angular/core';
import { ItemService } from './item.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: [ './items.component.css' ],
})
export class ItemsComponent {
  constructor(private authService: AuthService) {}
}
