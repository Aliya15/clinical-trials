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
  readonly studyTrialList = input.required<StudyTrialItem[]>();
  readonly favoriteList = input<string[]>([]);
  readonly isFavoriteList = input<boolean>(false);

  readonly toggleFavoriteButton = output<StudyTrialItem>();

  isFavorite(trial: StudyTrialItem): boolean {
    return this.favoriteList().includes(
      trial.protocolSection.identificationModule.nctId
    );
  }

  addToFavorites(trial: StudyTrialItem): void {
    this.toggleFavoriteButton.emit(trial);
  }
}
