import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FileComponent } from './model/file/file.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { NewComponent } from './components/new/new.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './components/footer/footer.component';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http'
import { NgxSpinnerModule } from "ngx-spinner";
import { SafeURLPipe } from './pipes/safe-url.pipe';
import { PreviewComponent } from './model/preview/preview.component';
import { DetailComponent } from './model/detail/detail.component';
import { SwiperModule } from 'swiper/angular';
import { DeleteComponent } from './model/delete/delete.component';
import { RenameComponent } from './model/rename/rename.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { ShorterPipe } from './pipes/shorter.pipe';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDividerModule} from '@angular/material/divider';
import { FilterPipe } from './pipes/filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    FileComponent,
    GalleryComponent,
    NewComponent,
    FooterComponent,
    NavbarComponent,
    SafeURLPipe,
    PreviewComponent,
    DetailComponent,
    DeleteComponent,
    RenameComponent,
    ShorterPipe,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatListModule,
    MatSnackBarModule,
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    SwiperModule,
    NgxPaginationModule,
    DragDropModule,
    MatTabsModule,
    MatDividerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
