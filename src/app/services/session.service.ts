import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SessionService {
  constructor() {}

  private readonly key = 'STK';

  public obtenerToken(): string | null {
    const token = sessionStorage.getItem(this.key);
    return token;
  }

  public guardarToken(token: string): void {
    sessionStorage.setItem(this.key, token);
  }

  public borrarToken(): void {
    sessionStorage.removeItem(this.key);
  }
}
