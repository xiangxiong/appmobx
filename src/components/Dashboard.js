import React,{Component} from 'react';
import {inject,observer} from 'mobx-react'

function Dashboard(){
    return (
        <div className="dashboardSection">
            <div className="row">
                <div className="col-md-6 col-xs-6">
                    <div className="card text-white bg-primary mb-6">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6 col-sm-6">
                                    <i className="fa fa-comments fa-5x"></i>
                                </div>
                                <div className="col-md-6 col-sm-6 text-right">
                                    <p id="reviewCount">{
                                        this.props.ReviewStore.reviewCount
                                    }</p>
                                    <p className="announcement-text">Reviews</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-6 col-xs-6">
                    <div className="card text-white bg-primary mb-6">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6 col-sm-6">
                                    <i className="fa fa-comments fa-5x"></i>
                                </div>
                                <div className="col-md-6 col-sm-6 text-right">
                                    <p id="argeeCounts">1</p>
                                    <p className="announcement-text">Reviews</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default inject("ReviewStore")(observer(Dashboard));