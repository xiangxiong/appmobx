import {observable,action,runInAction, flow} from 'mobx';

class TopicStore{
    @observable topics = [];
    @observable loading = true;
    @observable error;

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
            this.topics = json.content[0]['projectName'];
        })
    }

    // 第四种方法.
    loadTopicGennerator = flow(function*(){
        runInAction(()=>{
            this.loading = true;
            this.error = null;
        });
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
    })

    @action
    saveTopics(data){
        this.topics = data;
        this.loading = false;
    }
}

export default new TopicStore();