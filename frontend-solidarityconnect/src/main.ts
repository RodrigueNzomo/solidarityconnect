import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http'; // ✅ Import obligatoire

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),  // ✅ Gère le routage
    provideHttpClient()    // ✅ Gère les requêtes HTTP (corrige l'erreur)
  ]
}).catch(err => console.error(err));
