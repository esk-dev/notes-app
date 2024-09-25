import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { MatCard, MatCardActions, MatCardContent, MatCardFooter, MatCardHeader } from '@angular/material/card';
import { ContainerComponent } from '@ui/container/container.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormFor } from '@app/utils/form/form';
import { AuthService } from '@app/auth/services/auth.service';
import { finalize, Subject, take } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatDivider } from '@angular/material/divider';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatProgressBar } from '@angular/material/progress-bar';
import { AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';

interface TLogin {
  username: string;
  password: string;
}
@Component({
  standalone: true,
  imports: [
    MatCard,
    ContainerComponent,
    MatCardHeader,
    ReactiveFormsModule,
    MatLabel,
    MatFormField,
    MatCardContent,
    MatDivider,
    MatInput,
    MatCardActions,
    MatButton,
    MatCardFooter,
    MatProgressBar,
    MatLabel,
    AsyncPipe,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  public form: FormGroup<FormFor<TLogin>> = new FormGroup<FormFor<TLogin>>({
    username: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    password: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
  });

  public readonly loading$: Subject<boolean> = new Subject();
  private readonly destroyRef = inject(DestroyRef);

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  onSubmit(): void {
    this.loading$.next(true);
    if (this.form.invalid) {
      this.form.markAsDirty();
      this.form.markAllAsTouched();
      this.loading$.next(false);
      return;
    }

    this.form.disable();

    const { password, username } = this.form.getRawValue();

    this.authService
      .login(username, password)
      .pipe(
        take(1),
        finalize(() => this.loading$.next(false)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: () => {
          this.router.navigate(['/notes']);
        },
        error: (error) => {
          console.log(error);
          this.form.enable();
        },
      });
  }
}
