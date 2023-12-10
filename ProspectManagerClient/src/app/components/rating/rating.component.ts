import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent {
  @Input() rating: number;
  @Output() ratingChange = new EventEmitter<number>();
  @Input() customIcons: string[] | null = null;
  @Input() customColors: string[] | null = null;
  @Input() readonly = false;
  @Input() label: string;

  defaultStars: number[] = [1, 2, 3, 4, 5];

  setRating(newRating: number): void {
    this.rating = this.rating === newRating ? 0 : newRating;
    this.ratingChange.emit(this.rating);
  }

  getIcon(index: number): string {
    if (this.customIcons && index < this.customIcons.length) {
      return this.customIcons[index];
    }
    return index < this.rating ? 'star' : 'star_border';
  }

  getColor(index: number): string {
    if (this.customColors && index < this.customColors.length) {
      return this.rating > index ? this.customColors[index] : '#c5c5c5';
    }
    return this.rating > index ? 'goldenrod' : '#c5c5c5';
  }
}
