import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UserTableModule } from './user-table/user-table.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    UserTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
