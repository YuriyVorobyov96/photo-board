import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { HeaderComponent } from './header/header.component';
import { MenuMainComponent } from './menu-main/menu-main.component';
import { UrlInputComponent } from './menu-main/url-input/url-input.component';
import { BoardManagementComponent } from './menu-main/board-management/board-management.component';
import { GalleryComponent } from './gallery/gallery.component';
import { HttpClientModule } from '@angular/common/http';
import { ErrorSnackbarComponent } from './shared/error-snackbar/error-snackbar.component';
import { ImgFallbackModule } from 'ngx-img-fallback';
import { NoBoardsComponent } from './no-boards/no-boards.component';
import { CreateBoardModalComponent } from './shared/components/create-board-modal/create-board-modal.component';
import { DeleteBoardModalComponent } from './delete-board-modal/delete-board-modal.component';
import { MasonryGalleryModule } from 'ngx-masonry-gallery';
import { NgxMasonryModule } from 'ngx-masonry';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuMainComponent,
    UrlInputComponent,
    BoardManagementComponent,
    GalleryComponent,
    ErrorSnackbarComponent,
    NoBoardsComponent,
    CreateBoardModalComponent,
    DeleteBoardModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    HttpClientModule,
    ImgFallbackModule,
    MatGridListModule,
    MatCheckboxModule,
    MatMenuModule,
    ReactiveFormsModule,
    MasonryGalleryModule,
    NgxMasonryModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
