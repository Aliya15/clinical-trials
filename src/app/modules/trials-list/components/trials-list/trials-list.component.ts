import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { StudyTrialItem } from '../../../../shared/models/trial.model';

@Component({
  selector: 'app-trials-list',
  imports: [CardComponent, MatIconModule, MatButtonModule],
  templateUrl: './trials-list.component.html',
  styleUrl: './trials-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrialsListComponent {
  studyTrialList = input.required<StudyTrialItem[]>();
  toggleFavoriteButton = output<StudyTrialItem>();
  favoriteList = input<string[]>([]);
  isFavoriteList = input<boolean>(false);

  isFavorite(trial: StudyTrialItem): boolean {
    return this.favoriteList().includes(
      trial.protocolSection.identificationModule.nctId
    );
  }

  addToFavorites(trial: StudyTrialItem) {
    this.toggleFavoriteButton.emit(trial);
  }
}
