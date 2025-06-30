import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Signup } from './auth/signup/signup';
import { Login } from './auth/login/login';
import { Welcome } from './welcome/welcome';
import { MaterialModule } from './material-module';
import { ProductService } from './shopping/product-service';
import { UserService } from './auth/user-service';
import { Profile } from './auth/profile/profile';
import { ProductComponent } from './shopping/product';
import { OrderHistory } from './shopping/order-history/order-history';
import { NewOrder } from './shopping/new-order/new-order';

@NgModule({
  declarations: [
    App,
    Signup,
    Login,
    Welcome,
    Profile,
    ProductComponent,
    OrderHistory,
    NewOrder
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    ProductService,
    UserService
  ],
  bootstrap: [App]
})
export class AppModule { }
