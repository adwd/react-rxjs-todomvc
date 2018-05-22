import React from 'react';

import { Link } from './Link';
import { BehaviorSubscription } from '../util/subscription';
import {
  visibilityFilter,
  Visibility,
  setVisibilityFilter,
} from '../store/todos';

interface Props {
  completedCount: number;
  activeCount: number;
  onClearCompleted: () => void;
}

export const SHOW_ALL = 'show_all';
export const SHOW_COMPLETED = 'show_completed';
export const SHOW_ACTIVE = 'show_active';

export const FILTER_TITLES: { [key: string]: Visibility } = {
  [SHOW_ALL]: 'all',
  [SHOW_ACTIVE]: 'active',
  [SHOW_COMPLETED]: 'completed',
};

export const Footer = (props: Props) => {
  const { activeCount, completedCount, onClearCompleted } = props;
  const itemWord = activeCount === 1 ? 'item' : 'items';
  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{activeCount || 'No'}</strong> {itemWord} left
      </span>
      <ul className="filters">
        {Object.keys(FILTER_TITLES).map(filter => (
          <li key={filter}>
            <BehaviorSubscription source={visibilityFilter}>
              {(v: Visibility) => (
                <Link
                  active={FILTER_TITLES[filter] === v}
                  setFilter={() => setVisibilityFilter(FILTER_TITLES[filter])}
                >
                  {FILTER_TITLES[filter]}
                </Link>
              )}
            </BehaviorSubscription>
          </li>
        ))}
      </ul>
      {!!completedCount && (
        <button className="clear-completed" onClick={onClearCompleted}>
          Clear completed
        </button>
      )}
    </footer>
  );
};
