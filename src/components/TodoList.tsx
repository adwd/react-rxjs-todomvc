import React from 'react';

import TodoItem from './TodoItem';

export const TodoList = ({
  filteredTodos,
  actions,
}: {
  filteredTodos: any[];
  actions: any;
}) => (
  <ul className="todo-list">
    {filteredTodos.map(todo => (
      <TodoItem key={todo.id} todo={todo} {...actions} />
    ))}
  </ul>
);
