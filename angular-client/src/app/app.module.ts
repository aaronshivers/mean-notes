import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ItemsModule } from './items/items.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    ItemsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [ AppComponent ],
})
export class AppModule {
}
