import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrialsListComponent } from './trials-list.component';

describe('TrialsListComponent', () => {
  let component: TrialsListComponent;
  let fixture: ComponentFixture<TrialsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrialsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrialsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
