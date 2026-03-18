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
  username = '';
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

    if (!this.username.trim() || !this.password.trim()) {
      this.error.set('Please enter both username and password.');
      return;
    }

    this.loading.set(true);
    this.auth.login(this.username, this.password).subscribe({
      next: (success) => {
        this.loading.set(false);
        if (success) {
          this.router.navigate(['/']);
        } else {
          this.error.set('Invalid username or password.');
        }
      },
      error: () => {
        this.loading.set(false);
        this.error.set('An error occurred. Please try again.');
      }
    });
  }

  togglePassword(): void {
    this.showPassword.update(v => !v);
  }
}
