import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CivilDefenseShelter } from './civil-defense-shelter';

describe('CivilDefenseShelter', () => {
  let component: CivilDefenseShelter;
  let fixture: ComponentFixture<CivilDefenseShelter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CivilDefenseShelter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CivilDefenseShelter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
