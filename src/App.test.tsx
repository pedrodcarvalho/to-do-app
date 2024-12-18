import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import '@testing-library/jest-dom';
import App from './App';
import todosReducer from './features/todos/todosSlice';

test('renders app', () => {
  const store = configureStore({
    reducer: {
      todos: todosReducer,
    },
    preloadedState: {
      todos: {
        items: [
          {
            id: 1,
            text: 'Test',
            progress: 0,
            completed: false,
          },
        ],
      },
    },
  });

  render(
    React.createElement(Provider, {
      store,
      children: React.createElement(App, null),
    }),
  );

  expect(screen.getByText(/Test/i)).toBeInTheDocument();
});
