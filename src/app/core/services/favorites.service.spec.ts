import { TestBed } from '@angular/core/testing';

import { Photo } from '../models/photo.model';
import { FavoritesService } from './favorites.service';

describe('FavoritesService', () => {
  const storageKey = 'photo-library-favorites';

  const photo: Photo = {
    id: 1,
    url: 'https://picsum.photos/seed/1/200/300',
    alt: 'Random photo 1'
  };

  beforeEach(() => {
    localStorage.removeItem(storageKey);
    TestBed.configureTestingModule({});
  });

  afterEach(() => {
    localStorage.removeItem(storageKey);
  });

  it('should create the service', () => {
    const service = TestBed.inject(FavoritesService);

    expect(service).toBeTruthy();
  });

  it('should add a photo to favorites and persist it', () => {
    const service = TestBed.inject(FavoritesService);

    service.addFavorite(photo);

    expect(service.isFavorite(photo.id)).toBeTrue();
    expect(service.getFavoriteById(photo.id)).toEqual(photo);

    const storedFavorites = JSON.parse(
      localStorage.getItem(storageKey) ?? '[]'
    );

    expect(storedFavorites).toEqual([photo]);
  });

  it('should not add the same photo more than once', () => {
    const service = TestBed.inject(FavoritesService);

    service.addFavorite(photo);
    service.addFavorite(photo);

    const storedFavorites = JSON.parse(
      localStorage.getItem(storageKey) ?? '[]'
    );

    expect(storedFavorites.length).toBe(1);
  });

  it('should remove a photo from favorites', () => {
    const service = TestBed.inject(FavoritesService);

    service.addFavorite(photo);
    service.removeFavorite(photo.id);

    expect(service.isFavorite(photo.id)).toBeFalse();
    expect(service.getFavoriteById(photo.id)).toBeUndefined();

    const storedFavorites = JSON.parse(
      localStorage.getItem(storageKey) ?? '[]'
    );

    expect(storedFavorites).toEqual([]);
  });

  it('should load favorites from local storage', () => {
    localStorage.setItem(storageKey, JSON.stringify([photo]));

    const service = TestBed.inject(FavoritesService);

    expect(service.isFavorite(photo.id)).toBeTrue();
    expect(service.getFavoriteById(photo.id)).toEqual(photo);
  });
});