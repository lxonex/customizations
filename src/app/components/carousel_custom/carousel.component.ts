import { Component, OnInit, AfterViewInit, ContentChildren, QueryList, ViewChildren, ElementRef, ViewChild, Input } from '@angular/core';
import { animate, AnimationBuilder, AnimationFactory, AnimationPlayer, style } from '@angular/animations';
import { CarouselItemDirective } from './directives/carousel-item.directive';
import { CarouselItemElementDirective } from './directives/carousel-item-element.directive';

@Component({
  selector: 'app-carousel',
  exportAs: 'carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements AfterViewInit {

  @ContentChildren(CarouselItemDirective) items: QueryList<CarouselItemDirective>;
  @ViewChildren(CarouselItemElementDirective, {read: ElementRef}) private itemsElements: QueryList<ElementRef>;
  @ViewChild('carousel', {static: false}) private carousel: ElementRef;
  @Input() timing = '250ms ease-in';
  @Input() showControls = true;
  private player: AnimationPlayer;
  private itemWidth: number;
  private currentSlide = 0;
  carouselWrapperStyle = {};

  constructor( private builder: AnimationBuilder ) { }

  ngAfterViewInit() {
    console.log(this.itemsElements);
    setTimeout(() => {
      console.log(this.itemsElements);
      //this.itemWidth = this.itemsElements.first.nativeElement.getBoundingClientRect().width;
      //this.carouselWrapperStyle = {width: `${this.itemWidth}px` };
    });
  }

  next() {
    if ( this.currentSlide + 1 === this.items.length) { return; }
    this.currentSlide = (this.currentSlide + 1) % this.items.length;
    const offset = this.currentSlide * this.itemWidth;
    const myAnimation: AnimationFactory = this.buildAnimation(offset);
    this.player = myAnimation.create(this.carousel.nativeElement);
    this.player.play();
  }

  private buildAnimation(offset) {
    return this.builder.build([
      animate(this.timing, style({transform: `translateX(-${offset}px)` }))
    ]);
  }

  prev() {
    if (this.currentSlide === 0) { return; }
    this.currentSlide = ((this.currentSlide - 1) + this.items.length) % this.items.length;
    const offset = this.currentSlide * this.itemWidth;

    const myAnimation: AnimationFactory = this.buildAnimation(offset);
    this.player = myAnimation.create(this.carousel.nativeElement);
    this.player.play();
  }

}
