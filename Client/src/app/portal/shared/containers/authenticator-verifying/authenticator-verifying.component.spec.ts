import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticatorVerifyingComponent } from './authenticator-verifying.component';

describe('AuthenticatorVerifyingComponent', () => {
  let component: AuthenticatorVerifyingComponent;
  let fixture: ComponentFixture<AuthenticatorVerifyingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthenticatorVerifyingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthenticatorVerifyingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
