import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent {
  @Input() rating: number;
  @Output() ratingChange = new EventEmitter<number>();

  stars: number[] = [1, 2, 3, 4, 5];

  setRating(newRating: number): void {
    if (this.rating === newRating) {
      this.rating = 0;
    } else {
      this.rating = newRating;
    }
    this.ratingChange.emit(this.rating);
  }
}
