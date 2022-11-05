import * as storageService from '../../../services/storageService';
import { useNavigate } from 'react-router-dom';

const Comment = ({
    comment,
    deleteComment,
    role
}) => {

    let userName = storageService.getLocalStorage()?.username;
    let navigate = useNavigate();

    return (
        <div className='comments'>

            <div className='contentComments'>
                <h5 id='titleComment'>{comment.user}</h5>
                <p id='pComment'>{comment.comment}</p>
                <p id='dateComment'>{comment.date}</p>

                {userName &&
                    (userName == comment.user || role == 'admin') ?
                    <>
                        <button id='editbtn' onClick={() => navigate(`/feedback/edit/${comment._id}`)}>Edit</button>
                        <button id='deletebtn' onClick={() => deleteComment(comment._id)}>Delete</button>
                    </>
                    : ''
                }


            </div>
        </div>
    )
}

export default Comment;