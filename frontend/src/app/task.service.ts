import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiConfigService } from './api-config.service';
import TaskListModel from './models/TaskListModel';
import TaskModel from './models/TaskModel';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private apiConfigService: ApiConfigService) { }

  getAllTaskLists(): Observable<TaskListModel[]>{
    return this.apiConfigService.getTaskLists('tasklists')
  }
  createTaskList(title: string): Observable<TaskListModel>{
    let data = {'title': title}
    return this.apiConfigService.postTaskList('tasklists', data)
  }
  getAllTasksFromTaskList(taskListId: string): Observable<TaskModel[]>{
    return this.apiConfigService.getTasks(`tasklists/${taskListId}/tasks`)
  }
  createTaskForTaskList(title: string, tasklistId: string): Observable<TaskModel>{
    let data = {'title': title}
    return this.apiConfigService.postTask(`tasklists/${tasklistId}/tasks`, data)
  }
  deleteTaskList(taskListId: string): Observable<TaskListModel>{
    return this.apiConfigService.deleteTaskList(`tasklists/${taskListId}`)
  }
  deleteTaskFromTaskList(taskListId: string, taskId: string): Observable<TaskModel[]>{
    return this.apiConfigService.deleteTask(`tasklists/${taskListId}/tasks/${taskId}`)
  }
  changeStatusOfaTask(taskListId: string, taskObj: TaskModel): Observable<TaskModel[]>{
    let data = {"completed": !taskObj.completed} // toggle
    return this.apiConfigService.patchTask(`tasklists/${taskListId}/tasks/${taskObj._id}`, data)
  }
}
