import { ALL_COMMENTS_SUCCESS, CREATE_COMMENT, DELETE_COMMENT, EDIT_COMMENT, COMMENTS_ERROR, LOADING_COMMENTS } from '../types/actionTypes'

import { api } from '../../services/api';
import { getLocalStorage } from '../../services/storageService';


export const getCommentsAction = () => {
    return async dispatch => {

        try {

            dispatch(loadingComments())
            let comments = await api.get('/feedback')
            dispatch(getAllComments(comments))

        } catch (error) {
            dispatch(errorComments(error))
        }
    }
}

export const createCommentAction = (commentData) => {

    return async dispatch => {
        try {
            let comment = await api.post('/feedback', commentData, {

                'Authorization': 'Bearer ' + getLocalStorage()?.token,
                'Content-Type': 'application/json',
            })

            dispatch(createComment(comment))


        } catch (error) {
            dispatch(errorComments(error))
        }
    }
}

export const deleteCommentAction = (commentId) => {
    return async dispatch => {
        try {

            let deleted = await api.delete(`/feedback/${commentId}`)

            if (deleted.ok) {
                dispatch(deleteComment(commentId))
            }

        } catch (error) {
            dispatch(errorComments(error))
        }
    }
}

export const editCommentAction = (commentId, comment, history) => {

    return async dispatch => {
        try {
            let response = await api.put(`/feedback/${commentId}`, comment, {

                'Authorization': 'Bearer ' + getLocalStorage()?.token,
                'Content-Type': 'application/json',
            })

            if (response.ok) {
                let newComment = {
                    _id: commentId,
                    ...comment
                }

                dispatch(editComment(newComment))
                history(`/feedback`)
            }
        } catch (error) {
            dispatch(errorComments(error.message))
        }
    }
}

const loadingComments = () => {
    return {
        type: LOADING_COMMENTS
    }
}

const getAllComments = (comments) => {
    return {
        type: ALL_COMMENTS_SUCCESS,
        payload: comments
    }
}

const createComment = (comment) => {
    return {
        type: CREATE_COMMENT,
        payload: comment
    }
}

const deleteComment = (id) => {
    return {
        type: DELETE_COMMENT,
        payload: id
    }
}

const editComment = (comment) => {
    return {
        type: EDIT_COMMENT,
        payload: comment
    }
}

const errorComments = (error) => {
    return {
        type: COMMENTS_ERROR,
        error
    }
}