import * as React from 'react';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Todo from '@components/Todo';
// import Header from '@components/Header';


function TodoPage() {
  return (
    <DragDropContextProvider backend={HTML5Backend}>
      <div>
        {/* <Header /> */}
        <Todo />
      </div>
    </DragDropContextProvider>
  );
}

export default TodoPage;
