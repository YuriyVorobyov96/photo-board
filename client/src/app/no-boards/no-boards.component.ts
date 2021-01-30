import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BoardService } from 'src/app/shared/services/board.service';
import { CreateBoardModalComponent } from '../shared/components/create-board-modal/create-board-modal.component';
import { ErrorService } from '../shared/services/error.service';

@Component({
  selector: 'app-no-boards',
  templateUrl: './no-boards.component.html',
  styleUrls: ['./no-boards.component.css']
})
export class NoBoardsComponent implements OnInit {

  name = '';

  constructor(
    public dialog: MatDialog,
    public boardService: BoardService,
  ) { }

  ngOnInit(): void {
  }

  openDialog(): void {
    this.dialog.open(CreateBoardModalComponent, {
      width: '48%',
      height: '43%',
      data: { name: this.name },
    });
  }

}
