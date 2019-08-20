import {observable,autorun,computed,action,toJS} from 'mobx';

class BirdStore{
    // object array map.
    @observable brids;
    constructor(){
        this.brids = ['eee'];
    }
    // 修改.
    @action addBird = (bird) => {
        this.brids.unshift(bird);
    }
    // 只读.
    @computed get firstBird(){
        return "第一只鸟" + toJS(this.brids)[0];
    }
    @computed get birdCount(){
        return this.brids.length;
    }
}

const store = window.store = new BirdStore();

export default store;

autorun(()=>{
    console.log('print');
    console.log('birdstore',store.firstBird);
});
