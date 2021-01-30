import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { IBoard } from '../interfaces';
import { tap } from 'rxjs/operators';
import { ErrorService } from './error.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  private currentBoardId = '';
  private _currentBoard = new BehaviorSubject<string>('');
  private _isUncheckAll = new BehaviorSubject<boolean>(false);

  isUncheckAll$ = this._isUncheckAll.asObservable();
  currentBoard$ = this._currentBoard.asObservable();
  newBoard$ = new Subject<IBoard>();
  boardToDelete$ = new Subject<string>();
  isBoardsExist$ = new Subject<boolean>();

  constructor(
    private http: HttpClient,
    public errorService: ErrorService,
  ) { }

  createBoard(name: string): Observable<IBoard> {
    return this.http.post<IBoard>(`${environment.apiUrl}/boards`, { name })
      .pipe(tap(data => this.isBoardsExist$.next(true)));
  }

  getBoards(): Observable<IBoard[]> {
    return this.http.get<IBoard[]>(`${environment.apiUrl}/boards`)
      .pipe(tap(data => this.currentBoardId = data[0]._id));
  }

  checkBoardsExistence(): Observable<IBoard[]> {
    return this.http.get<IBoard[]>(`${environment.apiUrl}/boards`)
      .pipe(tap(data => {
        if (data.length) {
          this.isBoardsExist$.next(true);
        } else {
          this.isBoardsExist$.next(false);
        }
      }));
  }

  deleteBoard(): void {
    this.http.delete(`${environment.apiUrl}/boards/${this.currentBoardId}`)
      .subscribe(
        () => {
          this.boardToDelete$.next(this.currentBoardId);
          this.setCurrentBoard('');
          this.checkBoardsExistence().subscribe();
        },
        err => this.errorService.openSnackBar(err.error.error || 'Error! Repeat the delete operation later'),
      );
  }

  getCurrentBoard(): string {
    return this.currentBoardId;
  }

  setCurrentBoard(id: string): void {
    this.currentBoardId = id;
    this._isUncheckAll.next(true);
    this._currentBoard.next(id);
  }
}
