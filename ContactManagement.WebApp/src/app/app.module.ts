import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { AppRouteModule } from './app-route.module';

import { AppComponent } from './app.component';
import { AuthGuard } from './_guards/auth-guard';
import { CustomErrorHandler } from './_error-handlers/custom-error-handler';
import { HeaderInterceptor } from './_Interceptors/header-interceptor';
import { TableService } from './_services/table.service';
import { NotificationService } from './_services/notification.service';
import { LoaderService } from './_services/loader.service';


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRouteModule,
        NgbModule.forRoot()
    ],
    providers: [
        AuthGuard,
        { provide: ErrorHandler, useClass: CustomErrorHandler },
        { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true },
        TableService,
        NotificationService,
        LoaderService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
