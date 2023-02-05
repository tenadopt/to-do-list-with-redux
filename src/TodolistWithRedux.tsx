import React, {ChangeEvent, FC} from 'react';
import {TaskType, TodolistsType} from "./AppWithRedux";
import IconButton from "@mui/material/IconButton/IconButton";
import {Delete} from "@mui/icons-material";
import {Checkbox} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./state/todolists-reducer";
import {EditableSpan} from "./components/EditableSpan";
import {ButtonUniv} from "./components/ButtonUniv";
import {Input} from "./components/Input";

export type TodolistWithReduxPropsType = {
    todolist: TodolistsType
}

export const TodolistWithRedux: FC<TodolistWithReduxPropsType> = ({todolist}) => {
    const {id, title, filter} = todolist

    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[id])
    console.log("tasks", tasks)

    const dispatch = useDispatch()

    const addTaskHandler = (title: string) => {
        dispatch(addTaskAC(id, title))
    }

    const removeTodolist = () => {
        dispatch(removeTodolistAC(id))
    }

    const changeTodolistTitle = (title: string) => {
        dispatch(changeTodolistTitleAC(id, title))
    }


    let tasksForToDolist = tasks

    if (filter === 'Active') {
        tasksForToDolist = tasks.filter(el => !el.isDone)
    }

    if (filter === 'Completed') {
        tasksForToDolist = tasks.filter(el => el.isDone)
    }


    const onAllClickHandler = () => dispatch(changeTodolistFilterAC(id, "All"))
    const onActiveClickHandler = () => dispatch(changeTodolistFilterAC(id, "Active"))
    const onCompletedClickHandler = () => dispatch(changeTodolistFilterAC(id, "Completed"))


    return <div>
        <h3><EditableSpan editableTitle={title} callBack={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <Input callBack={addTaskHandler}/>
        <div>
            {tasksForToDolist.map(t => {
                const onClickHandler = () => dispatch(removeTaskAC(id, t.id))
                const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    let newIsDoneValue = e.currentTarget.checked;
                    dispatch(changeTaskStatusAC(id, t.id, newIsDoneValue))
                }
                const onTitleChangeHandler = (newValue: string) => {
                    dispatch(changeTaskTitleAC(id, t.id, newValue))
                }

                return <div key={t.id} className={t.isDone ? "is-done" : ""}>
                    <Checkbox checked={t.isDone} color="primary" onChange={onChangeHandler}
                    />
                    <EditableSpan editableTitle={t.title} callBack={onTitleChangeHandler}/>
                    <IconButton onClick={onClickHandler}>
                        <Delete/>
                    </IconButton>
                </div>
            })
            }
        </div>
        <div>
            <ButtonUniv filter={filter} name="All" callBack={onAllClickHandler} color={"success"}/>
            <ButtonUniv filter={filter} name="Active" callBack={onActiveClickHandler} color={"secondary"}/>
            <ButtonUniv filter={filter} name="Completed" callBack={onCompletedClickHandler} color={"inherit"}/>
        </div>
    </div>
}

// const mapTasks = props.tasks.map(el => {
//
//         const changeTaskHandler = (id: string, currentTitle: string) => {
//             props.changeTask(props.toDoListsID, el.id, currentTitle)
//         }
//
//         return (
//             <li key={el.id} className={el.isDone ? styles.isDone : ''}>
//                 <CheckBox checked={el.isDone}
//                           callback={(isDone) => changeCheckBoxStatusHandler(props.toDoListsID, el.id, isDone)}/>
//                 <EditableSpan editableTitle={el.title} callBack={(newTitle) => changeTaskHandler(el.id, newTitle)}/>
//                 <IconButton aria-label="delete" onClick={() => removeTaskHandler(el.id, el.id)}>
//                     <Delete/>
//                 </IconButton>
//             </li>
//         )
//     })
//
//
//     const changeToDoListHandler = (currentToDoListTitle: string) => {
//         return (
//             props.changeToDoList(props.toDoListsID, currentToDoListTitle)
//         )
//     }
//
//
//     return (
//
//         <div>
//             <h3><EditableSpan editableTitle={props.title} callBack={changeToDoListHandler}/>
//                 <button onClick={() => removeToDoListHandler()}>X</button>
//                 <IconButton aria-label="delete" onClick={() => removeToDoListHandler()}>
//                     <Delete/>
//                 </IconButton>
//             </h3>
//             <Input callBack={addTaskHandler}/>
//             <ul>
//                 {mapTasks}
//             </ul>
//             {/*<ButtonUniv colorActive={colorActive} name={'All'} color={"success"} callBack={() => {*/}
//             {/*    tsarChangeFilter(props.toDoListsID, 'All')*/}
//             {/*}}/>*/}
//             {/*<ButtonUniv colorActive={colorActive} name={'Active'} color={"secondary"} callBack={() => {*/}
//             {/*    tsarChangeFilter(props.toDoListsID, 'Active')*/}
//             {/*}}/>*/}
//             {/*<ButtonUniv colorActive={colorActive} name={'Completed'} color={"inherit"} callBack={() => {*/}
//             {/*    tsarChangeFilter(props.toDoListsID, 'Completed')*/}
//             {/*}}/>*/}
//         </div>
//     )
// }
