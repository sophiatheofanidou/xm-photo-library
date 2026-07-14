import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { PhotosPageComponent } from './features/photos/photos-page/photos-page.component';
import { FavoritesPageComponent } from './features/favorites/favorites-page/favorites-page.component';
import { PhotoDetailPageComponent } from './features/photo-detail/photo-detail-page/photo-detail-page.component';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PhotoGridComponent } from './shared/components/photo-grid/photo-grid.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PhotosPageComponent,
    FavoritesPageComponent,
    PhotoDetailPageComponent,
    PhotoGridComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatToolbarModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
