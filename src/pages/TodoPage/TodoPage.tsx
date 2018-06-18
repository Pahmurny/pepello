import * as React from 'react';

import Todo from '@components/Todo';
import Header from '@components/Header';
// import { IPanel } from '../../types/IPanel';


function TodoPage() {
  return (
    <div>
      <Header />
      <Todo />
    </div>
  );
}

export default TodoPage;
