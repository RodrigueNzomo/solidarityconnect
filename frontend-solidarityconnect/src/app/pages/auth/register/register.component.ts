import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // ✅ Ajouté pour *ngIf
import { FormsModule } from '@angular/forms'; // ✅ Ajouté pour [(ngModel)]

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true, // ✅ Mode Standalone activé
  imports: [CommonModule, FormsModule] // ✅ Import des modules nécessaires
})
export class RegisterComponent {
  // Champs d'inscription
  firstName = '';
  lastName = '';
  birthDate = '';
  gender = '';
  maritalStatus = '';
  childrenCount: number | null = null;
  email = '';
  phone = '';
  address = '';
  job = '';
  userRole = ''; // Bénévole ou Personne en difficulté
  needs = ''; // Spécifique aux personnes en difficulté
  skills = ''; // Spécifique aux bénévoles
  password = '';
  confirmPassword = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  // ✅ Fonction pour gérer les changements de rôle
  onRoleChange() {
    if (this.userRole === 'Personne en difficulté') {
      this.skills = ''; // Supprime les compétences si utilisateur en difficulté
    } else if (this.userRole === 'Bénévole') {
      this.needs = ''; // Supprime les besoins si utilisateur est bénévole
    }
  }

  // ✅ Fonction pour valider et envoyer les données d'inscription
  onRegister() {
    // 🔹 Vérification que tous les champs sont remplis
    if (!this.firstName || !this.lastName || !this.birthDate || !this.gender ||
        !this.maritalStatus || this.childrenCount === null || !this.email || !this.phone || 
        !this.address || !this.job || !this.userRole || !this.password || !this.confirmPassword) {
      this.errorMessage = "Veuillez remplir tous les champs.";
      return;
    }

    // 🔹 Vérification du format de l'email
    if (!this.validateEmail(this.email)) {
      this.errorMessage = "L'adresse email n'est pas valide.";
      return;
    }

    // 🔹 Vérification du format du téléphone (doit contenir uniquement des chiffres)
    if (!/^\d{10}$/.test(this.phone)) {
      this.errorMessage = "Le numéro de téléphone doit contenir 10 chiffres.";
      return;
    }

    // 🔹 Vérification si les mots de passe correspondent
    if (this.password !== this.confirmPassword) {
      this.errorMessage = "Les mots de passe ne correspondent pas.";
      return;
    }

    // ✅ Construction des données utilisateur
    const userData = {
      firstName: this.firstName,
      lastName: this.lastName,
      birthDate: this.birthDate,
      gender: this.gender,
      maritalStatus: this.maritalStatus,
      childrenCount: this.childrenCount,
      email: this.email,
      phone: this.phone,
      address: this.address,
      job: this.job,
      userRole: this.userRole,
      needs: this.userRole === 'Personne en difficulté' ? this.needs : null,
      skills: this.userRole === 'Bénévole' ? this.skills : null,
      password: this.password
    };

    console.log("🔍 Données utilisateur envoyées :", userData); // ✅ Debug

    // ✅ Envoi des données au service d'inscription
    this.authService.register(userData)
      .subscribe(
        (response: any) => {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/dashboard']); // Redirection après inscription
        },
        (error: any) => {
          this.errorMessage = "Erreur lors de l'inscription.";
        }
      );
  }

  // ✅ Fonction pour valider un email
  validateEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }
}
