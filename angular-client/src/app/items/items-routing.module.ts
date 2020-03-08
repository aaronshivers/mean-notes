import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemsComponent } from './items.component';
import { AuthGuard } from '../auth/auth.guard';

const itemsRoutes: Routes = [
  { path: '', component: ItemsComponent, canActivate: [ AuthGuard ] },
];

@NgModule({
  imports: [ RouterModule.forChild(itemsRoutes) ],
  exports: [ RouterModule ],
})
export class ItemsRoutingModule {
}
