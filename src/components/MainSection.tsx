import React from 'react';

import { Footer } from './Footer';
import {
  completeAllTodos,
  clearCompleted,
  todos,
  filteredTodos,
  editTodo,
  deleteTodo,
  completeTodo,
} from '../store/todos';
import { BehaviorSubscription } from '../util/subscription';
import { Todo } from './TodoItem';
import { TodoList } from './TodoList';

interface Props {
  todosCount: number;
  completedCount: number;
  actions: any;
}

const MainSection = ({ todosCount, completedCount, actions }: Props) => (
  <section className="main">
    {!!todosCount && (
      <span>
        <input
          className="toggle-all"
          type="checkbox"
          checked={completedCount === todosCount}
        />
        <label onClick={actions.completeAllTodos} />
      </span>
    )}
    <BehaviorSubscription source={filteredTodos}>
      {(fts: Todo[]) => (
        <TodoList
          filteredTodos={fts}
          actions={{
            editTodo,
            deleteTodo,
            completeTodo,
          }}
        />
      )}
    </BehaviorSubscription>
    {!!todosCount && (
      <Footer
        completedCount={completedCount}
        activeCount={todosCount - completedCount}
        onClearCompleted={actions.clearCompleted}
      />
    )}
  </section>
);

export default () => (
  <BehaviorSubscription source={todos}>
    {(ts: Todo[]) => (
      <MainSection
        todosCount={ts.length}
        completedCount={ts.filter(t => t.completed).length}
        actions={{ completeAllTodos, clearCompleted }}
      />
    )}
  </BehaviorSubscription>
);
