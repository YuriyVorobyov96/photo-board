import { AfterViewInit, Component, NgModuleFactoryLoader, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BoardService } from './shared/services/board.service';
import { ErrorService } from './shared/services/error.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {

  imageToPage = '';
  isLoading = true;
  isBoardsExist = false;
  subsIsBoardsExist$!: Subscription;

  constructor(
    public boardService: BoardService,
    public errorService: ErrorService,
  ) {}

  ngOnInit(): void {
    this.boardService.checkBoardsExistence()
      .subscribe(
        data => {
          this.isBoardsExist = Boolean(data.length);
          this.isLoading = false;
        },
        err => this.errorService.openSnackBar(err.error.error),
      );
  }

  ngAfterViewInit(): void {
    this.subsIsBoardsExist$ = this.boardService.isBoardsExist$
      .subscribe(isBoardsExist => {
        this.isLoading = false;
        this.isBoardsExist = isBoardsExist
      });
  }

  ngOnDestroy(): void {
    this.subsIsBoardsExist$.unsubscribe();
  }
}
