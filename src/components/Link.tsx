import React from 'react';

import classnames from 'classnames';

interface Props {
  active: boolean;
  children: React.ReactNode;
  setFilter: () => void;
}

export const Link = ({ active, children, setFilter }: Props) => (
  <a
    className={classnames({ selected: active })}
    style={{ cursor: 'pointer' }}
    onClick={() => setFilter()}
  >
    {children}
  </a>
);
