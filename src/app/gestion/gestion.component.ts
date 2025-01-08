import { Component } from '@angular/core';
import { Taches } from '../interface/taches';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gestion',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.css']
})
export class GestionComponent {
  taches: Taches[] =[];
  newTaches ='';
  filters : 'all' | 'complete' | 'encours' = 'all';


  ngOnInit(): void {
    //methode pour rappeler les données deja ajouter
    const data = localStorage.getItem('taches');
    if(data){
      this.taches = JSON.parse(data);
    }
  }

  SaveTaches(){
  localStorage.setItem('taches', JSON.stringify(this.taches))
  }

  addTaches(){
    if(this.newTaches.trim()){
      this.taches.push({
        id: Date.now(),
        title: this.newTaches,
        isCompleted: false
      });
      this.newTaches ='';
      this.SaveTaches();//sauvegarder apres ajout de nouvelles taches
    }
  }

  Completed(taches : Taches){
    taches.isCompleted = !taches.isCompleted;
    this.SaveTaches();//sauvgarder apres modification
  }

  deleteTaches(tacheId: number){
    this.taches = this.taches.filter(t => t.id !== tacheId);
    this.SaveTaches()//sauvgarder apres suppression
}



  tachesFilter(){
    if(this.filters === 'complete'){
      return this.taches.filter(t => t.isCompleted);
    }else if(this.filters === 'encours'){
      return this.taches.filter(t => !t.isCompleted);
    }
    return this.taches;
  }

}
