import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { routes } from './app.routes'; // Ensure this file contains the correct route definitions

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(HttpClientModule), // ✅ Ensure HttpClientModule is included
    provideRouter(routes), // ✅ Ensure routes are properly provided
  ]
};
