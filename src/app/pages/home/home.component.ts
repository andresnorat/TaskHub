import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

tasks = signal([
    'Instalar angular',
    'Crear proyecto',
    'Mostrar lista'
]);


changeHamdler(event: Event){
  const input = event.target as HTMLInputElement;
  const newTaks = input.value;
  if(newTaks && newTaks.length > 5){
    this.tasks.update((tasks) => [...tasks, newTaks]);
  }
}

deleteTaks(index: number){
  console.log(index);
  this.tasks.update((taks) => taks.filter((taks, position) => position !== index));
}
}
