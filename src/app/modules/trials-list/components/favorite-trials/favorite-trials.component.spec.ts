import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteTrialsComponent } from './favorite-trials.component';

describe('FavoriteTrialsComponent', () => {
  let component: FavoriteTrialsComponent;
  let fixture: ComponentFixture<FavoriteTrialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoriteTrialsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoriteTrialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
