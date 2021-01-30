import { AfterViewInit, Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { IBoardInfo } from '../shared/interfaces';
import { ImageService } from '../shared/services/image.service';

@Component({
  selector: 'app-menu-main',
  templateUrl: './menu-main.component.html',
  styleUrls: ['./menu-main.component.css']
})
export class MenuMainComponent implements AfterViewInit, OnDestroy {

  isCheckedImages = false;
  subsCheckedImages$!: Subscription;

  constructor(public imageService: ImageService) { }

  ngAfterViewInit(): void {
    this.subsCheckedImages$ = this.imageService.isCheckedImages$
      .subscribe(isCheckedImages => this.isCheckedImages = isCheckedImages);
  }

  ngOnDestroy(): void {
    this.subsCheckedImages$.unsubscribe();
  }

  runTaggingApi(): void {
    this.imageService.getImagesTags();
    this.imageService.uncheckAll();
  }

  deleteImages(): void {
    this.imageService.deleteImages();
  }

}
