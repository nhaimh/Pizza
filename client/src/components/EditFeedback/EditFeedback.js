import "./EditFeedback.css";
import { editCommentAction } from "../../redux/actions/feedbackActions";
import { useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { connect } from "react-redux";

const EditFeedback = (props) => {

  const history = useNavigate();
  const { id } = useParams();
  console.log(id)

  const currentComment = props.comments.find(comment => comment._id === id);


  const onEditFeedbackHandler = (e) => {
    e.preventDefault();

    let formData = new FormData(e.currentTarget);
    let comment = formData.get('commentContent');

    const newComment = {
      ...currentComment,
      comment: comment
    }

    props.editCommentAction(currentComment._id, newComment, history)

  }

  if (currentComment) {
    return (
      <div className="editFeedback">
        <h2>Edit Comment</h2>
        <form onSubmit={onEditFeedbackHandler} id='formEditFeedback'>
          <textarea name='commentContent' id='textAreaStyle' defaultValue={currentComment.comment}></textarea>
          <button type="submit" id='submitBtnEditFeedback'>Send</button>
        </form>
      </div>
    )
  }

  return null

}

const mapStateToProps = (state) => {
  return {
    comments: state.feedback.data
  }
}

export default connect(mapStateToProps, { editCommentAction })(EditFeedback)