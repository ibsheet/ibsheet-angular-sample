import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusTraffic } from './bus-traffic';

describe('BusTraffic', () => {
  let component: BusTraffic;
  let fixture: ComponentFixture<BusTraffic>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusTraffic]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusTraffic);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
