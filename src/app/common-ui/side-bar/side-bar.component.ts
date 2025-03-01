import {Component, inject} from '@angular/core';
import {SubscriberCardComponent} from "./subscriber-card/subscriber-card.component";
import {RouterLink} from "@angular/router";
import {ProfileService} from "../../data/services/profile.service";
import {Profile} from "../../data/interfaces/profile.interface";
import {AsyncPipe, JsonPipe, NgForOf} from "@angular/common";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-side-bar',
  imports: [
    RouterLink,
    JsonPipe,
    SubscriberCardComponent,
    NgForOf,
    AsyncPipe
  ],
  templateUrl: './side-bar.component.html',
  standalone: true,
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {

  profileService = inject(ProfileService)

  subscribers$ = this.profileService.getSubscribersShortList()
  me = this.profileService.getMe();

  constructor() {

  }

  ngOnInit() {
    firstValueFrom(this.profileService.getMe());
  }

}
