import { Component } from '@angular/core';
import { Router } from '@angular/router';
import TaskListModel from 'src/app/models/TaskListModel';
import TaskModel from 'src/app/models/TaskModel';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-new-task-list-screen',
  templateUrl: './new-task-list-screen.component.html',
  styleUrls: ['./new-task-list-screen.component.scss']
})
export class NewTaskListScreenComponent {

  taskLists: TaskListModel[] = []


    constructor(
      private router : Router,
      private taskService: TaskService
    ){}

    cancelTaskListAdd(){
      this.router.navigate(['task-list'])
    }
    addNewTaskList(title: string){
      if(title){
      this.taskService.createTaskList(title).subscribe(
        (NewlyCreatedTaskList: TaskListModel) => {
            alert(`${title} has been added to the list!`)
              this.router.navigate(['task-list', NewlyCreatedTaskList._id]);

        }
      )
    }else{
      alert("Title can not be empty!")
    }
  }
}
