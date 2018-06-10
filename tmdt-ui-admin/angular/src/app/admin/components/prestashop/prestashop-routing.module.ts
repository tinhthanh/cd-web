import { PrestashopComponent } from './prestashop.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainCustomerComponent } from '../prestashop/main-customer/main-customer.component';
import { CustomerEditComponent } from '../prestashop/edit-customer/edit-customer.component';
const routes: Routes = [
{
    path: '' ,
    component:  PrestashopComponent,
    children: [
      {
        path: 'edit',
        component: CustomerEditComponent
      },
      {
        path: 'main',
        component: MainCustomerComponent
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrestashopRoutingModule { }

