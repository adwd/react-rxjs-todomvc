import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { Todo } from '../components/TodoItem';

export const todos = new BehaviorSubject<Todo[]>([]);

let CurrentId = 0;

export const addTodo = (text: string) => {
  const current = todos.getValue();
  const nextId = CurrentId++;
  todos.next([...current, { text, completed: false, id: nextId }]);
};
export const deleteTodo = (id: number) => {
  const current = todos.getValue();
  todos.next(current.filter(t => t.id !== id));
};
export const editTodo = (id: number, text: string) => {
  const current = todos.getValue();
  const nextTodos = current.map(t => (t.id === id ? { ...t, text } : t));
  todos.next(nextTodos);
};

export const completeTodo = (id: number) => {
  const current = todos.getValue();
  const nextTodos = current.map(
    t => (t.id === id ? { ...t, completed: true } : t),
  );
  todos.next(nextTodos);
};

export const completeAllTodos = () => {
  const current = todos.getValue();
  const nextTodos = current.map(t => ({ ...t, completed: true }));
  todos.next(nextTodos);
};

export const clearCompleted = () => {
  const current = todos.getValue();
  const nextTodos = current.filter(t => !t.completed);
  todos.next(nextTodos);
};

export type Visibility = 'all' | 'active' | 'completed';

export const visibilityFilter = new BehaviorSubject<Visibility>('all'); // all, active, completed
export const setVisibilityFilter = (f: Visibility) => visibilityFilter.next(f);

// export const filteredTodos = combineLatest(
//   todos,
//   visibilityFilter,
// ).pipe(map(([todos, f]) => filterTodos(todos, f)))

export const filteredTodos = new BehaviorSubject<Todo[]>([]);
combineLatest(todos, visibilityFilter)
  .pipe(map(([todos, f]) => filterTodos(todos, f)))
  .subscribe(ts => filteredTodos.next(ts));

function filterTodos(todos: Todo[], f: Visibility): Todo[] {
  switch (f.toLowerCase()) {
    case 'all':
      return todos;

    case 'active':
      return todos.filter(t => !t.completed);

    case 'completed':
      return todos.filter(t => t.completed);

    default:
      return todos;
  }
}
