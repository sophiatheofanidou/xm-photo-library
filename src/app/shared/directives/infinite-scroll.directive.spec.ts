import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import {
  Directive,
  EventEmitter,
  Output
} from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { of } from 'rxjs';

import { Photo } from '../../core/models/photo.model';
import { FavoritesService } from '../../core/services/favorites.service';
import { PhotoService } from '../../core/services/photo.service';
import { PhotoGridComponent } from '../../shared/components/photo-grid/photo-grid.component';
import { PhotosPageComponent } from '../../features/photos/photos-page/photos-page.component';

@Directive({
  selector: '[appInfiniteScroll]',
  standalone: false
})
class InfiniteScrollStubDirective {
  @Output() visible = new EventEmitter<void>();
}

describe('PhotosPageComponent', () => {
  let component: PhotosPageComponent;
  let fixture: ComponentFixture<PhotosPageComponent>;
  let photoService: jasmine.SpyObj<PhotoService>;
  let favoritesService: jasmine.SpyObj<FavoritesService>;

  const photos: Photo[] = [
    {
      id: 1,
      url: 'https://picsum.photos/seed/1/200/300',
      alt: 'Random photo 1'
    },
    {
      id: 2,
      url: 'https://picsum.photos/seed/2/200/300',
      alt: 'Random photo 2'
    }
  ];

  beforeEach(async () => {
    photoService = jasmine.createSpyObj<PhotoService>(
      'PhotoService',
      ['getPhotos']
    );

    favoritesService = jasmine.createSpyObj<FavoritesService>(
      'FavoritesService',
      ['addFavorite']
    );

    photoService.getPhotos.and.returnValue(of(photos));

    await TestBed.configureTestingModule({
      imports: [
        MatProgressSpinnerModule
      ],
      declarations: [
        PhotosPageComponent,
        PhotoGridComponent,
        InfiniteScrollStubDirective
      ],
      providers: [
        {
          provide: PhotoService,
          useValue: photoService
        },
        {
          provide: FavoritesService,
          useValue: favoritesService
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PhotosPageComponent);
    component = fixture.componentInstance;

    spyOn<any>(
      component,
      'ensureScrollablePage'
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load the initial batch of photos', () => {
    fixture.detectChanges();

    expect(photoService.getPhotos)
      .toHaveBeenCalledOnceWith(12);

    expect(component.photos).toEqual(photos);
    expect(component.isLoading).toBeFalse();
  });

  it('should add the selected photo to favorites', () => {
    component.addToFavorites(photos[0]);

    expect(favoritesService.addFavorite)
      .toHaveBeenCalledOnceWith(photos[0]);
  });
});