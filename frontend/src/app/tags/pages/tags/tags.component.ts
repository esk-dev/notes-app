import { ChangeDetectionStrategy, Component, inject, OnInit, Signal } from '@angular/core';
import { ContainerComponent } from '@ui/container/container.component';
import { MatFormField, MatHint, MatLabel } from '@angular/material/form-field';
import { MatChipEditedEvent, MatChipGrid, MatChipInput, MatChipInputEvent, MatChipRemove, MatChipRow } from '@angular/material/chips';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ITag } from '@core/models/tag';
import { TagsStore } from '@app/tags/pages/tags.store';

@Component({
  standalone: true,
  imports: [ContainerComponent, MatLabel, MatChipGrid, MatFormField, MatChipInput, MatIcon, MatChipRemove, MatChipRow, MatHint, MatInput],
  providers: [TagsStore],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagsComponent implements OnInit {
  private readonly tagsStore = inject(TagsStore);

  public readonly addOnBlur = false;
  public readonly separatorKeysCodes = [ENTER, COMMA] as const;

  get tagsEntities(): Signal<ITag[]> {
    return this.tagsStore.entities;
  }

  ngOnInit(): void {
    this.tagsStore.loadAll();
  }

  remove(tag: ITag): void {
    this.tagsStore.deleteTag(tag);
  }

  edit(tag: ITag, event: MatChipEditedEvent): void {
    const newTag: ITag = {
      ...tag,
      tagName: event.value.trim(),
    };

    this.tagsStore.editTag(newTag);
  }

  add(event: MatChipInputEvent): void {
    const value = event.value.trim();
    if (value) {
      this.tagsStore.createTag(event.value);
    }
    event.chipInput!.clear();
  }
}
