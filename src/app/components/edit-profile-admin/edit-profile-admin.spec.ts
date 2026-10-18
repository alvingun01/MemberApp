import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfileAdmin } from './edit-profile-admin';

describe('EditProfileAdmin', () => {
  let component: EditProfileAdmin;
  let fixture: ComponentFixture<EditProfileAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditProfileAdmin],
    }).compileComponents();

    fixture = TestBed.createComponent(EditProfileAdmin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
