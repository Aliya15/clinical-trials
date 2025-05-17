import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { TrialsService } from '../../services/trials.service';
import { TrialStudyItem } from '../../../../shared/models/trial.model';
import { AsyncPipe } from '@angular/common';
import { TrialsListComponent } from '../trials-list/trials-list.component';

@Component({
  selector: 'app-favorite-trials',
  imports: [AsyncPipe, TrialsListComponent],
  templateUrl: './favorite-trials.component.html',
  styleUrl: './favorite-trials.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoriteTrialsComponent {
  private readonly trialService = inject(TrialsService);
  favoritesList$ = this.trialService.getFavorites();
  readonly trialStudiesList = input.required<TrialStudyItem[]>();

  getTrialId(trial: TrialStudyItem): string {
    return trial.protocolSection.identificationModule.nctId;
  }

  addToFavorites(trial: TrialStudyItem): void {
    this.trialService.removeFromFavorites(this.getTrialId(trial));
  }
}
