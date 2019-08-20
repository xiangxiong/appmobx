import React from 'react';
import {observer,inject} from 'mobx-react';

const Fun = inject('TodoListStore','BirdStore')(observer((props) => {
    console.log('props',props);
    return (
        <div>
            {props.TodoListStore.firstTodo}
        </div>
    )
}));

export default Fun;