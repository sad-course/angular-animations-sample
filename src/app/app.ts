import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
} from '@angular/animations';
import { TaskComponent } from './task/task';

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, TaskComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(-16px) scale(0.97)' }),
            stagger(60, [
              animate(
                '300ms cubic-bezier(0.35, 0, 0.25, 1)',
                style({ opacity: 1, transform: 'translateY(0) scale(1)' })
              ),
            ]),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ],
})
export class AppComponent {
  newTaskTitle = '';
  private nextId = 1;

  tasks: Task[] = [
    { id: this.nextId++, title: 'Set up the Angular project', done: true },
    { id: this.nextId++, title: 'Build the task component', done: false },
  ];

  get pendingCount(): number {
    return this.tasks.filter((t) => !t.done).length;
  }

  addTask(): void {
    const title = this.newTaskTitle.trim();
    if (!title) return;

    this.tasks = [
      { id: this.nextId++, title, done: false },
      ...this.tasks,
    ];
    this.newTaskTitle = '';
  }

  removeTask(id: number): void {
    this.tasks = this.tasks.filter((t) => t.id !== id);
  }

  toggleTask(id: number): void {
    this.tasks = this.tasks.map((t) =>
      t.id === id ? { ...t, done: !t.done } : t
    );
  }

  clearCompleted(): void {
    this.tasks = this.tasks.filter((t) => !t.done);
  }

  trackById(_: number, task: Task): number {
    return task.id;
  }
}