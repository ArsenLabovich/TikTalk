import {HttpHandlerFn, HttpInterceptorFn, HttpRequest} from "@angular/common/http";
import {inject} from "@angular/core";
import {AuthService} from "./auth.service";
import {catchError, switchMap, tap, throwError} from "rxjs";

let isRefresh = false;

export const authTokenInerceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService)
  const token = authService.token;
  if (!token) {
    return next(req);
  }
  if(isRefresh){
    return refreshAndProceed(req,next,authService);
  }
  return next(addTokenToRequest(req, token)).pipe(
    catchError(err => {
      if (err.status === 403) {
        return refreshAndProceed(req, next, authService);
      }
      return throwError(err);
    })
  );

}

const refreshAndProceed =
  (req: HttpRequest<any>,
   next: HttpHandlerFn,
   authService: AuthService) => {

    if (!isRefresh){
      isRefresh = true;
      return authService.refreshAuthToken()
        .pipe(
          switchMap(token => {
            isRefresh = false ;
            return next(addTokenToRequest(req, token.access_token))
          })
        )
    }
    return next(addTokenToRequest(req, authService.token!));

  }

const addTokenToRequest = (req: HttpRequest<any>, token: string) => {
  return req.clone(
    {
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    }
  )
}


