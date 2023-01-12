import {Component} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {hideAnimation, menuAnimation} from "../../animation/animations";
import {AuthenticationService} from "../../services/authentication/authentication.service";

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss'],
  animations: [hideAnimation, menuAnimation]
})
export class WrapperComponent {
  // isExpanded: boolean = true;
  state = 'opened';

  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;

  constructor(public authService: AuthenticationService) {}

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }

  toggleState() {
    this.state = this.state === 'opened' ? 'closed' : 'opened';
  }
}
