import { Routes } from '@angular/router';

// Importation des composants
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard/dashboard.component';

// Importation du AuthGuard pour sécuriser l'accès aux pages restreintes
import { AuthGuard } from './services/auth.guard';

// Définition des routes
export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Page par défaut
  { path: 'login', component: LoginComponent }, // Page de connexion
  { path: 'register', component: RegisterComponent }, // Page d'inscription
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard] // ✅ Protège l'accès si non connecté
  },
  { path: '**', redirectTo: 'login' } // Redirection des routes inconnues vers la connexion
];
