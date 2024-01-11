import { Component, computed, effect, signal, OnInit, inject, Injector } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Taks } from 'src/app/models/taks.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  implements OnInit {



injector = inject(Injector);

ngOnInit() {
  const storage = localStorage.getItem('tasks');
  if(storage){
      const tasks = JSON.parse(storage);
      this.tasks.set(tasks);
  }
  this.trackTasks();
}

trackTasks(){
  effect(() => {
    const tasks =  this.tasks();
    localStorage.setItem('tasks', JSON.stringify(tasks));
  },{injector: this.injector});
}


tasks = signal<Taks[]>([]);

  filter = signal<'all' | 'pending' | 'completed'>('all');
  taskByFilter = computed(()=>{
    const filter = this.filter();
    const tasks =  this.tasks();
    if(filter === 'pending'){
        return tasks.filter((taks) => !taks.completed)
    }
    if(filter === 'completed'){
      return tasks.filter((taks) => taks.completed)
    }
    return tasks;
  });

newTaksCtrl =  new FormControl('',{
  nonNullable: true,
  validators: [
    Validators.required,
    Validators.minLength(3),
    ]
});

changeHamdler(){
  if(this.newTaksCtrl.valid){
    const value = this.newTaksCtrl.value.trim();
    if(value !== ''){
      this.addTaks(value);
      this.newTaksCtrl.setValue('')
    }
  }
}

addTaks(title: string){
  const newTaks = {
    id: Date.now(),
    title: title,
    completed: false
  }
  this.tasks.update((tasks) => [...tasks, newTaks]);
}


deleteTaks(index: number){
  this.tasks.update((taks) => taks.filter((taks, position) => position !== index));
}


updateTask(index: number){
  this.tasks.update((taks) => {
    return taks.map((taks, position) => {
      if(position === index){
        return {
          ...taks,
          completed: !taks.completed
        }
      }
      return taks
    })
  })
}

updateTaksEditingMode(index: number){
  this.tasks.update((prevState) => {
    return prevState.map((taks, position) => {
      if(position === index){
        return {
          ...taks,
          editing: true
        }
      }
      return {
        ...taks,
        editing: false
      }
    })
  })
}


updateTaksText(index: number, event: Event){
  const input  =  event.target as HTMLInputElement;
  this.tasks.update((prevState) => {
    return prevState.map((taks, position) => {
      if(position === index){
        return {
          ...taks,
          title: input.value,
          editing: false
        }
      }
      return taks;
    })
  })
}


changeFilter(filter: 'all' | 'pending' | 'completed'){
  this.filter.set(filter);
}


}
