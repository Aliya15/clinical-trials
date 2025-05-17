import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { TrialStudyItem } from '../../../../shared/models/trial.model';
import { MatIconModule } from '@angular/material/icon';
import { TrialsService } from '../../services/trials.service';
import { Observable } from 'rxjs';
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
  trialStudiesList$: Observable<TrialStudyItem[]> =
    this.trialService.startTrialStudiesPolling();
  readonly trialStudiesList = input.required<TrialStudyItem[]>();

  addToFavorites(trial: TrialStudyItem): void {
    this.trialService.addToFavorites(trial);
  }
}
