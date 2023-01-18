import {Injectable} from '@angular/core';
import {LoadingService} from "../loading-service/loading.service";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {finalize, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoadingInterceptorService {

  activeRequests: number = 0;

  constructor(
    private loadingScreenService: LoadingService
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.activeRequests === 0) {
      this.loadingScreenService.startLoading();
    }

    this.activeRequests++;

    return next.handle(request).pipe(
      finalize(() => {
        this.activeRequests--;
        if (this.activeRequests === 0) {
          this.loadingScreenService.stopLoading();
        }
      })
    )
  }
}
