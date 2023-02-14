import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { JwtRequest } from '../../models/jwt-request';
import { JwtResponse } from '../../models/jwt-response';
import { tap, shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    baseUrl = environment.Base_URL;
    currentUserSubject: any;
    currentUser: any;
    redirectUrl: string
    config: any;

    constructor(private http: HttpClient,
                private ngxUiLoaderService: NgxUiLoaderService,
                private router: Router) {
                    this.config = this.ngxUiLoaderService.getDefaultConfig();
                    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('currentUser')));
                    this.currentUser = this.currentUserSubject.asObservable();
    }

    login(username: string, password: string): Observable<JwtResponse> {
        let jwtRequest: JwtRequest = { eMailId: username, password: password };

        return this.http.post<JwtResponse>(this.baseUrl +'LoginAdmin/VerifyAdminLogin',
            jwtRequest).pipe(
                tap((resp: JwtResponse) => this.setSession(resp)),
                shareReplay()
            );
    }

    private setSession(authResult) {
        const expiresAt = authResult.expirationDate;
        // console.log("Token expires at " + expiresAt);
        // console.log("Token date and time is " + this.dateService.getShortDateAndTimeDisplay(expiresAt));

        // sessionStorage.setItem('id_token', authResult.token);
        // sessionStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
        sessionStorage.setItem('currentUser',JSON.stringify(authResult.data))
        this.currentUserSubject.next(JSON.parse(sessionStorage.getItem('currentUser')));
    }

    public get currentUserValue(): any {
        // return this.currentUserSubject.value;
        return JSON.parse(sessionStorage.getItem('currentUser'));
    }  

    isLoggedIn() {
        if (sessionStorage.getItem('currentUser')) {
          return true;
        }
          return false;
    }

    logout() {
        sessionStorage.removeItem('currentUser')
        this.router.navigate(['./login'])
    }

    SendOTP(MobileNo):Observable<any>{
        return this.http.post<any>(this.baseUrl+'OTP/SendOTP',{"mobileNumber": MobileNo},{observe: 'response'})
    }
  
    ResendOTP(MobileNo):Observable<any>{
        return this.http.post<any>(this.baseUrl+'OTP/ResendOTP',{"mobileNumber": MobileNo},{observe : 'response'})
    }
      
    VerifyOTP(obj):Observable<any>{
        return this.http.post<any>(this.baseUrl+'OTP/Verifylogin',{"mobileNumber": obj.mobile, "otp": obj.otp},{observe : 'response'})
    }
  
    updatePassword(obj):Observable<any>{
        return this.http.put<any>(this.baseUrl +'LoginAdmin/UpdatePassword',{"mobileNumber": obj.mobileNumber, "password": obj.password},{observe : 'response'})
    }
  
  
}
