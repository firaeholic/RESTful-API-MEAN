import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import TaskListModel from 'src/app/models/TaskListModel';
import TaskModel from 'src/app/models/TaskModel';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-new-task-screen',
  templateUrl: './new-task-screen.component.html',
  styleUrls: ['./new-task-screen.component.scss']
})
export class NewTaskScreenComponent {

  taskLists: TaskListModel[] = []
  tasks: TaskModel[] = []
  taskListId: string = ''

      constructor(
        private router : Router,
        private taskService: TaskService,
        private activatedRoute: ActivatedRoute
      ){}
      
      ngOnInit(): void{
        this.activatedRoute.params.subscribe(
          (params: Params) => {
            this.taskListId = params['taskListId']
          }
        )
      }



      addNewTask(title: string){
        if(title){
        this.taskService.createTaskForTaskList(title, this.taskListId).subscribe()
        alert(`${title} has been added to the task list!`)
      }else{
        alert("Title can not be empty!")
      }
    }
}
