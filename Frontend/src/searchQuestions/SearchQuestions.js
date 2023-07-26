import React, {useEffect, useState} from 'react';
import "../components/css/Feed.css";
import Post from '../components/Post';
import {Alert} from 'react-bootstrap';


function SearchQuestions(props) {
    const [questions, setQuestions] = useState([]);


    useEffect(() => {
        setQuestions(props.filterQuestionsPasstoSearchQ);

    }, [props.filterQuestionsPasstoSearchQ, questions]);


    return (<div className='feed-main'>
        {
        questions.length !== 0 ? (
            <h3 className='searchHeading'>Results for "{
                props.showSearchedKeyword
            }"</h3>
        ) : (
            <h3 className='searchHeading'>No Results found for "{
                props.showSearchedKeyword
            }"</h3>
        )
    }


        <div> {
            questions.reverse().map((question, index) => (
                <Post className="post"
                    key={index}
                    questionProp={
                        question['question']
                    }
                    questionId={
                        question['_id']
                    }
                    createdTime={
                        question['createdAt']
                    }
                    totalVotes={
                        question['upVots'] - question['downVots']
                    }
                    userId={
                        question['userId']
                    }/>
            ))
        } </div>
        {questions.length === 0 && <Alert key="success">We couldn't find any exact matches related to "{props.showSearchedKeyword}"</Alert>}
                  </div>

    );
    }

    export default SearchQuestions;
