import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormFor } from '@app/utils/form/form';
import { AuthService } from '@app/auth/services/auth.service';
import { finalize, Subject, take } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ContainerComponent } from '@ui/container/container.component';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatCard, MatCardActions, MatCardContent, MatCardFooter, MatCardHeader } from '@angular/material/card';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatDivider } from '@angular/material/divider';
import { MatButton } from '@angular/material/button';
import { AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';
import { AUTH_FORM_VALIDATORS, digitValidator, noCyrillicValidator, nonAlphanumericValidator } from '@app/auth/auth.validator';
import { FormErrorComponent } from '@app/utils/form/form-error/form-error.component';
import { NotificationService } from '@ui/notifiaction/service/notification.service';

interface TRegister {
  username: string;
  email: string;
  password: string;
}

@Component({
  standalone: true,
  imports: [
    ContainerComponent,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatCard,
    MatCardHeader,
    MatProgressBar,
    MatCardContent,
    MatDivider,
    MatCardActions,
    MatCardFooter,
    MatButton,
    MatLabel,
    AsyncPipe,
    FormErrorComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  public form: FormGroup<FormFor<TRegister>> = new FormGroup<FormFor<TRegister>>({
    username: new FormControl('', { nonNullable: true, validators: [Validators.required, noCyrillicValidator()] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(6), nonAlphanumericValidator(), digitValidator()],
    }),
  });

  public readonly loading$: Subject<boolean> = new Subject();
  private readonly destroyRef = inject(DestroyRef);

  constructor(
    private readonly router: Router,
    private readonly cdRef: ChangeDetectorRef,
    private readonly authService: AuthService,
    private readonly notifyService: NotificationService,
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

    const { email, password, username }: Record<string, string> = this.form.value;

    this.authService
      .register(username, email, password)
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
          this.notifyService.error('Ошибка при регистрации');
          console.error(error);
          this.form.enable();
        },
      });
  }

  protected readonly AUTH_FORM_VALIDATORS = AUTH_FORM_VALIDATORS;
}
