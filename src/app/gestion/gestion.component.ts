import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Taches } from '../interface/taches';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-gestion',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.css']
})
export class GestionComponent implements OnInit {
  taches: Taches[] = [];
  newTaches = '';
  filters: 'all' | 'complete' | 'encours' = 'all';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    // Safely check if running in browser before accessing localStorage
    if (isPlatformBrowser(this.platformId)) {
      const data = localStorage.getItem('taches');
      if (data) {
        this.taches = JSON.parse(data);
      }
    }
  }

  SaveTaches() {
    // Only save to localStorage in browser environment
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('taches', JSON.stringify(this.taches));
    }
  }

  addTaches() {
    if (this.newTaches.trim()) {
      this.taches.push({
        id: Date.now(),
        title: this.newTaches,
        isCompleted: false
      });
      this.newTaches = '';
      this.SaveTaches(); //sauvegarder apres ajout
    }
  }

  Completed(taches: Taches) {
    taches.isCompleted = !taches.isCompleted;
    this.SaveTaches(); // sauvegarder apres modification statut
  }

  deleteTaches(tacheId: number) {
    if(window.confirm('voulez vous supprimer cette tache ?')){
    this.taches = this.taches.filter(t => t.id !== tacheId);
    this.SaveTaches(); // sauvegarder apres suppression
  }
}

  tachesFilter() {
    if (this.filters === 'complete') {
      return this.taches.filter(t => t.isCompleted);
    } else if (this.filters === 'encours') {
      return this.taches.filter(t => !t.isCompleted);
    }
    return this.taches;
  }
}
