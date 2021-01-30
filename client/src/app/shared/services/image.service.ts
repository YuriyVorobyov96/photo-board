import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { IImage } from '../interfaces';
import { BoardService } from './board.service';
import { ErrorService } from './error.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(
    private http: HttpClient,
    private boardService: BoardService,
    public errorService: ErrorService,
  ) { }

  private checkedImages: string[] = [];
  private _isCheckedImages = new BehaviorSubject<boolean>(false);
  private _newImageUrl = new BehaviorSubject<string[]>([]);

  newImageUrl$ = this._newImageUrl.asObservable();
  isCheckedImages$ = this._isCheckedImages.asObservable();
  updatedImagesOnBoard$ = new Subject<IImage[]>();
  imagesOnCurrentBoard$ = new Subject<IImage[]>();
  newSavedImage$ = new Subject<IImage>();

  addImageToBoard(url: string): void {
    const boardId = this.boardService.getCurrentBoard();

    this.http.post<any>(`${environment.apiUrl}/images/board/${boardId}`, { url })
      .subscribe(
        imageInfo => this.newSavedImage$.next(imageInfo),
        err => this.errorService.openSnackBar(err.error.error),
      );
  }

  getImagesTags(): void {
    const boardId = this.boardService.getCurrentBoard();

    this.http.get(`${environment.apiUrl}/images/board/${boardId}/tags/?ids=${JSON.stringify(this.checkedImages)}`)
      .subscribe(
        imagesInfo => {
          this.updatedImagesOnBoard$.next(imagesInfo as IImage[]);
          this.uncheckAll();
        },
        err => {
          this.uncheckAll();
          this.errorService.openSnackBar(
            err.error.error.hasOwnProperty('serverError') ?  `Can't match tags to this photo` : err.error.error);
        },
      );
  }

  getImages(boardId: string): Observable<IImage[]> {
    return this.http.get<IImage[]>(`${environment.apiUrl}/images/board/${boardId}`);
  }

  deleteImages(): void {
    const boardId = this.boardService.getCurrentBoard();

    this.http.request('delete', `${environment.apiUrl}/images/board/${boardId}`, { body: { ids: this.checkedImages } })
      .subscribe(
        imagesInfo => this.updatedImagesOnBoard$.next(imagesInfo as IImage[]),
        err => this.errorService.openSnackBar(err.error.error),
      );
  }

  checkImage(id: string): void {
    this.checkedImages.push(id);
    this._isCheckedImages.next(true);
  }

  unCheckImage(id: string): void {
    const idxOfElementToDelete = this.checkedImages.indexOf(id);

    if (~idxOfElementToDelete) {
      this.checkedImages.splice(idxOfElementToDelete, 1);

      if (!this.checkedImages.length) {
        this._isCheckedImages.next(false);
      }
    }
  }

  uncheckAll(): void {
    this.checkedImages = [];
    this._isCheckedImages.next(false);
  }
}
