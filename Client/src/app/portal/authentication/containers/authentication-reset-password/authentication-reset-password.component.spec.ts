import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationResetPasswordComponent } from './authentication-reset-password.component';

describe('AuthenticationResetPasswordComponent', () => {
  let component: AuthenticationResetPasswordComponent;
  let fixture: ComponentFixture<AuthenticationResetPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthenticationResetPasswordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthenticationResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
