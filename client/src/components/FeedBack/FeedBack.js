import './FeedBack.css';
import { getLocalStorage } from '../../services/storageService';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { getCommentsAction, createCommentAction, deleteCommentAction, editCommentAction } from '../../redux/actions/feedbackActions';


import Comment from './Comment/Comment';

const FeedBack = (props) => {

  let userInfo = getLocalStorage();

  useEffect(() => {
    props.getCommentsAction();
  }, [])

  const deleteCommentHandler = (commentId) => {
    props.deleteCommentAction(commentId)
  }

  const handleFeedback = (e) => {
    e.preventDefault()

    let formData = new FormData(e.currentTarget);
    let comment = formData.get('comment');
    let user = props.auth.username;
    let creator = props.auth.id;
    let date = new Date().toString().slice(0, 24);

    props.createCommentAction({ comment, user, creator, date })

  }

  return (
    <>
      {props.error && <div id='errorDiv'><p>{props.error}</p></div>}
      <div className='feedbackContent'>
        <h2>Feedback</h2>
        {userInfo?.username &&

          <form id='feedbackForm' method='POST' onSubmit={handleFeedback}>
            <textarea className='textarea' name='comment' placeholder="Are you happy with us? Type..." />
            <input type='submit' id='submitBtn' value="Comment" />
          </form>
        }

        <h3>Comments:</h3>

        {props.comments.length !== 0 ?
          (props.comments.map(commentData =>
            <Comment
              key={commentData._id}
              comment={commentData}
              deleteComment={deleteCommentHandler}
              role={props.auth?.role}
            />)
          ) : <p>Still don`t have comments...</p>
        }

      </div>
    </>

  )
}

const mapStateToProps = (state) => {
  return {
    comments: state.feedback.data,
    auth: state.auth.user,
    error: state.feedback.error
  }
}

export default connect(mapStateToProps, {
  getCommentsAction,
  createCommentAction,
  deleteCommentAction,
  editCommentAction
})(FeedBack);