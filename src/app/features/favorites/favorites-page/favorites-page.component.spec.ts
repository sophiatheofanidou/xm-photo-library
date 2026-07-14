import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { Photo } from '../../../core/models/photo.model';
import { FavoritesService } from '../../../core/services/favorites.service';
import { PhotoGridComponent } from '../../../shared/components/photo-grid/photo-grid.component';
import { FavoritesPageComponent } from './favorites-page.component';

describe('FavoritesPageComponent', () => {
  let component: FavoritesPageComponent;
  let fixture: ComponentFixture<FavoritesPageComponent>;
  let router: Router;

  const photo: Photo = {
    id: 1,
    url: 'https://picsum.photos/seed/1/200/300',
    alt: 'Random photo 1'
  };

  const favoritesServiceMock = {
    favorites$: of([photo])
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        FavoritesPageComponent,
        PhotoGridComponent
      ],
      providers: [
        {
          provide: FavoritesService,
          useValue: favoritesServiceMock
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritesPageComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to the selected photo page', () => {
    const navigateSpy = spyOn(router, 'navigate')
      .and.resolveTo(true);

    component.openPhoto(photo);

    expect(navigateSpy).toHaveBeenCalledOnceWith([
      '/photos',
      photo.id
    ]);
  });
});