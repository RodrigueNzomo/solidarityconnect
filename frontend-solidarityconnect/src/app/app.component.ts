import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar/navbar.component';
import { filter } from 'rxjs/operators';

interface Feature {
  image: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent]
})
export class AppComponent {
  title = 'SolidarityConnect';
  
  // 🔹 Ajout d'un indicateur pour cacher le header sur /login et /register
  isAuthPage: boolean = false;

  constructor(private router: Router) {
    // 🔹 Détecter la route actuelle et mettre à jour isAuthPage
    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.isAuthPage = event.url === '/login' || event.url === '/register';
      });
  }

  features: Feature[] = [
    { image: '/assets/membre.jpeg', title: 'Authentification', description: "Formulaire d'inscription complet, validation côté serveur, stockage sécurisé." },
    { image: '/assets/helping-hand.avif', title: 'Demande d\'Aide', description: "Soumission des demandes avec validation et stockage en base de données." },
    { image: '/assets/community-hands.jpeg', title: 'Correspondance Bénévole', description: "Filtrage dynamique des demandes par localisation et compétences." },
    { image: '/assets/contribution-tracking-icon.avif', title: 'Messagerie en Temps Réel', description: "Echanges avec les bénévoles via WebSockets avec historique persistant." },
    { image: '/assets/loan-aid-management-icon.avif', title: 'Gestion Administrateur', description: "CRUD des utilisateurs et modération des demandes en temps réel." },
    { image: '/assets/pret.jpeg', title: 'Prêts & Financements', description: "Facilitez l'accès aux financements pour les projets communautaires." }
  ];

  carouselImages: string[] = [
    '/assets/community-hands.jpeg',
    '/assets/background-solidarity.jpg',
    '/assets/helping-hand.avif'
  ];
}
