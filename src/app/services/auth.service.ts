import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly storageKey = 'doc_viewer_auth';
  private readonly validPassword = 'desta';

  login(password: string): boolean {
    if (password.toLowerCase() === this.validPassword) {
      sessionStorage.setItem(this.storageKey, 'true');
      return true;
    }
    return false;
  }

  isLoggedIn(): boolean {
    return sessionStorage.getItem(this.storageKey) !== null;
  }

  logout(): void {
    sessionStorage.removeItem(this.storageKey);
  }
}
