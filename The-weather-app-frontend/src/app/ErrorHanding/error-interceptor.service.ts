import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorService } from './error-service.service';


@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private errorService: ErrorService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An error occurred';
        console.log("INSIDE EXCEPTION HANDLER")
        if (error.error instanceof ErrorEvent) {
          // Client-side error
          errorMessage = `Client-side error: ${error.error.message}`;
        } else {
          // Server-side error
          errorMessage = `Server-side error: ${error.status} - ${error.statusText}`;
          // Handle different status codes here and display appropriate error messages or take actions
          switch (error.status) {
            case 400:
              errorMessage = 'Bad Request';
              break;
            case 401:
              errorMessage = 'Unauthorized';
              break;
            case 500: {
              console.log("City Name Incorrect")
              errorMessage = 'City Name Incorrect';
            }
              break;
            case 404: {

              const errorCode = error.error?.errorCode || 'ERR001';
              const errorMessage = error.error?.errorMessage || 'City not found';
              this.errorService.setError(errorCode, errorMessage);
            }
            break;
            //　バックエンドが開始されていない場合
            case 0: {

              const errorCode = 'BKNDOWN';
              const errorMessage = 'Backend is not reachable. Please try again later.';
              this.errorService.setError(errorCode, errorMessage);
            }
            break;

            // Add more cases for other status codes as needed
          }
        }

        // You can display the error message on the UI or take other actions
        console.error(errorMessage);

        return throwError(errorMessage);
      })
    );
  }
}