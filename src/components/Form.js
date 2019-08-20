import React,{Component} from 'react';
import {inject,observer} from 'mobx-react'; 
import {action} from 'mobx';

@inject('ReviewStore')
@observer
class Form extends Component{

    @action
    submitReview=(e)=>{
        e.preventDefault();
        const review = this.review.value;
        const stars = Number(this.stars.value);
        this.props.ReviewStore.addReview({
            review,
            stars
        });
    }
    
    render(){
        return (
            <div className="formSection">
                <div className="form-group">
                    <p>
                        Submit a New
                    </p>
                </div>
                <form onSubmit={this.submitReview}>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="form-group">
                                <input ref={
                                    node=>{
                                        this.review = node
                                    }
                                } type="text" placeholder="Write a review" className="form-control"/>     
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <select id="start" ref={node=>{
                                    this.stars = node
                                }} name="stars" className="form-control">
                                    <option value="1"> 1 star</option>
                                    <option value="2"> 2 star</option>
                                    <option value="3"> 3 star</option>
                                    <option value="4"> 4 star</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="form-group">
                                <button className="btn btn-success" type="submit">SUBMIT REVIEW</button>
                            </div>
                        </div>

                    </div>
                </form>
            </div>
        )
    }
}

export default Form;