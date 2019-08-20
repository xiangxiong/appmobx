import React from 'react';
import {action} from 'mobx';
import {observer} from 'mobx-react';

const Todo = observer(({todo}) => {
    return (
        <li>
            <input 
            type="checkbox"
            checked={todo.finished}
            onChange={action(()=>{
                todo.finished = !todo.finished
            })}/>
            {todo.title}
        </li>
    )
})

export default Todo;