import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { UiSwitchModule } from 'ngx-ui-switch';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginService } from './front-end/services/login.service';
import { CommonService } from './services/common.service';
import { RulesService } from './services/rules.service';
import { ChartistModule } from 'ng-chartist';
import { NgxPrintModule } from 'ngx-print';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    FormsModule,
    NgxPrintModule,
    BrowserAnimationsModule,
    ChartistModule,
    ToastrModule.forRoot(),
    UiSwitchModule.forRoot({
      size: 'small',
    }),
  ],
  providers: [LoginService, CommonService, RulesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
