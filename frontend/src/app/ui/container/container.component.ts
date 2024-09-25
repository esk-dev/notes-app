import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'notes-container',
  standalone: true,
  imports: [],
  template: `<ng-content /> `,
  styleUrl: './container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContainerComponent {}
