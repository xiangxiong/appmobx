import React,{Component} from 'react';
import {extendObservable,action} from 'mobx';
import {observer,inject} from 'mobx-react';
import Todo from './Todo';

@inject('TodoListStore')
@observer
class TodoList extends Component{
    constructor(){
        super();
        extendObservable(this,{
            newTodoTile:"",
            handleInputChange:action((e)=>{
                this.newTodoTile = e.target.value
            })
        })
    }

    @action
    handleFormSubmit = e => {
        this.props.TodoListStore.addTodo(this.newTodoTile);
        console.log(this.props.TodoListStore.todos);
        e.preventDefault();
        this.newTodoTile = "";
    }

    render(){
        return (
            <div>
                <form onSubmit={this.handleFormSubmit}>
                    New Todo:
                    <input type="text"
                        value={this.newTodoTile}
                        onChange={this.handleInputChange}
                    />
                    <button type="submit">Add</button>
                </form>
                <br/>
                <ul>
                    {
                        this.props.TodoListStore.todos.map(todo=>(
                            <Todo todo={todo} key={todo}/>
                        ))
                    }
                </ul>
                Task Left:{
                    this.props.TodoListStore.unfinishedTodoCount
                }
            </div>
        )
    }
}

export default TodoList;