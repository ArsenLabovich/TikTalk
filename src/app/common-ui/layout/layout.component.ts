import {Component, inject} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {SideBarComponent} from "../side-bar/side-bar.component";
import {ProfileService} from "../../data/services/profile.service";

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    SideBarComponent
  ],
  templateUrl: './layout.component.html',
  standalone: true,
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  profileService: ProfileService = inject(ProfileService);

  ngOnInit() {
    this.profileService.getMe().subscribe((data) => {
    });
  }
}
