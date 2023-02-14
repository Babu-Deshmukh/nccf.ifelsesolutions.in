import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MenuListItemComponent } from './features/ui/menu-list-item/menu-list-item.component';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FeaturesComponent } from './features/features.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmationDialogComponent } from './ui/confirmation-dialog/confirmation-dialog.component';
import { MatNativeDateModule } from '@angular/material/core';
import { BreadcrumbModule } from './ui/breadcrumb/breadcrumb.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuListItemComponent,
    FeaturesComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatNativeDateModule,
    BreadcrumbModule,
  ],
  providers: [
  ],
    bootstrap: [AppComponent]
})
export class AppModule { }
