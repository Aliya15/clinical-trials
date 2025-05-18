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
import { TrialsService } from '../../services/trials.service';

@Component({
  selector: 'app-trials-list',
  imports: [CardComponent, MatIconModule, MatButtonModule],
  templateUrl: './trials-list.component.html',
  styleUrl: './trials-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrialsListComponent {
  readonly studyTrialList = input.required<StudyTrialItem[]>();
  readonly favoritesMap = input<Record<string, boolean> | null>();
  readonly isFavoriteList = input<boolean>(false);

  readonly removeFavorite = output<StudyTrialItem>();
  readonly addFavorite = output<StudyTrialItem>();

  isFavorite(trial: StudyTrialItem): boolean {
    return this.favoritesMap()?.[TrialsService.getTrialId(trial)] ?? false;
  }

  toggleFavorites(trial: StudyTrialItem): void {
    if (this.isFavorite(trial) || this.isFavoriteList()) {
      this.removeFavorite.emit(trial);
    } else {
      this.addFavorite.emit(trial);
    }
  }
}
