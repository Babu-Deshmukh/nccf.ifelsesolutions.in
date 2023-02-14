import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfirmedValidator } from './confirm.validator';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { fadeInAnimation } from 'src/app/common/animations/fadein.animation';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [fadeInAnimation]
})
export class LoginComponent implements OnInit,OnDestroy {
  isAlive: boolean = true;
  loginForm: FormGroup;
  loginStatus: any;
  ipAddress: any;
  loginError: string;
  submitted: boolean;
  currentUser: any;
  forgetPassWordForm: FormGroup
  forgetPasswordform: boolean = false;
  loginFormdisplay: boolean = true
  submittedTopForm: boolean;
  dialcode: any = '91';
  MobileNo: any;
  optSentSuccessfully: boolean;
  btnName: string = 'Send OTP';
  showResendTOP: boolean;
  hidesendOTP: boolean = true;
  showsubmitButton: boolean;
  submittedOTP: boolean;
  passWordform: boolean;
  passWordForm: FormGroup
  submittedPassWordForm: boolean;
  formSubmitted: boolean;
  form: any;
  disabled: boolean;

  constructor(private fb: FormBuilder,
    private tostr: ToastrService,
    private router: Router,
    private authenticationService: AuthenticationService,
    private ngxservice: NgxUiLoaderService) {

    this.loginForm = fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })

    this.forgetPassWordForm = fb.group({
      mobileNumber: ['', Validators.required],
      otp: ['']
    })

    this.passWordForm = fb.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {
      validator: ConfirmedValidator('password', 'confirmPassword')
    })
  }


  ngOnInit() {
    sessionStorage.removeItem('currentUser')
    sessionStorage.clear()
    this.form = this.fb.group({
      'username': ['', Validators.compose([Validators.required])],
      'password': ['', Validators.compose([Validators.required])]
    });
  }

  get f() {
    return this.loginForm.controls
  }

  get f2() {
    return this.forgetPassWordForm.controls
  }

  get f3() {
    return this.passWordForm.controls
  }

  login() {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.ngxservice.start()
      let username = this.loginForm.controls['username'].value;
      let password = this.loginForm.controls['password'].value;

      let user$ = this.authenticationService.login(username, password);

      user$.subscribe(
        (data: any) => {
          if (this.authenticationService.isLoggedIn) {
            this.tostr.success('Login Successfull !!')
            setTimeout(() => {
              var user = JSON.parse(sessionStorage.getItem('currentUser'))
              var tabs = user.tabName
              var redirect = this.authenticationService.redirectUrl ? this.authenticationService.redirectUrl : `/${tabs[0]}`;
              var url = redirect.toLowerCase() 
              this.router.navigate([url]);
            }, 300);
          } else {
            this.ngxservice.stop()
            this.loginError = 'Username or password is incorrect.';
            this.submitted = false
          }
        },
        err => {
          this.ngxservice.stop()
            this.tostr.error(err)
            this.submitted = false
        }
      );
    } else {
      console.log("The form is NOT valid");
      this.ngxservice.stop()
      this.tostr.warning('Opps !! Something is missing')
      this.submitted = false;
    }
  }

  forgetPassword() {
    this.loginFormdisplay = false
    this.forgetPasswordform = true
    this.showResendTOP = false
    this.forgetPassWordForm.reset()
  }

  sendOTP() {
    this.submittedTopForm = true
    this.MobileNo = this.dialcode + this.forgetPassWordForm.get('mobileNumber').value;
    this.authenticationService.SendOTP(this.MobileNo).
      subscribe((response: any) => {
        const res = response;
        if (response.status === 200) {
          const tempMessage = response.body.message;
          const tempData = response.body.data;
          this.optSentSuccessfully = true
          this.showsubmitButton = true
          this.tostr.success('OTP Sent Successfully !!')
          this.btnName = 'Submit'
          setTimeout(() => {
            this.showResendTOP = true
            this.hidesendOTP = false
          }, 15000);
        } else {
        }
      },
        err => {
          console.log(err)
        })
  }

  resendOTP() {
    if (this.forgetPassWordForm.get('mobileNumber').value == undefined
      || this.forgetPassWordForm.get('mobileNumber').value == ''
      || this.forgetPassWordForm.get('mobileNumber').value == null) {
      this.submittedTopForm = true
    } else {
      this.MobileNo = this.dialcode + this.forgetPassWordForm.get('mobileNumber').value;
      this.authenticationService.ResendOTP(this.MobileNo).
        subscribe((response: any) => {
          const res = response;
          if (response.status === 200) {
            const tempMessage = response.body.message;
            const tempData = response.body.data;
            this.optSentSuccessfully = true
            this.btnName = 'Submit'
            this.tostr.success('OTP sent successfully !!')
          } else {
          }
        })
    }
  }

  verifyOTP() {
    // if (this.forgetPassWordForm.get('otp').value == undefined
    //   || this.forgetPassWordForm.get('otp').value == ''
    //   || this.forgetPassWordForm.get('otp').value == null) {
    //   this.submittedOTP = true
    // } else {
    //   var encrypted = this._encryptService.set('Yq3t6w9z$C&F)J@NcRfUjXn2r4u7x!A%', this.forgetPassWordForm.get('otp').value);
    //   this.MobileNo = this.dialcode + this.forgetPassWordForm.get('mobileNumber').value;
    //   var obj = {
    //     "mobile": this.MobileNo,
    //     "otp": encrypted
    //   }
    //   this.authenticationService.VerifyOTP(obj).pipe(takeWhile(() => this.isAlive)).subscribe(
    //     res => {
    //       this.passWordform = true
    //       this.forgetPasswordform = false
    //       this.submittedTopForm = false
    //     }, err => {
    //       console.log(err)
    //       this.tostr.warning('Invalid OTP !!')
    //     }
    //   )
    // }

  }

  submitPassWord() {
    this.submittedPassWordForm = true
    if (this.passWordForm.get('password').value == this.passWordForm.get('confirmPassword').value) {
      if (this.passWordForm.valid) {
        this.MobileNo = this.forgetPassWordForm.get('mobileNumber').value;
        var obj = {
          mobileNumber: this.MobileNo,
          password: this.passWordForm.get('password').value
        }
        this.authenticationService.updatePassword(obj).pipe(takeWhile(() => this.isAlive)).subscribe(
          res => {
            this.passWordForm.reset()
            this.submittedPassWordForm = false
            setTimeout(() => {
              this.tostr.success('Password Changed Successfully!!')
              setTimeout(() => {
                this.passWordform = false;
                this.loginFormdisplay = true;
                this.forgetPasswordform = false
              }, 2000);
            }, 1000);

          },
          err => {
            this.tostr.warning('Sorry !! Unable to update password')
          }
        )
      }
    } else {
    }
  }

  backTOLogin() {
    this.passWordform = false;
    this.loginFormdisplay = true;
    this.forgetPasswordform = false
    this.forgetPassWordForm.reset()
    this.optSentSuccessfully = false
    this.submittedTopForm = false
  }

  ngOnDestroy(): void {
    this.isAlive = false
  }
}
