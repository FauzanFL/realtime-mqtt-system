import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LightIntensity } from './light-intensity';

describe('LightIntensity', () => {
  let component: LightIntensity;
  let fixture: ComponentFixture<LightIntensity>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LightIntensity]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LightIntensity);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
