import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  welcome = 'Hola';

  tasks = [
    'Instalar angular',
    'Crear proyecto',
    'Mostrar lista'
  ];
}
