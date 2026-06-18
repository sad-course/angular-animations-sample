import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  trigger,
  state,
  transition,
  style,
  animate,
} from '@angular/animations';
import { Task } from '../app';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task.html',
  styleUrl: './task.css',
  animations: [
    trigger('taskState', [
      state(
        'active',
        style({
          opacity: 1,
          transform: 'translateX(0) scale(1)',
          height: '*',
          paddingTop: '12px',
          paddingBottom: '12px',
          marginBottom: '10px',
        })
      ),
      state(
        'removing',
        style({
          opacity: 0,
          transform: 'translateX(48px) scale(0.95)',
          height: '0px',
          paddingTop: '0',
          paddingBottom: '0',
          marginBottom: '0',
          overflow: 'hidden',
        })
      ),
      transition('active => removing',
        animate('280ms cubic-bezier(0.4, 0, 1, 1)')
      ),
    ]),
  ],
})
export class TaskComponent {
  @Input() task!: Task;

  @Output() toggle = new EventEmitter<number>();
  @Output() removeDone = new EventEmitter<number>();

  animState: 'active' | 'removing' = 'active';

  onToggle(): void {
    this.toggle.emit(this.task.id);
  }

  onRemoveClick(): void {
    this.animState='removing'
  }

  onAnimationDone(event: { toState: string }): void {
    if (event.toState === 'removing') {
      this.removeDone.emit(this.task.id);
    }
  }
}