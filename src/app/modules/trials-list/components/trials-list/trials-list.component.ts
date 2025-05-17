import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TrialStudyItem } from '../../../../shared/models/trial.model';

@Component({
  selector: 'app-trials-list',
  imports: [CardComponent, MatIconModule, MatButtonModule],
  templateUrl: './trials-list.component.html',
  styleUrl: './trials-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrialsListComponent {
  trialStudiesList = input.required<TrialStudyItem[]>();
  toggleFavoriteButton = output<TrialStudyItem>();

  addToFavorites(trial: TrialStudyItem) {
    this.toggleFavoriteButton.emit(trial);
  }
}
