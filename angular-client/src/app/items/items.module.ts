import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsComponent } from './items.component';
import { FormsModule } from '@angular/forms';
import { ItemFormComponent } from './item-form/item-form.component';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemsRoutingModule } from './items-routing.module';


@NgModule({
  declarations: [ ItemsComponent, ItemFormComponent, ItemListComponent ],
  imports: [
    CommonModule,
    FormsModule,
    ItemsRoutingModule,
  ],
})
export class ItemsModule {
}
