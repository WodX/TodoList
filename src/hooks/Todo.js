import { useReducer, useEffect } from 'react';
import todoReducer from '../reducers/todoReducer';
import AsyncStorage from '@react-native-community/async-storage';

const getTodos = async () => {
  try {
    const todos = await AsyncStorage.getItem('TODOS');
    return todos ? JSON.parse(todos) : [];
  } catch (e) {
    console.log('Failed to fetch the data from storage');
  }
};

export const useTodo = () => {
  const [todos, dispatch] = useReducer(todoReducer, []);

  useEffect(() => {
    const fetchTodos = async () => {
      const data = await getTodos();
      dispatch({ type: 'INIT', payload: data });
    };
    fetchTodos();
  }, []);

  useEffect(() => {
    if (todos != []) {
      AsyncStorage.setItem('TODOS', JSON.stringify(todos));
    }
  }, [todos]);

  const addTodo = (name = '', callback) => {
    name
      ? dispatch({
          type: 'ADD',
          payload: {
            id: new Date().getTime(),
            name
          }
        })
      : callback('*Todo is empty!');
  };

  const deleteTodo = (id) => {
    dispatch({
      type: 'DELETE',
      payload: {
        id
      }
    });
  };

  const toggleTodo = (id) => {
    dispatch({ type: 'CHECK', payload: { id } });
  };

  return [todos, addTodo, deleteTodo, toggleTodo];
};
