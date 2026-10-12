
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth';
import { Task, TasksService } from '../tasks';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inicio.html',
  styleUrl: './inicio.scss'
})
export class InicioComponent implements OnInit {
  tasks: Task[] = [];
  title = '';
  description = '';
  editingId: string | null = null;
  message = '';
  error = '';
  loading = true;
  userEmail = '';
  userId = '';

  constructor(
    private authService: AuthService,
    private tasksService: TasksService,
    private router: Router
  ) {}

  async ngOnInit() {
    const user = this.authService.getCurrentUser();

    if (!user) {
      await this.router.navigate(['/login']);
      return;
    }

    this.userId = user.uid;
    this.userEmail = user.email || '';

    await this.loadTasks();
  }

  async loadTasks() {
    this.loading = true;
    this.error = '';

    try {
      this.tasks = await this.tasksService.getTasks(this.userId);
    } catch {
      this.error = 'No se pudieron cargar las tareas.';
    } finally {
      this.loading = false;
    }
  }

  async saveTask() {
    this.message = '';
    this.error = '';

    if (!this.title.trim()) {
      this.error = 'Escribe el título de la tarea.';
      return;
    }

    try {
      if (this.editingId) {
        await this.tasksService.updateTask(this.editingId, {
          title: this.title.trim(),
          description: this.description.trim()
        });

        this.message = 'Tarea actualizada correctamente.';
      } else {
        await this.tasksService.addTask(
          this.userId,
          this.title.trim(),
          this.description.trim()
        );

        this.message = 'Tarea creada correctamente.';
      }

      this.cancelEdit();
      await this.loadTasks();
    } catch {
      this.error = 'No se pudo guardar la tarea.';
    }
  }

  editTask(task: Task) {
    this.editingId = task.id;
    this.title = task.title;
    this.description = task.description || '';
    this.message = '';
    this.error = '';
  }

  async toggleTask(task: Task) {
    try {
      await this.tasksService.updateTask(task.id, {
        done: !task.done
      });

      await this.loadTasks();
    } catch {
      this.error = 'No se pudo cambiar el estado de la tarea.';
    }
  }

  async deleteTask(taskId: string) {
    try {
      await this.tasksService.deleteTask(taskId);
      await this.loadTasks();
    } catch {
      this.error = 'No se pudo eliminar la tarea.';
    }
  }

  cancelEdit() {
    this.editingId = null;
    this.title = '';
    this.description = '';
  }

  async logout() {
    await this.authService.logout();
    await this.router.navigate(['/login']);
  }
}
