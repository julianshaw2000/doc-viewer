import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly storageKey = 'doc_viewer_auth';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<boolean> {
    return this.http.get<User[]>('assets/users.json').pipe(
      map(users => {
        const match = users.find(
          u => u.username === username && u.password === password
        );
        if (match) {
          sessionStorage.setItem(this.storageKey, JSON.stringify({ username }));
          return true;
        }
        return false;
      })
    );
  }

  isLoggedIn(): boolean {
    return sessionStorage.getItem(this.storageKey) !== null;
  }

  getUsername(): string | null {
    const data = sessionStorage.getItem(this.storageKey);
    return data ? JSON.parse(data).username : null;
  }

  logout(): void {
    sessionStorage.removeItem(this.storageKey);
  }
}
