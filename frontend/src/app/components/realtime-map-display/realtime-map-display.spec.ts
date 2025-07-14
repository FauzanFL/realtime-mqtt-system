import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealtimeMapDisplay } from './realtime-map-display';

describe('RealtimeMapDisplay', () => {
  let component: RealtimeMapDisplay;
  let fixture: ComponentFixture<RealtimeMapDisplay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RealtimeMapDisplay]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RealtimeMapDisplay);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
