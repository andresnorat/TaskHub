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







}
