import React from 'react';
import TaskList from './components/TaskList';

import './App.css';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
      <TaskList />
    </div>
  );
};

export default App;
