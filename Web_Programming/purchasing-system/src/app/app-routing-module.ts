import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Welcome } from './welcome/welcome'
import { Signup } from './auth/signup/signup'
import { Login } from './auth/login/login'
import { ProductComponent } from './shopping/product';

const routes: Routes = [
  { path: '', component: Welcome } ,
  { path: 'signup', component: Signup },
  { path: 'login', component: Login },
  { path: 'orders', component: ProductComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
