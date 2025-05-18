import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTrialListComponent } from './all-trial-list.component';
import { TrialsService } from '../../services/trials.service';
import { of } from 'rxjs';
import { provideRouter } from '@angular/router';
import { StudyTrialItem } from '../../../../shared/models/trial.model';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TrialsListComponent } from '../trials-list/trials-list.component';
import { By } from '@angular/platform-browser';

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

describe('TrialsListComponent', () => {
  let component: AllTrialListComponent;
  let fixture: ComponentFixture<AllTrialListComponent>;

  let trialsServiceSpy: jasmine.SpyObj<TrialsService>;

  beforeEach(async () => {
    trialsServiceSpy = jasmine.createSpyObj<TrialsService>([
      'getFavoritesMap',
      'startStudyTrialPolling',
      'removeFromFavorites',
      'addToFavorites',
    ]);

    trialsServiceSpy.startStudyTrialPolling.and.returnValue(of(mockTrialItems));
    trialsServiceSpy.getFavoritesMap.and.returnValue(
      of({
        [mockTrialItems[0].protocolSection.identificationModule.nctId]: true,
        [mockTrialItems[1].protocolSection.identificationModule.nctId]: true,
      })
    );

    await TestBed.configureTestingModule({
      imports: [AllTrialListComponent, MockTrialsListComponent],
      providers: [
        provideRouter([]),
        {
          provide: TrialsService,
          useValue: trialsServiceSpy,
        },
      ],
    })
      .overrideComponent(AllTrialListComponent, {
        remove: { imports: [TrialsListComponent] },
        add: { imports: [MockTrialsListComponent] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(AllTrialListComponent);
    component = fixture.componentInstance;
  });

  it('should handle removing from favorites', () => {
    fixture.detectChanges();

    const listComponent = fixture.debugElement.query(
      By.directive(MockTrialsListComponent)
    ).componentInstance;

    listComponent.removeFavorite.emit(mockTrialItems[0]);

    expect(trialsServiceSpy.removeFromFavorites).toHaveBeenCalledTimes(1);
  });

  it('should handle adding to favorites', () => {
    fixture.detectChanges();

    const listComponent = fixture.debugElement.query(
      By.directive(MockTrialsListComponent)
    ).componentInstance;

    listComponent.addFavorite.emit(mockTrialItems[0]);

    expect(trialsServiceSpy.addToFavorites).toHaveBeenCalledTimes(1);
  });
});
