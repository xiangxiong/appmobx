import React,{Component} from 'react';
import Form from './Form';
import Dashboard from './Dashboard'
import Reviews from './Reviews';

class ReviewApp extends Component{
    render(){
        return (
            <div>
                <Form/>
                <Dashboard/>
                <Reviews/>
            </div>
        )
    }
}

export default ReviewApp;