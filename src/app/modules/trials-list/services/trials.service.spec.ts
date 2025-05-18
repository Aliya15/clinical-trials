import { TrialsService } from './trials.service';
import { of, take } from 'rxjs';
import {
  StudyTrialData,
  StudyTrialItem,
} from '../../../shared/models/trial.model';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

const mockStudyTrialData: StudyTrialData = {
  totalCount: 2,
  nextPageToken: 'token-123',
  studies: [
    {
      protocolSection: {
        officialTitle: 'Study of Treatment A vs Placebo',
        statusModule: {
          statusVerifiedDate: '2024-12-01',
          overallStatus: 'Recruiting',
        },
        descriptionModule: {
          briefSummary:
            'This study investigates the effects of Treatment A in adults.',
        },
        identificationModule: {
          briefTitle: 'Treatment A Study',
          officialTitle: 'A Randomized Study of Treatment A',
          nctId: 'NCT00000001',
        },
      },
    },
    {
      protocolSection: {
        officialTitle: 'Effectiveness of Treatment B',
        statusModule: {
          statusVerifiedDate: '2025-01-15',
          overallStatus: 'Completed',
        },
        descriptionModule: {
          briefSummary:
            'A study evaluating the long-term outcomes of Treatment B.',
        },
        identificationModule: {
          briefTitle: 'Treatment B Outcomes',
          officialTitle: 'A Follow-up Study of Treatment B',
          nctId: 'NCT00000002',
        },
      },
    },
  ],
};

describe('TrialsService', () => {
  let service: TrialsService;
  let getStudyTrialSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TrialsService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(TrialsService);
  });

  describe('fetching trials list', () => {
    it('should emit and accumulate values in interval', fakeAsync(() => {
      getStudyTrialSpy = spyOn(service, 'getStudyTrial').and.returnValue(
        of(mockStudyTrialData)
      );

      let result: StudyTrialItem[] = [];

      service.startStudyTrialPolling(1000).subscribe(res => (result = res));

      tick(1000);
      tick(1000);
      tick(1000);

      expect(result.length).toBe(mockStudyTrialData.studies.length * 4);
      expect(getStudyTrialSpy).toHaveBeenCalledTimes(4);
    }));

    it('should accumulate up to 10 items', fakeAsync(() => {
      getStudyTrialSpy = spyOn(service, 'getStudyTrial').and.returnValue(
        of(mockStudyTrialData)
      );

      let result: StudyTrialItem[] = [];

      service.startStudyTrialPolling(10).subscribe(res => (result = res));

      tick(1000);

      expect(result.length).toBe(10);
    }));
  });

  describe('favorites handling', () => {
    it('should add trails to favorites without duplicates', done => {
      service.addToFavorites(mockStudyTrialData.studies[0]);
      service.addToFavorites(mockStudyTrialData.studies[0]);

      service
        .getFavorites()
        .pipe(take(1))
        .subscribe(favorites => {
          expect(favorites.length).toBe(1);
          done();
        });
    });

    it('should multiple add trails to favorites', done => {
      service.addToFavorites(mockStudyTrialData.studies[0]);
      service.addToFavorites(mockStudyTrialData.studies[1]);

      service
        .getFavorites()
        .pipe(take(1))
        .subscribe(favorites => {
          expect(favorites.length).toBe(2);
          done();
        });
    });

    it('should remove trials from favorites', done => {
      service.addToFavorites(mockStudyTrialData.studies[0]);
      service.addToFavorites(mockStudyTrialData.studies[1]);

      service.removeFromFavorites(mockStudyTrialData.studies[0]);

      service
        .getFavorites()
        .pipe(take(1))
        .subscribe(favorites => {
          expect(favorites.length).toBe(1);
          done();
        });
    });
  });
});
