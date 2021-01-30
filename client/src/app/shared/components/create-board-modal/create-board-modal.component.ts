import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BoardService } from '../../services/board.service';
import { ErrorService } from '../../services/error.service';

@Component({
  selector: 'app-create-board-modal',
  templateUrl: './create-board-modal.component.html',
  styleUrls: ['./create-board-modal.component.css']
})
export class CreateBoardModalComponent {

  constructor(
    public dialogRef: MatDialogRef<CreateBoardModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { name: string },
    public boardService: BoardService,
    public errorService: ErrorService,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  createNewBoard(): void {
    this.boardService.createBoard(this.data.name)
      .subscribe(
        data => {
          this.boardService.newBoard$.next(data);
          this.dialogRef.close(data.name);
        },
        err => this.errorService.openSnackBar(err.error.error),
      );
  }
}
