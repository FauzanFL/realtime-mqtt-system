import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HumidityChart } from './humidity-chart';

describe('HumidityChart', () => {
  let component: HumidityChart;
  let fixture: ComponentFixture<HumidityChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HumidityChart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HumidityChart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
