import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { TaskTableComponent } from './task-table/task-table.component';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.scss']
})
export class TaskListComponent implements AfterViewInit {
  @ViewChild(TaskTableComponent) taskTable!: TaskTableComponent;

  public taskName = '';
  public tasks: Task[] = [];

  ngAfterViewInit(): void {
    this.tasks = this.taskTable.tasks;
  }

  addTask(): void {
    this.tasks.push({ name: this.taskName, done: false });
    this.taskName = '';
  }
}

type Task = {
  name: string,
  done: boolean
}