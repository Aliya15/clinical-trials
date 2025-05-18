import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import {
  StudyTrialData,
  StudyTrialItem,
  StudyTrialParams,
} from '../../../shared/models/trial.model';
import {
  BehaviorSubject,
  catchError,
  EMPTY,
  finalize,
  Observable,
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

  private readonly favoritesList = new BehaviorSubject<StudyTrialItem[]>([]);

  private readonly token = new BehaviorSubject<string>('');

  getStudyTrial(params: StudyTrialParams): Observable<StudyTrialData> {
    return (
      this.http
        .get<StudyTrialData>(
          `${environment.baseUrl}/${this.apiUrl}/${this.studiesUrl}`,
          { params: { ...params } }
        )
        //In the real app I would show a popup to inform a user about an error. Additionally, I would toggle sentry (f.e.)
        .pipe(catchError(() => EMPTY))
    );
  }

  startStudyTrialPolling(
    intervalValue: number = 5000
  ): Observable<StudyTrialItem[]> {
    return timer(0, intervalValue).pipe(
      withLatestFrom(this.token),
      switchMap(([, pageToken]) => {
        return this.getStudyTrial({
          pageSize: pageToken ? '1' : '10',
          ...(pageToken ? { pageToken } : null),
        }).pipe(tap(trials => this.token.next(trials.nextPageToken)));
      }),
      scan(
        (accumulator, trials) => [
          ...trials.studies,
          ...accumulator.slice(0, 9),
        ],
        [] as StudyTrialItem[]
      ),
      finalize(() => this.token.next('')),
      //In the real app I would show a popup to inform a user about an error. Additionally, I would toggle sentry (f.e.)
      catchError(() => EMPTY)
    );
  }

  addToFavorites(trial: StudyTrialItem): void {
    const updatedTrialList = [...this.favoritesList.value, trial];
    this.favoritesList.next(updatedTrialList);
  }

  getFavorites(): Observable<StudyTrialItem[]> {
    return this.favoritesList;
  }

  removeFromFavorites(id: string): void {
    const updatedList = this.favoritesList.value.filter(
      fav => fav.protocolSection.identificationModule.nctId !== id
    );
    this.favoritesList.next([...updatedList]);
  }
}
