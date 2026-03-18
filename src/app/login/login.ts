import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styles: ``,
})
export class Login {
  password = '';
  showPassword = signal(false);
  error = signal<string | null>(null);
  loading = signal(false);

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.error.set(null);

    if (!this.password.trim()) {
      this.error.set('Please enter the password.');
      return;
    }

    this.loading.set(true);
    const success = this.auth.login(this.password);
    this.loading.set(false);

    if (success) {
      this.router.navigate(['/']);
    } else {
      this.error.set('Incorrect password.');
    }
  }

  togglePassword(): void {
    this.showPassword.update(v => !v);
  }
}
