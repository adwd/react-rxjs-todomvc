import React from 'react'

interface Props {
  todosCount: number;
  completedCount: number;
  actions: any;
}

const MainSection = ({ todosCount, completedCount, actions }: Props) =>
(
  <section className="main">
    {
      !!todosCount && 
      <span>
        <input
          className="toggle-all"
          type="checkbox"
          checked={completedCount === todosCount}
        />
        <label onClick={actions.completeAllTodos}/>
      </span>
    }
    {/* <VisibleTodoList /> */}
    {
      !!todosCount && null
    }
  </section>
)

/* !!todosCount && <Footer
  completedCount={completedCount}
  activeCount={todosCount - completedCount}
  onClearCompleted={actions.clearCompleted}
/> */

export default () => (
  <MainSection todosCount={2} completedCount={0}
    actions={{ completeAllTodos: console.log, clearCompleted: console.log }} />
);
