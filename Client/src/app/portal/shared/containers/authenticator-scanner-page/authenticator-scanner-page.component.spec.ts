import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticatorScannerPageComponent } from './authenticator-scanner-page.component';

describe('AuthenticatorScannerPageComponent', () => {
  let component: AuthenticatorScannerPageComponent;
  let fixture: ComponentFixture<AuthenticatorScannerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthenticatorScannerPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthenticatorScannerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
