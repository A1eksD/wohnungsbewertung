import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsUserLoggedIn } from './is-user-logged-in';

describe('IsUserLoggedIn', () => {
  let component: IsUserLoggedIn;
  let fixture: ComponentFixture<IsUserLoggedIn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IsUserLoggedIn]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IsUserLoggedIn);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
