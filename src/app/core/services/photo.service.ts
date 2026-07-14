import { Service } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

import { Photo } from '../models/photo.model';

@Service()
export class PhotoService {
  private readonly imageWidth = 200;
  private readonly imageHeight = 300;
  private nextPhotoId = 1;

  getPhotos(count: number): Observable<Photo[]> {
    const photos = Array.from({ length: count }, () => this.createPhoto());
    const loadingDelay = this.getRandomDelay();

    return of(photos).pipe(delay(loadingDelay));
  }

  private createPhoto(): Photo {
    const id = this.nextPhotoId++;

    return {
      id,
      url: `https://picsum.photos/seed/${id}/${this.imageWidth}/${this.imageHeight}`,
      alt: `Random photo ${id}`
    };
  }

  private getRandomDelay(): number {
    return Math.floor(Math.random() * 101) + 200;
  }
}