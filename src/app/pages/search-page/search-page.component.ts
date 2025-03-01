import {Component, inject} from '@angular/core';
import {ProfileCardComponent} from "../../common-ui/profile-card/profile-card.component";
import {ProfileService} from "../../data/services/profile.service";
import {Profile} from "../../data/interfaces/profile.interface";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-search-page',
  imports: [
    ProfileCardComponent,
    NgForOf
  ],
  templateUrl: './search-page.component.html',
  standalone: true,
  styleUrl: './search-page.component.scss'
})
export class SearchPageComponent {
  profileService: ProfileService = inject(ProfileService);
  profiles: Profile[] = [];

  constructor() {
    this.profileService.getTestAccounts().subscribe((data) => {
      this.profiles = data;
    });
  }
}
