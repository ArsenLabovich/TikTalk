import {Component, inject} from '@angular/core';
import {ProfileHeaderComponent} from "../../common-ui/profile-header/profile-header.component";
import {ProfileService} from "../../data/services/profile.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {switchMap} from "rxjs";
import {toObservable} from "@angular/core/rxjs-interop";
import {AsyncPipe} from "@angular/common";
import {SubscriberCardComponent} from "../../common-ui/side-bar/subscriber-card/subscriber-card.component";
import {ImgUrlPipe} from "../../helpers/pipes/img-url.pipe";
import {PostFeedComponent} from "./post-feed/post-feed.component";

@Component({
  selector: 'app-profile-page',
  imports: [
    ProfileHeaderComponent,
    AsyncPipe,
    RouterLink,
    ImgUrlPipe,
    PostFeedComponent
  ],
  templateUrl: './profile-page.component.html',
  standalone: true,
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent {

    profileService = inject(ProfileService);

    activatedRoute = inject(ActivatedRoute);

    me$ = toObservable(this.profileService.me);

    subscribers$ = this.profileService.getSubscribersShortList(5);

    profile$ = this.activatedRoute.params.pipe(
      switchMap(({id})=>{
          if(id==='me'){
            return this.me$;
          }else{
            return this.profileService.getAccount(id);
          }
      }
      )
    )
}
