import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InchoneFlight } from './inchone-flight';

describe('InchoneFlight', () => {
  let component: InchoneFlight;
  let fixture: ComponentFixture<InchoneFlight>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InchoneFlight]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InchoneFlight);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
