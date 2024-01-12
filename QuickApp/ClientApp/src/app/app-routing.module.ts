// ======================================
// Author: Ebenezer Monney
// Copyright (c) 2023 www.ebenmonney.com
// 
// ==> Gun4Hire: contact@ebenmonney.com
// ======================================

import { NgModule, Injectable } from '@angular/core';
import { RouterModule, Routes, DefaultUrlSerializer, UrlSerializer, UrlTree, TitleStrategy } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { CustomersComponent } from './components/Customer/customers/customers.component';
import { ProductsComponent } from './components/Product/products/products.component';
import { OrdersComponent } from './components/Order/orders/orders.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AboutComponent } from './components/about/about.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AppTitleService } from './services/app-title.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard';
import { Utilities } from './services/utilities';
import { CustomerFormComponent } from './components/Customer/customer-form/customer-form.component';
import { CustomerDetailsComponent } from './components/Customer/customer-details/customer-details.component';
import { ProductDetailsComponent } from './components/Product/product-details/product-details.component';
import { ProductInputFormComponent } from './components/Product/product-input-form/product-input-form.component';
import { OrderFormComponent } from './components/Order/order-form/order-form.component';
import { OrderDetailsComponent } from './components/Order/order-details/order-details.component';
import { CourtsListComponent } from './components/Pickleball/Court/courts-list/courts-list.component';
import { CourtsFormComponent } from './components/Pickleball/Court/courts-form/courts-form.component';
import { LocationListComponent } from './components/Pickleball/Location/location-list/location-list.component';
import { LocationFormComponent } from './components/Pickleball/Location/location-form/location-form.component';
import { LessonsListComponent } from './components/Pickleball/Lesson/lessons-list/lessons-list.component';
import { LessonsFormComponent } from './components/Pickleball/Lesson/lessons-form/lessons-form.component';

@Injectable()
export class LowerCaseUrlSerializer extends DefaultUrlSerializer {
  override parse(url: string): UrlTree {
    const possibleSeparators = /[?;#]/;
    const indexOfSeparator = url.search(possibleSeparators);
    let processedUrl: string;

    if (indexOfSeparator > -1) {
      const separator = url.charAt(indexOfSeparator);
      const urlParts = Utilities.splitInTwo(url, separator);
      urlParts.firstPart = urlParts.firstPart.toLowerCase();

      processedUrl = urlParts.firstPart + separator + urlParts.secondPart;
    } else {
      processedUrl = url.toLowerCase();
    }

    return super.parse(processedUrl);
  }
}


const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard], title: 'Home' },
  { path: 'login', component: LoginComponent, title: 'Login' },
  { path: 'customers', component: CustomersComponent, canActivate: [AuthGuard], title: 'Customers' },
  { path: 'products', component: ProductsComponent, canActivate: [AuthGuard], title: 'Products' },
  { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard], title: 'Orders' },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard], title: 'Settings' },
  { path: 'about', component: AboutComponent, title: 'About Us' },
  { path: 'home', redirectTo: '/', pathMatch: 'full' },
  { path: 'customer-form', component: CustomerFormComponent },
  { path: 'customer-details/:id', component: CustomerDetailsComponent },
  { path: 'customer-form/:id', component: CustomerFormComponent },
  { path: 'product-details/:id', component: ProductDetailsComponent },
  { path: 'product-input-form', component: ProductInputFormComponent },
  { path: 'product-input-form/:id', component: ProductInputFormComponent },
  { path: 'order-form', component: OrderFormComponent },
  { path: 'order-form/:id', component: OrderFormComponent },
  { path: 'order-details/:id', component: OrderDetailsComponent },
  { path: 'courts-list', component: CourtsListComponent },
  { path: 'courts-form', component: CourtsFormComponent },
  { path: 'location-list', component: LocationListComponent },
  { path: 'location-form', component: LocationFormComponent },
  { path: 'lessons-list', component: LessonsListComponent },
  { path: 'lessons-form', component: LessonsFormComponent },
  { path: '**', component: NotFoundComponent, title: 'Page Not Found' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    AuthService,
    { provide: TitleStrategy, useClass: AppTitleService },
    { provide: UrlSerializer, useClass: LowerCaseUrlSerializer }]
})
export class AppRoutingModule { }
