import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Photo } from '../../../core/models/photo.model';
import { FavoritesService } from '../../../core/services/favorites.service';

@Component({
  selector: 'app-favorites-page',
  standalone: false,
  templateUrl: './favorites-page.component.html',
  styleUrl: './favorites-page.component.scss'
})
export class FavoritesPageComponent {
  readonly favorites$: Observable<Photo[]>;

  constructor(
    private readonly favoritesService: FavoritesService,
    private readonly router: Router
  ) {
    this.favorites$ = this.favoritesService.favorites$;
  }

  openPhoto(photo: Photo): void {
    void this.router.navigate(['/photos', photo.id]);
  }
}