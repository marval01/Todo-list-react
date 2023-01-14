import React from "react";
import { useLocalStorege } from "./useLocalStorage";

const TodoContext = React.createContext();

function TodoProvider(props){
    //Custom hook de localStorage
    const {
        item: todos,
        saveItem: saveTodos,
        loading,
        error
    } = useLocalStorege('TODOS_V1', []);

    //Estado para nuestro modal
    const [openModal, setOpenModal] = React.useState(false);

    //Estado de nuestra busquedad
    const [searchValue, setSearchValue] = React.useState('');

    //Cantidad de TODOs completados
    const completedTodos =  todos.filter(todo => !!todo.completed).length;
    //Cantidad total de TODOs 
    const totalTodos = todos.length;

    let searchedTodos = [];

    if (!searchValue.length >= 1){
        searchedTodos = todos;
    }else{
        searchedTodos = todos.filter(todo => {
            const todoText = todo.text.toLowerCase();
            const searchText = searchValue.toLowerCase();
            return todoText.includes(searchText);
        })
    }

    const addTodo = (text) => {
        const newTodos = [...todos];
        newTodos.push({
            completed: false,
            text,
        });
        saveTodos(newTodos);
    };

    const completeTodo = (text)=>{
        const todoIndex = todos.findIndex(todo => todo.text === text);
        const newTodos = [...todos];
        newTodos[todoIndex].completed = true;
        saveTodos(newTodos);
    }

    const deleteTodo = (text)=>{
        const todoIndex = todos.findIndex(todo => todo.text === text);
        const newTodos = [...todos];
        newTodos.splice(todoIndex, 1);
        saveTodos(newTodos);
    }

    return (
        <TodoContext.Provider value={{
            loading,
            error,
            totalTodos,
            completedTodos,
            searchValue,
            setSearchValue,
            searchedTodos,
            addTodo,
            completeTodo,
            deleteTodo,
            openModal,
            setOpenModal,
        }}>
            {props.children}
        </TodoContext.Provider>
    )
}

export {TodoContext, TodoProvider};