import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteContentComponent } from './note-content.component';

describe('NoteContentComponent', () => {
  let component: NoteContentComponent;
  let fixture: ComponentFixture<NoteContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoteContentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NoteContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
