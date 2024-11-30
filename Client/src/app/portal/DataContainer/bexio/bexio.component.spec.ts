import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BexioComponent } from './bexio.component';

describe('BexioComponent', () => {
  let component: BexioComponent;
  let fixture: ComponentFixture<BexioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BexioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BexioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
