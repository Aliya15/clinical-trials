import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { StudyTrialItem } from '../../../../shared/models/trial.model';
import { MatIconModule } from '@angular/material/icon';
import { TrialsService } from '../../services/trials.service';
import { AsyncPipe } from '@angular/common';
import { TrialsListComponent } from '../trials-list/trials-list.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-all-trials-list',
  imports: [
    MatIconModule,
    AsyncPipe,
    TrialsListComponent,
    MatButtonModule,
    RouterLink,
  ],
  templateUrl: './all-trial-list.component.html',
  styleUrl: './all-trial-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AllTrialListComponent {
  private readonly trialService = inject(TrialsService);

  readonly studyTrialList$ = this.trialService.startStudyTrialPolling();

  readonly favoritesMap$ = this.trialService.getFavoritesMap();

  addToFavorites(trial: StudyTrialItem): void {
    this.trialService.addToFavorites(trial);
  }

  removeFromFavorites(trial: StudyTrialItem): void {
    this.trialService.removeFromFavorites(trial);
  }
}
