import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrialsPageComponent } from './trials-page.component';

describe('TrialsPageComponent', () => {
  let component: TrialsPageComponent;
  let fixture: ComponentFixture<TrialsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrialsPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TrialsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
