import { NgModule } from '@angular/core';
import { ItemsComponent } from './items.component';
import { ItemFormComponent } from './item-form/item-form.component';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemsRoutingModule } from './items-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [ ItemsComponent, ItemFormComponent, ItemListComponent ],
  imports: [
    SharedModule,
    FormsModule,
    ItemsRoutingModule,
    CommonModule,
  ],
})
export class ItemsModule {
}
