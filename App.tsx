
import React, { useState, useEffect, useCallback } from 'react';
import { Todo } from './types';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');

  // Load from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem('zen-todo-data');
    if (saved) {
      try {
        setTodos(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved todos", e);
      }
    }
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    localStorage.setItem('zen-todo-data', JSON.stringify(todos));
  }, [todos]);

  const addTodo = useCallback(() => {
    if (!inputValue.trim()) return;
    const newTodo: Todo = {
      id: Math.random().toString(36).substring(2, 9),
      text: inputValue.trim(),
      completed: false,
      createdAt: Date.now(),
    };
    setTodos(prev => [newTodo, ...prev]);
    setInputValue('');
  }, [inputValue]);

  const toggleTodo = useCallback((id: string) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  return (
    <div className="flex flex-col items-center px-4 py-12 md:py-24 max-w-2xl mx-auto min-h-screen selection:bg-indigo-100 dark:selection:bg-indigo-900/30">
      <header className="mb-12 text-center fade-in">
        <h1 className="text-4xl md:text-5xl font-extralight tracking-tight text-zinc-800 dark:text-zinc-100">
          Zen Todo
        </h1>
        <p className="text-zinc-400 dark:text-zinc-500 mt-3 font-light tracking-widest uppercase text-[10px]">
          Simplicity is the ultimate sophistication
        </p>
      </header>

      <main className="w-full space-y-8 fade-in" style={{ animationDelay: '0.1s' }}>
        {/* Input Section */}
        <div className="relative group w-full">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="此刻你想专注做什么？"
            className="w-full px-6 py-5 bg-white dark:bg-zinc-900 border border-transparent rounded-2xl shadow-sm focus:ring-1 focus:ring-zinc-300 dark:focus:ring-zinc-700 outline-none transition-all duration-500 text-lg placeholder:text-zinc-300 dark:placeholder:text-zinc-700"
          />
          <button
            onClick={addTodo}
            className="absolute right-3 top-3 bottom-3 px-6 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-xl font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors duration-200"
          >
            添加
          </button>
        </div>

        {/* List Section */}
        <div className="w-full space-y-4">
          {todos.length === 0 ? (
            <div className="text-center py-32 text-zinc-300 dark:text-zinc-800 italic font-light tracking-wide">
              心无杂念，万象皆空
            </div>
          ) : (
            todos.map((todo) => (
              <div
                key={todo.id}
                className="group flex items-center justify-between p-5 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-100/50 dark:border-zinc-800/50 hover:border-zinc-200 dark:hover:border-zinc-700 transition-all duration-300 animate-fadeIn"
              >
                <div className="flex items-center space-x-5 flex-1">
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-500 ${
                      todo.completed 
                        ? 'bg-zinc-900 border-zinc-900 dark:bg-zinc-100 dark:border-zinc-100' 
                        : 'border-zinc-200 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-500'
                    }`}
                  >
                    {todo.completed && (
                      <svg className="w-3.5 h-3.5 text-white dark:text-zinc-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                  <span
                    onClick={() => toggleTodo(todo.id)}
                    className={`text-lg cursor-pointer transition-all duration-500 ${
                      todo.completed 
                        ? 'text-zinc-300 dark:text-zinc-700 line-through decoration-zinc-300 dark:decoration-zinc-700' 
                        : 'text-zinc-700 dark:text-zinc-300'
                    }`}
                  >
                    {todo.text}
                  </span>
                </div>
                
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="p-2 text-zinc-200 hover:text-zinc-400 dark:text-zinc-800 dark:hover:text-zinc-600 md:opacity-0 group-hover:opacity-100 transition-all duration-300"
                  aria-label="删除任务"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>
      </main>

      <footer className="mt-auto py-12 text-center fade-in" style={{ animationDelay: '0.3s' }}>
        <p className="text-[11px] text-zinc-400 dark:text-zinc-600 font-light tracking-widest">
          版权：神思庭  WX｜ Shensi-ST
        </p>
      </footer>
    </div>
  );
};

export default App;
