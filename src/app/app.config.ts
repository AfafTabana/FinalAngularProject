import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { authCeptor } from './Inceptors/auth-ceptor-interceptor';
import { routes } from './app.routes';
import { provideHttpClient,HTTP_INTERCEPTORS, withInterceptorsFromDi } from '@angular/common/http';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
      provideRouter(routes), provideClientHydration(withEventReplay()),
     provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptorsFromDi()),
     {
      provide: HTTP_INTERCEPTORS,
      useClass: authCeptor,
      multi: true
    }
  ]
};
