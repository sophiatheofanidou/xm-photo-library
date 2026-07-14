import { Service } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Photo } from '../models/photo.model';

@Service()
export class FavoritesService {
  private readonly storageKey = 'photo-library-favorites';

  private readonly favoritesSubject = new BehaviorSubject<Photo[]>(
    this.loadFavorites()
  );

  readonly favorites$: Observable<Photo[]> =
    this.favoritesSubject.asObservable();

  addFavorite(photo: Photo): void {
    const favorites = this.favoritesSubject.value;
    const alreadyExists = favorites.some(
      favorite => favorite.id === photo.id
    );

    if (alreadyExists) {
      return;
    }

    this.updateFavorites([...favorites, photo]);
  }

  removeFavorite(id: number): void {
    const updatedFavorites = this.favoritesSubject.value.filter(
      favorite => favorite.id !== id
    );

    this.updateFavorites(updatedFavorites);
  }

  getFavoriteById(id: number): Photo | undefined {
    return this.favoritesSubject.value.find(
      favorite => favorite.id === id
    );
  }

  isFavorite(id: number): boolean {
    return this.favoritesSubject.value.some(
      favorite => favorite.id === id
    );
  }

  private updateFavorites(favorites: Photo[]): void {
    this.favoritesSubject.next(favorites);

    localStorage.setItem(
      this.storageKey,
      JSON.stringify(favorites)
    );
  }

  private loadFavorites(): Photo[] {
    const storedFavorites = localStorage.getItem(this.storageKey);

    if (!storedFavorites) {
      return [];
    }

    try {
      const parsedFavorites: unknown = JSON.parse(storedFavorites);

      return Array.isArray(parsedFavorites)
        ? parsedFavorites as Photo[]
        : [];
    } catch {
      return [];
    }
  }
}