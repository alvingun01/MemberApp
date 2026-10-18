import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUp } from './popup';

describe('Popup', () => {
  let component: PopUp;
  let fixture: ComponentFixture<PopUp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopUp],
    }).compileComponents();

    fixture = TestBed.createComponent(PopUp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
