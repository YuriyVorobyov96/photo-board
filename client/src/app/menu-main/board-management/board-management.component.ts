import { Component, AfterViewInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BoardService } from 'src/app/shared/services/board.service';
import { IBoard, IImage } from 'src/app/shared/interfaces';
import { ImageService } from 'src/app/shared/services/image.service';
import { Subscription } from 'rxjs';
import { ErrorService } from 'src/app/shared/services/error.service';
import { CreateBoardModalComponent } from 'src/app/shared/components/create-board-modal/create-board-modal.component';
import { DeleteBoardModalComponent } from 'src/app/delete-board-modal/delete-board-modal.component';

@Component({
  selector: 'app-board-management',
  templateUrl: './board-management.component.html',
  styleUrls: ['./board-management.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class BoardManagementComponent implements AfterViewInit, OnDestroy {

  name = '';
  boards: IBoard[] = [];
  images: IImage[] = [];
  subsNewBoard$!: Subscription;
  subsBoardToDelete$!: Subscription;
  selectedBoard = '';
  currentBoardId = '';

  constructor(
    public dialog: MatDialog,
    public boardService: BoardService,
    public imageService: ImageService,
    public errorService: ErrorService,
  ) {}

  ngAfterViewInit(): void {
    this.boardService.getBoards()
      .subscribe(
        data => this.boards = data,
        err => this.errorService.openSnackBar(err.error.error),
      );
    this.subsNewBoard$ = this.boardService.newBoard$
      .subscribe(board => this.boards.push(board));
    this.subsBoardToDelete$ = this.boardService.boardToDelete$
        .subscribe(boardToDelete => {
          if (boardToDelete) {
            const idxBoardToDelete = this.boards.map(board => board._id).indexOf(boardToDelete);

            if (~idxBoardToDelete) {
              this.boards.splice(idxBoardToDelete, 1);
            }

            this.selectedBoard = '';
          }
        });
  }

  ngOnDestroy(): void {
    this.subsNewBoard$.unsubscribe();
    this.subsBoardToDelete$.unsubscribe();
  }

  setBoard(id: string): void {
    this.boardService.setCurrentBoard(id);

    this.imageService.getImages(id);
  }

  openDialog(): void {
    this.dialog.open(CreateBoardModalComponent, {
      width: '48%',
      height: '43%',
      data: { name: this.name },
    });
  }

  openDeletionDialog(): void {
    this.dialog.open(DeleteBoardModalComponent, {
      width: '30%',
      height: '33%',
    });
  }
}
