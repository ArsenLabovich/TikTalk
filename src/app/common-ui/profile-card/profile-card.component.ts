import {Component, Input} from '@angular/core';
import {Profile} from "../../data/interfaces/profile.interface";
import {ImgUrlPipe} from "../../helpers/pipes/img-url.pipe";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-profile-card',
  imports: [
    ImgUrlPipe,
    NgIf,
    NgForOf
  ],
  templateUrl: './profile-card.component.html',
  standalone: true,
  styleUrl: './profile-card.component.scss'
})
export class ProfileCardComponent {
  @Input() profile!: Profile;
}
