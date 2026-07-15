import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  OnDestroy,
  Output
} from '@angular/core';

@Directive({
  selector: '[appInfiniteScroll]',
  standalone: false
})
export class InfiniteScrollDirective implements AfterViewInit, OnDestroy {
  @Output() visible = new EventEmitter<void>();

  private observer: IntersectionObserver | undefined;

  constructor(
    private readonly elementRef: ElementRef<HTMLElement>
  ) {}

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver(
      entries => {
        const entry = entries[0];

        if (entry?.isIntersecting) {
          this.visible.emit();
        }
      },
      {
        root: null,
        rootMargin: '200px 0px',
        threshold: 0
      }
    );

    this.observer.observe(this.elementRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}