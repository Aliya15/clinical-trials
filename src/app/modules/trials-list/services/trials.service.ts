import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import {
  TrialStudiesParams,
  TrialStudyData,
  TrialStudyItem,
} from '../../../shared/models/trial.model';
import {
  BehaviorSubject,
  finalize,
  Observable,
  of,
  scan,
  switchMap,
  tap,
  timer,
  withLatestFrom,
} from 'rxjs';

@Injectable()
export class TrialsService {
  private readonly apiUrl = 'api/v2';
  private readonly studiesUrl = 'studies';
  private readonly http = inject(HttpClient);

  private favoritesList = new BehaviorSubject<TrialStudyItem[]>([]);

  readonly token = new BehaviorSubject<string>('');

  getTrialStudies(params: TrialStudiesParams): Observable<TrialStudyData> {
    return this.http.get<TrialStudyData>(
      `${environment.baseUrl}/${this.apiUrl}/${this.studiesUrl}`,
      { params: { ...params } }
    );
  }

  startTrialStudiesPolling(
    intervalValue: number = 5000
  ): Observable<TrialStudyItem[]> {
    return timer(0, intervalValue).pipe(
      withLatestFrom(this.token),
      switchMap(([, pageToken]) => {
        return this.getTrialStudies({
          pageSize: pageToken ? '1' : '10',
          ...(pageToken ? { pageToken } : null),
        }).pipe(tap(trials => this.token.next(trials.nextPageToken)));
      }),
      scan(
        (accumulator, trials) => [...accumulator.slice(-9), ...trials.studies],
        [] as TrialStudyItem[]
      ),
      finalize(() => this.token.next(''))
    );
  }

  addToFavorites(trial: TrialStudyItem): void {
    const updatedTrialList = [...this.favoritesList.value, trial];
    this.favoritesList.next(updatedTrialList);
    console.log(this.favoritesList.value);
  }

  getFavorites(): Observable<TrialStudyItem[]> {
    return of(this.favoritesList.value);
  }

  removeFromFavorites(id: string): void {
    console.log('removeFromFavorites', id);
  }
}
