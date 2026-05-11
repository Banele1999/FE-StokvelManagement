import { Injectable, signal, computed } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { AuthResponse, Member } from "../models/types";

const TOKEN_KEY = "stokvel.token";
const MEMBER_KEY = "stokvel.member";

@Injectable({ providedIn: "root" })
export class AuthService {
  private _member = signal<Member | null>(this.readMember());
  private _token = signal<string | null>(localStorage.getItem(TOKEN_KEY));

  member = this._member.asReadonly();
  token = this._token.asReadonly();
  isAuthenticated = computed(() => !!this._token());

  constructor(private http: HttpClient) {}

  private readMember(): Member | null {
    const raw = localStorage.getItem(MEMBER_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as Member;
    } catch {
      return null;
    }
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>("/api/auth/login", { email, password })
      .pipe(tap((res) => this.setSession(res)));
  }

  signup(payload: {
    fullName: string;
    email: string;
    password: string;
    phone?: string;
    idNumber?: string;
    monthlyContribution?: number;
  }): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>("/api/auth/signup", payload)
      .pipe(tap((res) => this.setSession(res)));
  }

  setMember(member: Member): void {
    this._member.set(member);
    localStorage.setItem(MEMBER_KEY, JSON.stringify(member));
  }

  private setSession(res: AuthResponse): void {
    localStorage.setItem(TOKEN_KEY, res.token);
    localStorage.setItem(MEMBER_KEY, JSON.stringify(res.member));
    this._token.set(res.token);
    this._member.set(res.member);
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(MEMBER_KEY);
    this._token.set(null);
    this._member.set(null);
  }
}
