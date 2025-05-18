import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TrialsService } from '../../services/trials.service';
import { StudyTrialItem } from '../../../../shared/models/trial.model';
import { AsyncPipe } from '@angular/common';
import { TrialsListComponent } from '../trials-list/trials-list.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-favorite-trials',
  imports: [AsyncPipe, TrialsListComponent, MatButtonModule, RouterLink],
  templateUrl: './favorite-trials.component.html',
  styleUrl: './favorite-trials.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoriteTrialsComponent {
  private readonly trialService = inject(TrialsService);

  readonly favoritesList$ = this.trialService.getFavorites();

  removeFromFavorites(trial: StudyTrialItem): void {
    this.trialService.removeFromFavorites(trial);
  }
}
