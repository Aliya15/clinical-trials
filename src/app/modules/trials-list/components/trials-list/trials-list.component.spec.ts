import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrialsListComponent } from './trials-list.component';
import { StudyTrialItem } from '../../../../shared/models/trial.model';
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

describe('TrialsListComponent', () => {
  let component: TrialsListComponent;
  let fixture: ComponentFixture<TrialsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrialsListComponent],
      providers: [],
    }).compileComponents();

    fixture = TestBed.createComponent(TrialsListComponent);
    component = fixture.componentInstance;
  });

  it('should show empty placeholder when no data available', () => {
    spyOn(component, 'studyTrialList').and.returnValue(<StudyTrialItem[]>[]);

    fixture.detectChanges();

    const emptyPlaceholder = fixture.debugElement
      .query(By.css('p'))
      ?.nativeElement?.innerText?.trim();

    expect(emptyPlaceholder).toEqual('No data available');
  });

  it('should render trial cards list', () => {
    spyOn(component, 'studyTrialList').and.returnValue(mockTrialItems);

    fixture.detectChanges();

    const appCards = fixture.debugElement.queryAll(By.css('app-card'));

    expect(appCards.length).toEqual(mockTrialItems.length);
  });

  it('should render trial cards list with one favorite card', () => {
    spyOn(component, 'studyTrialList').and.returnValue(mockTrialItems);
    spyOn(component, 'favoritesMap').and.returnValue({
      [mockTrialItems[0].protocolSection.identificationModule.nctId]: true,
    });

    fixture.detectChanges();

    const icons = fixture.debugElement.queryAll(
      By.css('mat-icon.favorite-icon')
    );

    expect(icons.length).toEqual(1);
  });

  it('should emit remove favorite event when clicking on favorite trial', () => {
    spyOn(component, 'studyTrialList').and.returnValue(mockTrialItems);
    spyOn(component, 'favoritesMap').and.returnValue({
      [mockTrialItems[1].protocolSection.identificationModule.nctId]: true,
    });
    spyOn(component.removeFavorite, 'emit');

    fixture.detectChanges();

    const favoriteButton = fixture.debugElement.queryAll(By.css('button'));

    favoriteButton[1].nativeElement.click();

    expect(component.removeFavorite.emit).toHaveBeenCalledOnceWith(
      mockTrialItems[1]
    );
  });

  it('should emit remove favorite event when component is in favorites list mode', () => {
    spyOn(component, 'studyTrialList').and.returnValue(mockTrialItems);
    spyOn(component, 'favoritesMap').and.returnValue(null);
    spyOn(component, 'isFavoriteList').and.returnValue(true);
    spyOn(component.removeFavorite, 'emit');

    fixture.detectChanges();

    const favoriteButton = fixture.debugElement.queryAll(By.css('button'));

    favoriteButton[1].nativeElement.click();

    expect(component.removeFavorite.emit).toHaveBeenCalledOnceWith(
      mockTrialItems[1]
    );
  });

  it('should emit add to favorite event when clicking on trial', () => {
    spyOn(component, 'studyTrialList').and.returnValue(mockTrialItems);
    spyOn(component, 'favoritesMap').and.returnValue({
      [mockTrialItems[1].protocolSection.identificationModule.nctId]: true,
    });
    spyOn(component.addFavorite, 'emit');

    fixture.detectChanges();

    const favoriteButton = fixture.debugElement.queryAll(By.css('button'));

    favoriteButton[0].nativeElement.click();

    expect(component.addFavorite.emit).toHaveBeenCalledOnceWith(
      mockTrialItems[0]
    );
  });
});
