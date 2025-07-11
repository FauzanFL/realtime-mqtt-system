import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotionDetected } from './motion-detected';

describe('MotionDetected', () => {
  let component: MotionDetected;
  let fixture: ComponentFixture<MotionDetected>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MotionDetected]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MotionDetected);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
