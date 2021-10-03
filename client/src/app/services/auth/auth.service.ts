import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  TOKEN_KEY = 'auth-token';
  USER_KEY = 'auth-user';
  constructor(private router: Router,
    private route: ActivatedRoute
) { }

  public saveToken(token: string) {
    sessionStorage.removeItem(this.TOKEN_KEY);
    sessionStorage.setItem(this.TOKEN_KEY, token);
    console.log("storage in login",this.getToken());
  }

  public saveUser(user:any){
    sessionStorage.removeItem(this.USER_KEY);
   sessionStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  public getUser() {
    return JSON.parse(sessionStorage.getItem(this.USER_KEY));
  }

  public getToken(): string {
    return sessionStorage.getItem(this.TOKEN_KEY);
  }

  isLoggedIn(){
  return sessionStorage.getItem(this.USER_KEY)?true:false;
  }

  logout() {

    // console.log("removed username", sessionStorage.removeItem('auth-token'));
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }


}
