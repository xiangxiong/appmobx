import React,{Component} from 'react';
import { inject, observer } from 'mobx-react';

@inject("TopicStore")
@observer
class Topic extends Component{
    componentDidMount(){
        this.props.TopicStore.loadTopicGennerator()
    }

    render(){
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
        
        return (
            <div>
                Topic
                <button onClick={()=>{
                    this.props.TopicStore.loadTopicGennerator()
                }}>Get Topic</button>
                <p>
                    {data}
                {/* {
                    this.props.TopicStore.topics && this.props.TopicStore.topics
                } */}
                </p>
            </div>
        )
    }
}

export default Topic;