import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteTrialsComponent } from './favorite-trials.component';
import { TrialsService } from '../../services/trials.service';
import { of } from 'rxjs';
import { StudyTrialItem } from '../../../../shared/models/trial.model';
import { TrialsListComponent } from '../trials-list/trials-list.component';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

const mockTrialItems: StudyTrialItem[] = [
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
];

@Component({
  selector: 'app-trials-list',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class MockTrialsListComponent extends TrialsListComponent {}

describe('FavoriteTrialsComponent', () => {
  let component: FavoriteTrialsComponent;
  let fixture: ComponentFixture<FavoriteTrialsComponent>;
  let trialsServiceSpy: jasmine.SpyObj<TrialsService>;

  beforeEach(async () => {
    trialsServiceSpy = jasmine.createSpyObj<TrialsService>([
      'getFavorites',
      'startStudyTrialPolling',
      'removeFromFavorites',
    ]);

    await TestBed.configureTestingModule({
      imports: [FavoriteTrialsComponent, MockTrialsListComponent],
      providers: [
        provideRouter([]),
        { provide: TrialsService, useValue: trialsServiceSpy },
      ],
    })
      .overrideComponent(FavoriteTrialsComponent, {
        remove: { imports: [TrialsListComponent] },
        add: { imports: [MockTrialsListComponent] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(FavoriteTrialsComponent);
    component = fixture.componentInstance;
  });

  it('should handle adding to favorites', () => {
    trialsServiceSpy.getFavorites.and.returnValue(of(mockTrialItems));

    fixture.detectChanges();

    const listComponent = fixture.debugElement.query(
      By.directive(MockTrialsListComponent)
    ).componentInstance;

    listComponent.removeFavorite.emit(mockTrialItems[0]);

    expect(trialsServiceSpy.removeFromFavorites).toHaveBeenCalledTimes(1);
  });
});
