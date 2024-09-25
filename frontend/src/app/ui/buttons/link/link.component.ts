import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { INavigationLink } from '@core/navigation/navigation.interface';

@Component({
  selector: 'notes-link',
  standalone: true,
  imports: [RouterLink, MatButtonModule, RouterLinkActive],
  templateUrl: './link.component.html',
  styleUrl: './link.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkComponent {
  public readonly navLink: InputSignal<INavigationLink> = input.required<INavigationLink>();
}
