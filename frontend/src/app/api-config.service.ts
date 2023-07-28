import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import TaskListModel from './models/TaskListModel';
import TaskModel from './models/TaskModel';
@Injectable({
  providedIn: 'root'
})
export class ApiConfigService {
  API_BASE_URL = 'http://localhost:3000'
  constructor(private httpClient: HttpClient) { }

  //API calls
  getTaskLists(url: string){
      return this.httpClient.get<TaskListModel[]>(`${this.API_BASE_URL}/${url}`)
  }
  getTasks(url: string){
    return this.httpClient.get<TaskModel[]>(`${this.API_BASE_URL}/${url}`)
  }
  postTaskList(url: string, data: Object){
    return this.httpClient.post<TaskListModel>(`${this.API_BASE_URL}/${url}`, data)
  }
  postTask(url: string, data: Object){
    return this.httpClient.post<TaskModel>(`${this.API_BASE_URL}/${url}`, data)
  }
  put(url: string, data: Object){
    return this.httpClient.put(`${this.API_BASE_URL}/${url}`, data)
  }
  patch(url: string, data: Object){
    return this.httpClient.patch(`${this.API_BASE_URL}/${url}`, data)
  }
  patchTask(url: string, data: Object){
    return this.httpClient.patch<TaskModel[]>(`${this.API_BASE_URL}/${url}`, data)
  }
  deleteTask(url: string){
    return this.httpClient.delete<TaskModel[]>(`${this.API_BASE_URL}/${url}`)
  }
  deleteTaskList(url: string){
    return this.httpClient.delete<TaskListModel>(`${this.API_BASE_URL}/${url}`)
  }
}
