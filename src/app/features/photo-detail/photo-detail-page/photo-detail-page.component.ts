import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Photo } from '../../../core/models/photo.model';
import { FavoritesService } from '../../../core/services/favorites.service';

@Component({
  selector: 'app-photo-detail-page',
  standalone: false,
  templateUrl: './photo-detail-page.component.html',
  styleUrl: './photo-detail-page.component.scss'
})
export class PhotoDetailPageComponent implements OnInit {
  photo: Photo | undefined;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly favoritesService: FavoritesService
  ) { }

  ngOnInit(): void {
    const photoId = Number(this.route.snapshot.paramMap.get('id'));

    if (!Number.isInteger(photoId)) {
      return;
    }

    this.photo = this.favoritesService.getFavoriteById(photoId);
  }

  removeFromFavorites(): void {
    if (!this.photo) {
      return;
    }

    this.favoritesService.removeFavorite(this.photo.id);
    void this.router.navigate(['/favorites']);
  }

  get fullSizePhotoUrl(): string | undefined {
    if (!this.photo) {
      return undefined;
    }

    return `https://picsum.photos/seed/${this.photo.id}/1200/900`;
  }
}