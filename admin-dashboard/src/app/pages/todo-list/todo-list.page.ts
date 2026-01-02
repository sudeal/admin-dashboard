import { Component, signal, OnInit, effect } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";

export type TodoItem = {
  id: string;
  text: string;
  done: boolean;
  starred: boolean;
};

@Component({
  selector: "app-todo-list-page",
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: "./todo-list.page.html",
  styleUrl: "./todo-list.page.css", 
})
export class TodoListPage implements OnInit {
  private readonly STORAGE_KEY = "todo-list-items";
  
  
  todos = signal<TodoItem[]>(this.loadFromLocalStorage());

  showModal = signal(false);
  newTaskText = "";

  constructor() {
    
    effect(() => {
      this.saveToLocalStorage(this.todos());
    });
  }

  ngOnInit() {
   
    const saved = this.loadFromLocalStorage();
    if (saved.length > 0) {
      this.todos.set(saved);
    }
  }

  private loadFromLocalStorage(): TodoItem[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error("Error loading todos from localStorage:", error);
    }
    
    return [
      { id: "t1", text: "Meeting with CEO", done: false, starred: false },
      { id: "t2", text: "Pick up kids from school", done: false, starred: true },
      { id: "t3", text: "Shopping with Brother", done: false, starred: false },
      { id: "t4", text: "Review with HR", done: true, starred: false },
      { id: "t5", text: "Going to Dia's School", done: false, starred: false },
      { id: "t6", text: "Check design files", done: false, starred: true },
      { id: "t7", text: "Update File", done: false, starred: false },
    ];
  }

  private saveToLocalStorage(todos: TodoItem[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(todos));
    } catch (error) {
      console.error("Error saving todos to localStorage:", error);
    }
  }

  addNewTask() {
    this.newTaskText = "";
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
    this.newTaskText = "";
  }

  saveTask() {
    const trimmed = this.newTaskText.trim();
    if (!trimmed) return;

    const newItem: TodoItem = {
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      text: trimmed,
      done: false,
      starred: false,
    };

    this.todos.update((list) => {
      const updated = [newItem, ...list];
      
      return updated;
    });
    this.closeModal();
  }

  toggleDone(id: string) {
    this.todos.update((list) =>
      list.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }

  toggleStar(id: string) {
    this.todos.update((list) =>
      list.map((t) => (t.id === id ? { ...t, starred: !t.starred } : t))
    );
  }

  removeTask(id: string) {
    this.todos.update((list) => list.filter((t) => t.id !== id));
  }

  trackById(_: number, item: TodoItem) {
    return item.id;
  }
}
