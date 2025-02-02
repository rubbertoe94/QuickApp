// ======================================
// Author: Ebenezer Monney
// Copyright (c) 2023 www.ebenmonney.com
// 
// ==> Gun4Hire: contact@ebenmonney.com
// ======================================

import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop'

import { NgbModalModule, NgbTooltipModule, NgbPopoverModule, NgbDropdownModule, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ToastaModule } from 'ngx-toasta';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgChartsModule } from 'ng2-charts';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppErrorHandler } from './app-error.handler';
import { AppTranslationService, TranslateLanguageLoader } from './services/app-translation.service';
import { ConfigurationService } from './services/configuration.service';
import { AlertService } from './services/alert.service';
import { ThemeManager } from './services/theme-manager';
import { LocalStoreManager } from './services/local-store-manager.service';
import { OidcHelperService } from './services/oidc-helper.service';
import { NotificationService } from './services/notification.service';
import { NotificationEndpoint } from './services/notification-endpoint.service';
import { AccountService } from './services/account.service';
import { AccountEndpoint } from './services/account-endpoint.service';

import { EqualValidator } from './directives/equal-validator.directive';
import { AutofocusDirective } from './directives/autofocus.directive';
import { BootstrapTabDirective } from './directives/bootstrap-tab.directive';
import { GroupByPipe } from './pipes/group-by.pipe';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { CustomersComponent } from './components/Customer/customers/customers.component';
import { ProductsComponent } from './components/Product/products/products.component';
import { OrdersComponent } from './components/Order/orders/orders.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AboutComponent } from './components/about/about.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

import { BannerDemoComponent } from './components/controls/banner-demo.component';
import { TodoDemoComponent } from './components/controls/todo-demo.component';
import { StatisticsDemoComponent } from './components/controls/statistics-demo.component';
import { NotificationsViewerComponent } from './components/controls/notifications-viewer.component';
import { SearchBoxComponent } from './components/controls/search-box.component';
import { UserInfoComponent } from './components/controls/user-info.component';
import { UserPreferencesComponent } from './components/controls/user-preferences.component';
import { UsersManagementComponent } from './components/controls/users-management.component';
import { RolesManagementComponent } from './components/controls/roles-management.component';
import { RoleEditorComponent } from './components/controls/role-editor.component';
import { CustomerService } from './services/customer-service';
import { CustomersEndpoint } from './services/customer-endpoints';
import { ProductEndpoint } from './services/product-endpoints';
import { ProductService } from './services/product-service';
import { OrderEndpoint } from './services/order.endpoints';
import { OrderService } from './services/order.service';
import { CustomerFormComponent } from './components/Customer/customer-form/customer-form.component';
import { CustomerDetailsComponent } from './components/Customer/customer-details/customer-details.component';
import { SearchBarComponent } from './components/Customer/search-bar/search-bar.component';
import { ProductDetailsComponent } from './components/Product/product-details/product-details.component';
import { ProductInputFormComponent } from './components/Product/product-input-form/product-input-form.component';
import { OrderFormComponent } from './components/Order/order-form/order-form.component';
import { OrderDetailsComponent } from './components/Order/order-details/order-details.component';
import { CourtsListComponent } from './components/Pickleball/Court/courts-list/courts-list.component';
import { CourtsFormComponent } from './components/Pickleball/Court/courts-form/courts-form.component';
import { CourtService } from './services/court.service';
import { CourtEndpoint } from './services/court.endpoint';
import { LocationEndpoint, LocationService } from './services/location.service';
import { LocationListComponent } from './components/Pickleball/Location/location-list/location-list.component';
import { LocationFormComponent } from './components/Pickleball/Location/location-form/location-form.component';
import { LessonsListComponent } from './components/Pickleball/Lesson/lessons-list/lessons-list.component';
import { LessonsFormComponent } from './components/Pickleball/Lesson/lessons-form/lessons-form.component';
import { UserEndpoint, UserService } from './services/user.service';
import { LessonEndpoint, LessonService } from './services/lesson.service';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    CustomersComponent,
    ProductsComponent,
    OrdersComponent,
    SettingsComponent,
    UsersManagementComponent, UserInfoComponent, UserPreferencesComponent,
    RolesManagementComponent, RoleEditorComponent,
    AboutComponent,
    NotFoundComponent,
    NotificationsViewerComponent,
    SearchBoxComponent,
    StatisticsDemoComponent, TodoDemoComponent, BannerDemoComponent,
    EqualValidator,
    AutofocusDirective,
    BootstrapTabDirective,
    GroupByPipe,
    CustomerFormComponent,
    CustomerDetailsComponent,
    SearchBarComponent,
    ProductDetailsComponent,
    ProductInputFormComponent,
    OrderFormComponent,
    OrderDetailsComponent,
    CourtsListComponent,
    CourtsFormComponent,
    LocationListComponent,
    LocationFormComponent,
    LessonsListComponent,
    LessonsFormComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    DragDropModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: TranslateLanguageLoader
      }
    }),
    NgbTooltipModule,
    NgbPopoverModule,
    NgbDropdownModule,
    NgbCarouselModule,
    NgbModalModule,
    NgxDatatableModule,
    ToastaModule.forRoot(),
    NgSelectModule,
    NgChartsModule,
    NgxPaginationModule
  ],
  providers: [
    { provide: ErrorHandler, useClass: AppErrorHandler },
    AlertService,
    ThemeManager,
    ConfigurationService,
    AppTranslationService,
    NotificationService,
    NotificationEndpoint,
    AccountService,
    AccountEndpoint,
    LocalStoreManager,
    OidcHelperService,
    CustomerService,
    CustomersEndpoint,
    ProductEndpoint,
    ProductService,
    OrderEndpoint,
    OrderService,
    CourtService,
    CourtEndpoint,
    LocationEndpoint,
    LocationService,
    UserService,
    UserEndpoint,
    LessonService,
    LessonEndpoint
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
