import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { BoardService } from 'src/app/shared/services/board.service';
import { ImageService } from 'src/app/shared/services/image.service';

@Component({
  selector: 'app-url-input',
  templateUrl: './url-input.component.html',
  styleUrls: ['./url-input.component.css']
})
export class UrlInputComponent implements AfterViewInit, OnDestroy {

  url = '';
  currentBoardId = '';
  subs$!: Subscription;

  constructor(
    public boardService: BoardService,
    public imageService: ImageService,
  ) { }

  ngAfterViewInit(): void {
    this.subs$ = this.boardService.currentBoard$
      .subscribe(id => {
        this.currentBoardId = id;
      });
  }

  ngOnDestroy() {
    this.subs$.unsubscribe();
  }

  addImage(url: string) {
    this.imageService.addImageToBoard(url);
  }

}
