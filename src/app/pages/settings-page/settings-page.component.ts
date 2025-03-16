import {Component, effect, inject, ViewChild} from '@angular/core';
import {ProfileHeaderComponent} from "../../common-ui/profile-header/profile-header.component";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ProfileService} from "../../data/services/profile.service";
import {firstValueFrom} from "rxjs";
import {AvatarUploadComponent} from "./avatar-upload/avatar-upload.component";

@Component({
  selector: 'app-settings-page',
  imports: [
    ProfileHeaderComponent,
    ReactiveFormsModule,
    AvatarUploadComponent
  ],
  standalone: true,
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss'
})
export class SettingsPageComponent {
  fb = inject(FormBuilder)
  profileService = inject(ProfileService)

  @ViewChild(AvatarUploadComponent) avatarUploader!: AvatarUploadComponent;

  form = this.fb.group({
    firstName: ['',],
    lastName: ['',],
    username: [{value: '', disabled: true}],
    description: [''],
    stack: [''],
  });


  constructor() {
    effect(() => {
      // @ts-ignore
      this.form.patchValue({
        ...this.profileService.me(),
        stack: this.mergeStack(this.profileService.me()?.stack)
      });
    });
  }

  onSave() {
    this.form.markAsTouched();
    this.form.updateValueAndValidity();
    if (this.form.invalid) {
      console.log("invalid");
      return;
    }
    if (this.avatarUploader.avatar) {
      firstValueFrom(this.profileService.uploadAvatar(this.avatarUploader.avatar));
    }

    //@ts-ignore
    firstValueFrom(this.profileService.patchProfile({
      ...this.profileService.me(),
      ...this.form.getRawValue(),
      stack: this.splitStack(this.form.value.stack)
    }));
  }

  splitStack(stack: string | null | [] | undefined): string[] {
    if (!stack) return [];
    if (Array.isArray(stack)) {
      return stack;
    }
    return stack.split(',');
  }

  mergeStack(stack: string | null | string[] | undefined): string {
    if (!stack) return '';
    if (Array.isArray(stack)) {
      return stack.join(',');
    }
    return stack
  }
}
