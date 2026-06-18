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
export class TaskComponent implements OnChanges {
  @Input() task!: Task;
  /** Driven by the parent — true when this task should animate out */
  @Input() removing = false;

  @Output() toggle = new EventEmitter<number>();
  @Output() remove = new EventEmitter<number>();
  /** Emitted after the leave-animation finishes so parent can drop the item */
  @Output() removeDone = new EventEmitter<number>();

  animState: 'active' | 'removing' = 'active';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['removing'] && this.removing && this.animState !== 'removing') {
      this.animState = 'removing';
    }
  }

  onToggle(): void {
    this.toggle.emit(this.task.id);
  }

  onRemoveClick(): void {
    // Ask the parent to mark this task for removal
    this.remove.emit(this.task.id);
  }

  onAnimationDone(event: { toState: string }): void {
    if (event.toState === 'removing') {
      this.removeDone.emit(this.task.id);
    }
  }
}