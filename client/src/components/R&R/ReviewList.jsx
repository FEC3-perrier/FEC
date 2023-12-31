import React, { useState, useEffect } from 'react';
import Review from './Review.jsx';
import Review_Modal from './Review_Modal.jsx'
import { getReviewsById,getMetaReviews,postReview } from '../../../fetch.jsx';

const ReviewList = ( {id,reviews,view,sV,meta,refresh} ) => {
  const [ list,setList ] = useState([]);
  const [ len,setLen ] = useState(2);
  const [ search,setSearch ] = useState('');
  const [ searching, sets ] = useState(false);
  const [ showAll, setShow ] = useState(true);

  useEffect(() => {
    if (reviews.length > 0) {
      var arr = [];
      for (var i = 0; i < len; i++) {
        if (reviews[i]) {
          arr.push(reviews[i]);
        } else {
          break;
        }
      }
      setList(arr)
    }
  },[reviews,len]);

  const handleClick = (e) => {
    e.preventDefault();
    setLen(reviews.length);
    setShow(false);
  }
  const handleCollapse = (e) => {
    e.preventDefault();
    setLen(2);
    setShow(true);
  }
  const handleModal = (e) => {
    e.preventDefault();
    sV(true);
  }
  const handleExit = (e) => {
    e.preventDefault();
    sV(false);
  }
  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
    if (e.target.value.length >= 3) {
      console.log(list)
      console.log(e.target.value)
      var arr = [];
      list.map((review) => {
        if (review.summary.toLowerCase().includes(e.target.value.toLowerCase()) || review.body.toLowerCase().includes(e.target.value.toLowerCase())) {
          arr.push(review);
          // console.log(review.body.toLowerCase().indexOf(e.target.value.toLowerCase()))
        }
      })
      setList(arr);
      setShow(false);
    } else {
      var arr = [];
      for (var i = 0; i < len; i++) {
        arr.push(reviews[i])
      }
      setList(arr);
      setShow(true);
    }
  }

  return (
    <div>
      <div style={{display:'flex', alignItems:'center', marginBottom: '10px'}}>
        <label style={{padding:'0px', marginRight:'10px'}}>Search: </label>
        <input type='search' value={search} onChange={handleSearch}></input>
      </div>
      <div id='rlistMap'>
        {(reviews.length === 0) ? (<div>No Reviews Yet...</div>) : list.map((review) => {
          return (<Review key={review.review_id} review={review}/>)
        })}
      </div>
      <div id='rbutton-cont' style={{paddingBottom: '20px'}}>
          {showAll ? ((reviews.length > 2) ?
            (<button onClick={handleClick}>SHOW ALL REVIEWS</button>) :
            (<></>)):
            (<button onClick={handleCollapse}>COLLAPSE REVIEWS</button>)
          }
          <button onClick={handleModal}>ADD A REVIEW   <span style={{fontSize:'18px'}}>+</span></button>
          {
            view ? (
              <div>
                <Review_Modal view={view} id={id} sV={sV} meta={meta} refresh={refresh}/>
                <div onClick={handleExit} className='blur'></div>
              </div>) : <></>
          }
        </div>
    </div>
  )
};

export default ReviewList;
