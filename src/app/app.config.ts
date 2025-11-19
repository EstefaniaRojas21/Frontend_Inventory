import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // 👈 importa esto
import { provideHttpClient } from '@angular/common/http'; // 👈 y esto para tus servicios API

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),

    // 👇 añade estos tres para arreglar tus errores:
    importProvidersFrom(FormsModule),
    importProvidersFrom(ReactiveFormsModule),
    provideHttpClient()
  ]
};
