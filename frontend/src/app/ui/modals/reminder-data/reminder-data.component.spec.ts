import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReminderDataComponent } from './reminder-data.component';

describe('ReminderDataComponent', () => {
  let component: ReminderDataComponent;
  let fixture: ComponentFixture<ReminderDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReminderDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReminderDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
