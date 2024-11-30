import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DarkModeSliderComponent } from './dark-mode-slider.component';

describe('DarkModeSliderComponent', () => {
  let component: DarkModeSliderComponent;
  let fixture: ComponentFixture<DarkModeSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DarkModeSliderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DarkModeSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
