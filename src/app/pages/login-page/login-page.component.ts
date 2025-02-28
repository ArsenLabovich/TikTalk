import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login-page.component.html',
  standalone: true,
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);

  form = new FormGroup(
    {
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    }
  )

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
      //@ts-ignore
      this.authService.login(this.form.value).subscribe((token) => {
          this.router.navigate(['']);
      });
    }

  }
}
