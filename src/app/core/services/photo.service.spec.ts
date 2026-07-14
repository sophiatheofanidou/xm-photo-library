import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { PhotoService } from './photo.service';

describe('PhotoService', () => {
  let service: PhotoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhotoService);
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should return the requested number of photos with unique IDs', fakeAsync(() => {
    spyOn(Math, 'random').and.returnValue(0);

    const subscription = service.getPhotos(3).subscribe(photos => {
      expect(photos.length).toBe(3);
      expect(photos.map(photo => photo.id)).toEqual([1, 2, 3]);
      expect(photos[0].url).toBe(
        'https://picsum.photos/seed/1/200/300'
      );
      expect(photos[0].alt).toBe('Random photo 1');
    });

    tick(200);
    subscription.unsubscribe();
  }));

  it('should simulate an asynchronous loading delay', fakeAsync(() => {
    spyOn(Math, 'random').and.returnValue(0);

    let hasEmitted = false;

    service.getPhotos(1).subscribe(() => {
      hasEmitted = true;
    });

    tick(199);
    expect(hasEmitted).toBeFalse();

    tick(1);
    expect(hasEmitted).toBeTrue();
  }));
});