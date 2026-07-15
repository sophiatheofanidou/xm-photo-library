import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';
import { finalize } from 'rxjs';

import { Photo } from '../../../core/models/photo.model';
import { FavoritesService } from '../../../core/services/favorites.service';
import { PhotoService } from '../../../core/services/photo.service';

@Component({
  selector: 'app-photos-page',
  standalone: false,
  templateUrl: './photos-page.component.html',
  styleUrl: './photos-page.component.scss'
})
export class PhotosPageComponent implements OnInit {
  private readonly batchSize = 12;

  photos: Photo[] = [];
  isLoading = false;

  constructor(
    private readonly photoService: PhotoService,
    private readonly favoritesService: FavoritesService,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadMorePhotos();
  }

  loadMorePhotos(): void {
    if (this.isLoading) {
      return;
    }

    this.isLoading = true;
    this.changeDetectorRef.markForCheck();

    this.photoService
      .getPhotos(this.batchSize)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.changeDetectorRef.markForCheck();
        })
      )
      .subscribe({
        next: photos => {
          this.photos = [...this.photos, ...photos];
          this.changeDetectorRef.markForCheck();

          this.ensureScrollablePage();
        }
      });
  }

  addToFavorites(photo: Photo): void {
    this.favoritesService.addFavorite(photo);
  }

  private ensureScrollablePage(): void {
    queueMicrotask(() => {
      const pageHasScrollbar =
        document.documentElement.scrollHeight > window.innerHeight;

      if (!pageHasScrollbar) {
        this.loadMorePhotos();
      }
    });
  }
}