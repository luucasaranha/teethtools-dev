import {Component} from '@angular/core';
import {hideAnimation, menuAnimation} from "../../animation/animations";
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {Subject} from "rxjs";
import {LoadingService} from "../../services/loading-service/loading.service";

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss'],
  animations: [hideAnimation, menuAnimation]
})
export class WrapperComponent {
  state = 'opened';
  isUserAuthenticated$ =  this.authService.isLoggedIn$

  loading: Subject<boolean> = this.loaderService.loading$

  constructor(
    public authService: AuthenticationService,
    public loaderService: LoadingService
  ) {}

  toggleState() {
    this.state = this.state === 'opened' ? 'closed' : 'opened';
  }
}
