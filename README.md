### create-react-app 如何使用 decorators
*  import {observer} from 'mobx-react';
*  yarn add @babel/plugin-proposal-decorators
*  create-react-app 如何使用 decorators

### 4 通过 mobx 学习观察者模式
```
import {observable,autorun} from 'mobx';

class BirdStore{
    // object array map.
    @observable brids = [];
}

const store = window.store = new BirdStore();

export default store;

autorun(()=>{
    console.log(store.brids);
})
```

### #5 修复开发环境 - toJS 和 isObservableObject 如何使用.

### #6 调试工具 mobx-devtools 和 mobx-react-devtools

### #7 在组件中使用 @observer.
```
import {observable,autorun,toJS} from 'mobx';

class BirdStore{
    // object array map.
    @observable brids = ['sfdsa'];
}
const store = window.store = new BirdStore();

export default store;

autorun(()=>{
    console.log(store.brids);
});

<App store={BirdStore} />,
```

### #8 如何改变数据
```
  handleSubmit=(e)=>{
    e.preventDefault();
    const bird =  this.bird.value;
    console.log(bird);
    this.props.store.brids.push('xxxx');
    console.log(this.props.store.brids.length);
  }
```

### #9 如何使用 action 来改变数据

```
class BirdStore{
    // object array map.
    @observable brids;

    constructor(){
        this.brids = ['dddd'];
    }

    @action addBird = (bird) => {
        this.brids.unshift(bird);
    }
}

const store = window.store = new BirdStore();

export default store;

autorun(()=>{
    console.log(store.brids);
});
```

和 redux 不一样 不需要去返回一个新的对象.

### # 如何使用 computed 来返回数据
```
    // 只读.
    @computed get firstBird(){
        return "第一只鸟"+this.brids[0];
    }
    
    @computed get birdCount(){
        return this.brids.length;
    }

    <p>小小年纪{this.props.store.birdCount}</p>
```

### # #11 如何强制使用 action

```
import {configure} from 'mobx';

configure({ enforceActions:"observed"});
```

### # #12 如何组织 store 之最佳实践
```
import BirdStore from './/BirdStore';
import TodoListStore from './TodoListStore';

export default {
    BirdStore,
    TodoListStore
}

如何将store 进行合并.

import stores from './stores/';

ReactDOM.render(<App {...stores} />, document.getElementById('root'));
```

### #13 解决 computed 获得数据的一个常见的 "坑"
```
   // 只读.
    @computed get firstBird(){
        return "第一只鸟" + toJS(this.brids)[0];
    }
```

### #14 深入理解 MobX 的数据 render 问题
```

封装成 computed 方法的时候才会 render.

```


#15 深入理解 MobX 的 Provider 和 inject（注入）
```
@inject('BirdStore')
@observer

<Provider  {...stores}>
    <App/>
</Provider>
```

#16 inject 的那些 "坑"

```
注入多个store.

@inject('BirdStore','TodoListStore')
@observer

```

#17 使用 recompose 来组合 inject 和 observers

```

inject('BirdStore','TodoListStore')(observer(App));

```

#18 extendObservable 如何用
```
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
}
```
## #19 在 class component 中使用 mbox 实现 todolist（二更）
```
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
```

### #20 开始使用异步
```
  @action
    loadTopics(){
        fetch("http://yapi.demo.qunar.com/mock/65279/api/v1/product/owner")
        .then(response=>response.json())
        .then(data=>{
            this.saveTopics(data.content[0]['projectName']);
            // this.topics = data;
            console.log('data',data);
        })
    }

    @action
    saveTopics(data){
        this.topics = data
    }

 <div>
                Topic
                <button onClick={()=>{
                    this.props.TopicStore.loadTopics()
                }}>Get Topic</button>
                <p>
                {
                    this.props.TopicStore.topics && this.props.TopicStore.topics
                }
                </p>
 </div>
```

#21 三种不同的异步方式（二更）
```

```

#22 再说异步
```
   loadTopicInLine(){
        fetch("http://yapi.demo.qunar.com/mock/65279/api/v1/product/owner")
        .then(response=>response.json())
        .then(data=>{
            runInAction(()=>{
                this.saveTopics(data.content[0]['projectName']);
            })
            // this.topics = data;
            console.log('data',data);
        })
    }

    // 第三种方式
    loadTopicsAsync = async () =>{
        const response = await fetch("http://yapi.demo.qunar.com/mock/65279/api/v1/product/owner")
        const json = await response.json;
        runInAction(()=>{
            this.topics = json.data;
        })
    }

    // 第四种方法.
    loadTopicGennerator = flow(function*(){
        const response = yield fetch("http://yapi.demo.qunar.com/mock/65279/api/v1/product/owner");
        const json = yield response.json();
        this.topics = json.data;
    })
```

#23 异步 - 错误处理（二更）
```
     try{
            const response = yield fetch("http://eeeyapi.demo.qunar.com/mock/65279/api/v1/product/owner");
            const json = yield response.json();
            this.topics = json.content[0]['projectName'];
            this.loading = false;
        }
        catch(err){
            console.dir(err.message);
            this.error = err.message;
        }

    const store = this.props.TopicStore;
        let data;
        if(store.error){
            data = store.error
        }
        else if(store.loading){
            data = "loading";
        }else{
            data = store.topics ;
     }

```

### # 调试工具、action.bound、reaction、when（下节开始实战部分).

### #25 项目实战 - 创建好页面和组

```

```

 