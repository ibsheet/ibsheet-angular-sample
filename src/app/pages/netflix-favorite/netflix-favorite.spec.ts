import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetflixFavorite } from './netflix-favorite';

describe('NetflixFavorite', () => {
  let component: NetflixFavorite;
  let fixture: ComponentFixture<NetflixFavorite>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NetflixFavorite]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NetflixFavorite);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
