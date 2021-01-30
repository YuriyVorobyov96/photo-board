import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BoardService } from '../shared/services/board.service';
import { ErrorService } from '../shared/services/error.service';

@Component({
  selector: 'app-delete-board-modal',
  templateUrl: './delete-board-modal.component.html',
  styleUrls: ['./delete-board-modal.component.css']
})
export class DeleteBoardModalComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteBoardModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { name: string },
    public boardService: BoardService,
    public errorService: ErrorService,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteBoard(): void {
    this.boardService.deleteBoard();
    this.dialogRef.close();
  }

}
