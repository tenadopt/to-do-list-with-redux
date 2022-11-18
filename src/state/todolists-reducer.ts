import {FilterButtonType, TodolistsType} from "../AppWithRedux";
import {v1} from "uuid";

const initialState: Array<TodolistsType> = []

export const todolistsReducer = (state = initialState, action: ActionsType): Array<TodolistsType>  => {
    switch (action.type) {

        case 'ADD-TODOLIST': {
            let newTodolistId = action.payload.toDoListID;
            let newTodolist: TodolistsType = {id: newTodolistId, title: action.payload.title, filter: 'All'}

            return [...state, newTodolist]
        }

        case 'REMOVE-TODOLIST': {
            return state.filter(el => el.id !== action.payload.id)
        }

        case
        'CHANGE-TODOLIST-TITLE': {
            return state.map(el => el.id === action.payload.id ? {...el, title: action.payload.title} : el)
        }

        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(el => el.id === action.payload.id ? {...el, filter: action.payload.filter} : el)



        }

        default:
            return state
    }
}

type ActionsType = AddToDoListACType | RemoveToDoListACType | ChangeToDoListTitleACType | ChangeToDoListFilterACType;

export type AddToDoListACType = ReturnType<typeof addToDoListsAC>

export const addToDoListsAC = (newTodolistTitle: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            title: newTodolistTitle,
            toDoListID: v1()
        }
    } as const
}

export type RemoveToDoListACType = ReturnType<typeof removeTodolistAC>

export const removeTodolistAC = (toDoListsID: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            id: toDoListsID
        }
    } as const
}

type ChangeToDoListTitleACType = ReturnType<typeof changeTodolistTitleAC>

export const changeTodolistTitleAC = (todolistId2: string, newTodolistTitle: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            id: todolistId2,
            title: newTodolistTitle
        }
    } as const
}

type ChangeToDoListFilterACType = ReturnType<typeof changeTodolistFilterAC>

export const changeTodolistFilterAC = (todolistId: string, newFilter: FilterButtonType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            id: todolistId,
            filter: newFilter
        }
    } as const
}