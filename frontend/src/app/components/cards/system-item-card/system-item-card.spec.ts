import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemItemCard } from './system-item-card';

describe('SystemItemCard', () => {
  let component: SystemItemCard;
  let fixture: ComponentFixture<SystemItemCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemItemCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemItemCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
