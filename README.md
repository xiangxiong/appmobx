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

```


