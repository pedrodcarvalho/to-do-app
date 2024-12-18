import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Todo {
    id: number;
    text: string;
    progress: number;
    completed: boolean;
}

interface TodosState {
    items: Todo[];
}

const initialState: TodosState = {
    items: [],
};

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<string>) => {
            const newTodo: Todo = {
                id: Date.now(),
                text: action.payload,
                progress: 0,
                completed: false,
            };
            state.items.push(newTodo);
        },
        toggleTodo: (state, action: PayloadAction<{ id: number; progress: number }>) => {
            const todo = state.items.find((todo) => todo.id === action.payload.id);
            if (todo) {
                todo.progress = action.payload.progress;
                todo.completed = action.payload.progress === 100;
            }
        },
        deleteTodo: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter((todo) => todo.id !== action.payload);
        },
    },
});

export const { addTodo, toggleTodo, deleteTodo } = todosSlice.actions;
export default todosSlice.reducer;
