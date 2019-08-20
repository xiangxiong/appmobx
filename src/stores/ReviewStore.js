import {decorate,observable,computed,action} from 'mobx';

class ReviewStore{
    reviewList = [
        {review:"This is a nice article",stars:2},
        {review:"A lovely review",stars:4}
    ];

    addReview(e){
        this.reviewList.push(e);
    }

    get reviewCount(){
        return this.reviewList.length;
    }
}

decorate(ReviewStore,{
    reviewList:observable,
    addReview:action,
    reviewCount:computed
})


export default new ReviewStore();