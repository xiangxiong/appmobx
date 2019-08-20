import React from 'react';
import logo from './logo.svg';
import './App.css';
import {observer,inject} from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import {configure} from 'mobx';
import TodoList from './components/TodoList';
import Topic from './components/Topic';
import ReviewApp from './components/ReviewApp';

configure({ enforceActions:"observed"});
class App extends React.Component{

  handleSubmit=(e)=>{
    e.preventDefault();
    const bird = this.bird.value;
    console.log('this.props',this.props);
    // this.props.store.brids.push('xxxx');
    this.props.BirdStore.addBird(bird);
    console.log(this.props.BirdStore.brids.length);
  }

  store = () =>{
    return this.props.BirdStore
  }

  render(){
    return (
      <div className="container">
        <ReviewApp/>
        <DevTools/>
        <header className="App-header">
          {/* <Fun/> */}
          <Topic/>
          <TodoList/>
          <p> firstBird:{this.props.BirdStore.firstBird} </p>
          {/* <p> birdCount:{this.props.BirdStore.birdCount} </p> */}
          <form onSubmit={e=>this.handleSubmit(e)}>
            <input type="text" placeholder="Enter your bird name" ref={input => this.bird = input} />
            <button> Add Bird </button>
          </form>
        </header>
      </div>
    )
  }
}

export default inject('BirdStore','TodoListStore')(observer(App));
