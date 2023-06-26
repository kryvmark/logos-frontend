import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-task-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.scss']
})
export class TaskTableComponent {
  public tasks: Task[] = [];
  public editIndex = -1;
  public editName = '';

  editTask(index: number): void {
    this.editIndex = index;
    this.editName = this.tasks[index].name;
  }

  saveEditTask(): void {
    this.tasks[this.editIndex].name = this.editName;
    this.editIndex = -1;
    this.editName = '';
  }

  deleteTask(index: number): void {
    this.tasks.splice(index, 1);
  }
}

type Task = {
  name: string,
  done: boolean
}