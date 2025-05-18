import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { StudyTrialItem } from '../../../../shared/models/trial.model';
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
export class AllTrialListComponent implements OnInit {
  private readonly trialService = inject(TrialsService);
  studyTrialList$: Observable<StudyTrialItem[]> =
    this.trialService.startStudyTrialPolling();
  readonly studyTrialList = input.required<StudyTrialItem[]>();
  favoriteList = signal<string[]>([]);

  ngOnInit(): void {
    this.trialService.getFavorites().subscribe((data: StudyTrialItem[]) => {
      const ids = data.map(
        trial => trial.protocolSection.identificationModule.nctId
      );
      this.favoriteList.set(ids);
    });
  }

  addToFavorites(trial: StudyTrialItem): void {
    this.trialService.addToFavorites(trial);
    this.favoriteList.set([
      ...this.favoriteList(),
      trial.protocolSection.identificationModule.nctId,
    ]);
  }
}
