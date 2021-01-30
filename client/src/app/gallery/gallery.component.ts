import { AfterViewInit, Component, Inject, OnDestroy } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/internal/operators/tap';
import { IImage } from '../shared/interfaces';
import { BoardService } from '../shared/services/board.service';
import { ErrorService } from '../shared/services/error.service';
import { ImageService } from '../shared/services/image.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
})
export class GalleryComponent implements AfterViewInit, OnDestroy {

  newImagesUrls: string[] = [];
  pending = true;
  placeholder = '../../assets/image-not-found.jpg';
  tagPlaceholder = '\'&nbsp;\'';
  currentBoardId = '';
  subsNewImagesUrls$!: Subscription;
  subsNewSavedImages$!: Subscription;
  subsUpdatedImages$!: Subscription;
  subsCurrentBoard$!: Subscription;
  subsUncheckAll$!: Subscription;
  imagesOnCurrentBoard$!: Observable<IImage[]>;
  images: IImage[] = [];

  constructor(
    public dialog: MatDialog,
    public imageService: ImageService,
    public boardService: BoardService,
    public errorService: ErrorService,
  ) { }

  ngAfterViewInit(): void {
    this.subsCurrentBoard$ = this.boardService.currentBoard$
      .subscribe(id => {
        this.currentBoardId = id;
        this.pending = true;
        this.imagesOnCurrentBoard$ = this.imageService.getImages(id)
          .pipe(
            tap(
              imagesInfo => {
                this.images = imagesInfo;
                this.pending = false;
              },
              err => this.errorService.openSnackBar(err.error.error),
            )
          );
      });
    this.subsNewSavedImages$ = this.imageService.newSavedImage$
      .subscribe(newSavedImage => this.images.unshift(newSavedImage));
    this.subsUpdatedImages$ = this.imageService.updatedImagesOnBoard$
      .subscribe(updatedImages => this.images = updatedImages);
    this.subsUncheckAll$ = this.boardService.isUncheckAll$
      .subscribe(isUncheckAll => {
        if (isUncheckAll) {
          this.imageService.uncheckAll();
        }
      });
  }

  ngOnDestroy(): void {
    this.subsUncheckAll$.unsubscribe();
    this.subsNewSavedImages$.unsubscribe();
    this.subsUpdatedImages$.unsubscribe();
    this.subsCurrentBoard$.unsubscribe();
  }

  openDialog(url: string): void {
    this.dialog.open(OpenImageModalWindow, { data: { url } });
  }

  checkImage(event: MatCheckboxChange, id: any): void {
    if (event.checked) {
      this.imageService.checkImage(id);
    } else {
      this.imageService.unCheckImage(id);
    }
  }
}

@Component({
  selector: 'app-open-image-modal-window',
  templateUrl: 'open-image-modal-window.html',
  styleUrls: ['./open-image-modal-window.css'],
})
export class OpenImageModalWindow {

  constructor(
    public dialogRef: MatDialogRef<OpenImageModalWindow>,
    @Inject(MAT_DIALOG_DATA) public data: { url: string },
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
