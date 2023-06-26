import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { TaskTableComponent } from './task-table/task-table.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild(TaskTableComponent) taskTable!: TaskTableComponent;

  title = 'tasklist';
  public user = 'Ivan Ivanenko';
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