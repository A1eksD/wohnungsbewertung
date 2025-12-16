import {Component, signal} from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';

@Component({
  selector: 'app-reviews',
  imports: [MatExpansionModule],
  templateUrl: './reviews.html',
  styleUrl: './reviews.scss',
})
export class Reviews {
  readonly panelOpenState = signal(false);
}
