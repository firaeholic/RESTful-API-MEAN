import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import TaskListModel from 'src/app/models/TaskListModel';
import TaskModel from 'src/app/models/TaskModel';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-task-screen',
  templateUrl: './task-screen.component.html',
  styleUrls: ['./task-screen.component.scss']
})
export class TaskScreenComponent implements OnInit {

  taskLists: TaskListModel[] = []
  tasks: TaskModel[] = []
  taskListId: string = ''

  constructor(
    private taskService: TaskService,
    private activatedRoute: ActivatedRoute,
    private router : Router,
    
    ){  }


  ngOnInit(): void {
      this.taskService.getAllTaskLists()
        .subscribe(allTaskLists => {
          this.taskLists = allTaskLists
        })

      

      this.activatedRoute.params.subscribe(
        (params: Params) => {
          this.taskListId = params['taskListId']  
          if(this.taskListId){
            this.taskService.getAllTasksFromTaskList(this.taskListId).subscribe(
              allTasks => this.tasks = allTasks
            )
          }
        }
      )
  }

  taskClicked(task: TaskModel){
    this.taskService.changeStatusOfaTask(this.taskListId, task).subscribe(
      () => task.completed = !task.completed
    )
  }
  taskDelete(task: TaskModel) {
    this.taskService.deleteTaskFromTaskList(this.taskListId, task._id).subscribe(
      () => {
        // Remove the task from the tasks array
        this.tasks = this.tasks.filter(t => t._id !== task._id);
        
      }
    )
  }
  taskListDelete(taskList: TaskListModel){
    this.taskService.deleteTaskList(taskList._id).subscribe(
      () => {
      this.taskLists = this.taskLists.filter((ts => ts._id !== taskList._id))
      this.router.navigate(['task-list'])
      }
    )
  }
  addNewTask(){
    if(this.taskListId){
    this.router.navigate([`task-list/${this.taskListId}/new-task`])
    // this.router.navigate(['new-task'], {relativeTo: this.activatedRoute})
    }else{
      alert("Please select a task list!")
    }
  }
}
