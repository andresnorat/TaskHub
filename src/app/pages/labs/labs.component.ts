import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-labs',
  templateUrl: './labs.component.html',
  styleUrls: ['./labs.component.css']
})
export class LabsComponent {

colorCtrol =  new FormControl();

constructor(){
  this.colorCtrol.valueChanges
  .subscribe((value)=> {
    console.log(value);
  })
}

  welcome = 'Hola';
  tasks = signal([
    'Instalar angular',
    'Crear proyecto',
    'Mostrar lista'
  ]);

  name = signal('Andres');
  age = 22;
  status = true;
  img = 'https://w3schools.com/howto/img_avatar.png';

  person = signal({
    name: 'Carlos',
    age: 48,
    img: 'https://w3schools.com/howto/img_avatar.png'
  });

  clickHandler(){
    alert('Hola');
  }

  changeHandler(event: Event){
    const input =  event.target as HTMLInputElement;
    const newValue = input.value
    this.name.set(newValue);
  }

  keyDownHandler(event: KeyboardEvent){
    const input =  event.target as HTMLInputElement;
    const value =  input.value;
    console.log(value);
  }


  changeHandlerOnbject(event: Event){
    const input =  event.target as HTMLInputElement;
    const newValue = input.value;
    this.person.update((prevState) => {
      return {
        ...prevState,
        name: newValue
      }
    });
  }


}
