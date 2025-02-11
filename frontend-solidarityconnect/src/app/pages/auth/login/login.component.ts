import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';
  isLoading = false; // ✅ Indicateur de chargement

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.errorMessage = ''; // ✅ Réinitialise les erreurs
    if (!this.email || !this.password) {
      this.errorMessage = "Veuillez remplir tous les champs.";
      return;
    }

    if (!this.validateEmail(this.email)) {
      this.errorMessage = "L'adresse email n'est pas valide.";
      return;
    }

    this.isLoading = true; // ✅ Active le chargement
    console.log("🔍 Tentative de connexion avec :", { email: this.email, password: this.password });

    this.authService.login({ email: this.email, password: this.password })
      .subscribe({
        next: (response: any) => {
          console.log("✅ Connexion réussie :", response);
          localStorage.setItem('token', response.token);
          this.router.navigate(['/dashboard']);
        },
        error: (error: any) => {
          console.error("❌ Erreur de connexion :", error);
          this.errorMessage = "Email ou mot de passe incorrect.";
        },
        complete: () => {
          this.isLoading = false; // ✅ Désactive le chargement
        }
      });
  }

  // ✅ Fonction pour valider un email
  validateEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }
}
