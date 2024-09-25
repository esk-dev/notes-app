import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsAutocompleteControlComponent } from './tags-autocomplete-control.component';

describe('TagsAutocompleteControlComponent', () => {
  let component: TagsAutocompleteControlComponent;
  let fixture: ComponentFixture<TagsAutocompleteControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TagsAutocompleteControlComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TagsAutocompleteControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
