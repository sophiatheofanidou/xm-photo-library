import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Photo } from '../../../core/models/photo.model';

@Component({
  selector: 'app-photo-grid',
  standalone: false,
  templateUrl: './photo-grid.component.html',
  styleUrl: './photo-grid.component.scss'
})
export class PhotoGridComponent {
  @Input() photos: Photo[] = [];

  @Output() photoSelected = new EventEmitter<Photo>();

  selectPhoto(photo: Photo): void {
    this.photoSelected.emit(photo);
  }
}