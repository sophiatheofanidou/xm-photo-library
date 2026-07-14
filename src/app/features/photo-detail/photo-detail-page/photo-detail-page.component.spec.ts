import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MatButtonModule } from '@angular/material/button';
import { convertToParamMap } from '@angular/router';

import { Photo } from '../../../core/models/photo.model';
import { FavoritesService } from '../../../core/services/favorites.service';
import { PhotoDetailPageComponent } from './photo-detail-page.component';

describe('PhotoDetailPageComponent', () => {
  let component: PhotoDetailPageComponent;
  let fixture: ComponentFixture<PhotoDetailPageComponent>;
  let favoritesService: jasmine.SpyObj<FavoritesService>;
  let router: Router;

  const photo: Photo = {
    id: 1,
    url: 'https://picsum.photos/seed/1/200/300',
    alt: 'Random photo 1'
  };

  beforeEach(async () => {
    favoritesService = jasmine.createSpyObj<FavoritesService>(
      'FavoritesService',
      ['getFavoriteById', 'removeFavorite']
    );

    favoritesService.getFavoriteById.and.returnValue(photo);

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatButtonModule
      ],
      declarations: [
        PhotoDetailPageComponent
      ],
      providers: [
        {
          provide: FavoritesService,
          useValue: favoritesService
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({
                id: '1'
              })
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoDetailPageComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  it('should load the favorite photo from the route id', () => {
    fixture.detectChanges();

    expect(favoritesService.getFavoriteById)
      .toHaveBeenCalledOnceWith(1);

    expect(component.photo).toEqual(photo);
  });

  it('should generate a full-size URL using the same photo seed', () => {
    fixture.detectChanges();

    expect(component.fullSizePhotoUrl).toBe(
      'https://picsum.photos/seed/1/1200/900'
    );
  });

  it('should remove the photo and navigate back to favorites', () => {
    const navigateSpy = spyOn(router, 'navigate')
      .and.resolveTo(true);

    fixture.detectChanges();

    component.removeFromFavorites();

    expect(favoritesService.removeFavorite)
      .toHaveBeenCalledOnceWith(photo.id);

    expect(navigateSpy).toHaveBeenCalledOnceWith([
      '/favorites'
    ]);
  });
});