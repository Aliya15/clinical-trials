import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTrialListComponent } from './all-trial-list.component';

describe('TrialsListComponent', () => {
  let component: AllTrialListComponent;
  let fixture: ComponentFixture<AllTrialListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllTrialListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AllTrialListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
