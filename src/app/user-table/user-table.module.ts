import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserTableComponent } from './user-table.component';
import { UserInputComponent } from './components/user-input/user-input.component';
import { TableComponent } from './components/table/table.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    UserTableComponent,
    UserInputComponent,
    TableComponent,
  ],
  exports: [
    UserTableComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class UserTableModule { }
