import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationSetPasswordComponent } from './authentication-set-password.component';

describe('AuthenticationSetPasswordComponent', () => {
  let component: AuthenticationSetPasswordComponent;
  let fixture: ComponentFixture<AuthenticationSetPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthenticationSetPasswordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthenticationSetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
