import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CrudUserComponent } from './components/crud-user/crud-user.component';
import { AppMaterialModule } from './app.material.module';
import { CrudUserAddComponent } from './components/crud-user-add/crud-user-add.component';
import { CrudUserUpdateComponent } from './components/crud-user-update/crud-user-update.component';
import { CrudTicketAddComponent } from './components/crud-ticket-add/crud-ticket-add.component';
import { CrudTicketUpdateComponent } from './components/crud-ticket-update/crud-ticket-update.component';
import { CrudTicketComponent } from './components/crud-ticket/crud-ticket.component';
import { ConsultaUserComponent } from './components/consulta-user/consulta-user.component';




@NgModule({
  declarations: [
    AppComponent,
    CrudUserComponent,
    CrudUserAddComponent,
    CrudUserUpdateComponent,
    CrudTicketComponent,
    CrudTicketAddComponent,
    CrudTicketUpdateComponent,
    ConsultaUserComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AppMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
