import { Component, ElementRef, forwardRef, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { ITag } from '@core/models/tag';
import { BehaviorSubject, debounceTime, distinctUntilChanged, filter, Observable, startWith, switchMap } from 'rxjs';
import { MatFormField, MatHint, MatLabel } from '@angular/material/form-field';
import { MatChipGrid, MatChipInput, MatChipInputEvent, MatChipRemove, MatChipRow } from '@angular/material/chips';
import { MatIcon } from '@angular/material/icon';
import { MatAutocomplete, MatAutocompleteSelectedEvent, MatAutocompleteTrigger, MatOption } from '@angular/material/autocomplete';
import { AsyncPipe } from '@angular/common';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { TagApiService } from '@core/api/tag/tag-api.service';
import { FormErrorComponent } from '@app/utils/form/form-error/form-error.component';

@Component({
  selector: 'notes-tags-autocomplete-control',
  standalone: true,
  imports: [
    MatFormField,
    MatChipGrid,
    MatChipRow,
    MatChipRemove,
    MatIcon,
    MatAutocompleteTrigger,
    MatChipInput,
    MatAutocomplete,
    AsyncPipe,
    MatOption,
    ReactiveFormsModule,
    MatLabel,
    MatHint,
    FormErrorComponent,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TagsAutocompleteControlComponent),
      multi: true,
    },
  ],
  templateUrl: './tags-autocomplete-control.component.html',
  styleUrl: './tags-autocomplete-control.component.scss',
})
export class TagsAutocompleteControlComponent implements OnInit, ControlValueAccessor {
  @ViewChild('input') private readonly input!: ElementRef<HTMLInputElement>;

  public matchedTags$!: Observable<ITag[]>;
  public readonly separatorKeysCodes: Readonly<[number, number]> = [ENTER, COMMA] as const;
  public readonly isDisabled$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public readonly value$: BehaviorSubject<ITag[]> = new BehaviorSubject<ITag[]>([]);
  public readonly tagsCntrl: FormControl<string | null> = new FormControl<string | null>('');

  constructor(private readonly tagApiService: TagApiService) {}

  ngOnInit(): void {
    this.matchedTags$ = this.tagsCntrl.valueChanges.pipe(
      startWith(null),
      distinctUntilChanged(),
      debounceTime(100),
      filter(Boolean),
      filter((str: string) => str.length > 3),
      switchMap((str: string) => this.fetchTagsByStr$(str)),
    );
  }

  registerOnChange(fn: (_: any) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled$.next(Boolean(isDisabled));
  }

  writeValue(value: ITag[]): void {
    this.value$.next(value);
  }

  updateValue(value: ITag[]): void {
    this.value$.next(value);
    this._onChange(value);
    this._onTouched();
  }

  _onChange: any = () => {};
  _onTouched: any = () => {};

  /**
   * Создаем новый тег, если его не было найдено
   * Пушим в value$
   */
  add(event: MatChipInputEvent) {
    const value = event.value;

    if (value) {
      const tag: ITag = {
        tagName: value,
        id: Math.floor(Math.random() * 10),
      };
      this.updateValue([...this.value$.value, tag]);
    }
    event.chipInput!.clear();
  }

  /**
   * Пушим выбранный тег из запрошенных тегов
   * @param event
   */
  selected(event: MatAutocompleteSelectedEvent) {
    const selectedTag: ITag = event.option.value;
    this.updateValue([...this.value$.value, selectedTag]);
    this.input.nativeElement.value = '';
    this.tagsCntrl.setValue(null);
  }

  /**
   * Удалить тег выбранных тегов
   * @param removedTag
   */
  remove(removedTag: ITag): void {
    const updatedTags = this.value$.value.filter((tag) => tag.id !== removedTag.id);
    this.updateValue(updatedTags);
  }

  /**
   * Запрос новых тегов
   * @param str
   */
  fetchTagsByStr$(str: string): Observable<ITag[]> {
    return this.tagApiService.searchTagsByName(str);
  }

  protected readonly Boolean = Boolean;
}
