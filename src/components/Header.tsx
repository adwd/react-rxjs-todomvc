import React from 'react';
import TodoTextInput from './TodoTextInput';
import { addTodo } from '../store/todos';

const Header = ({ addTodo }: { addTodo: (text: string) => void }) => (
  <header className="header">
    <h1>todos</h1>
    <TodoTextInput
      newTodo={true}
      onSave={(text: string) => {
        if (text.length !== 0) {
          addTodo(text);
        }
      }}
      placeholder="What needs to be done?"
    />
  </header>
);

export default () => <Header addTodo={addTodo} />;
