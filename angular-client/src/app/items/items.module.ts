import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsComponent } from './items.component';
import { FormsModule } from '@angular/forms';
import { ItemFormComponent } from './item-form/item-form.component';
import { ItemListComponent } from './item-list/item-list.component';


@NgModule({
  declarations: [ ItemsComponent, ItemFormComponent, ItemListComponent ],
  exports: [
    ItemsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
})
export class ItemsModule {
}
