import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'notes-icon',
  standalone: true,
  imports: [MatIcon],
  template: `<mat-icon>
    <ng-content />
  </mat-icon>`,
  styleUrl: './icon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {}
