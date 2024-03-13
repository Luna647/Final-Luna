
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CrudUserComponent } from './components/crud-user/crud-user.component';
import { CrudTicketComponent } from './components/crud-ticket/crud-ticket.component';
import { LoginComponent } from "./components/auth/login/login.component";
import { ConsultaUserComponent } from './components/consulta-user/consulta-user.component';


const routes: Routes = [
  {path: "login", component: LoginComponent },

  {path:"crudUser", component:CrudUserComponent },
  {path:"crudTicket", component:CrudTicketComponent },


  {path:"consultaUser", component:ConsultaUserComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

