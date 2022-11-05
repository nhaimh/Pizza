import { ALL_COMMENTS_SUCCESS, CREATE_COMMENT, DELETE_COMMENT, EDIT_COMMENT, COMMENTS_ERROR, LOADING_COMMENTS } from '../types/actionTypes'

const initialState = {
    data: [],
    error: null,
    isLoading: false
}

export const feedbackReducer = (state = initialState, action) => {
    switch (action.type) {
        case ALL_COMMENTS_SUCCESS:

            return {
                ...state,
                data: action.payload,
                isLoading: false

            };
        case CREATE_COMMENT:

            const arr = [...state.data, action.payload];
            const sortedComments = arr.sort((a, b) => new Date(b.date) - new Date(a.date));

            return {
                ...state,
                data: sortedComments,
                isLoading: false,
                error: null
            }

        case DELETE_COMMENT:
            return {
                ...state,
                data: state.data.filter(comment => comment._id !== action.payload),
                error: null
            }
        case EDIT_COMMENT:
            let newArr = state.data.map(comment => comment._id === action.payload._id ? action.payload : comment)
            return {
                ...state,
                data: newArr,
                error: null
            }
        case COMMENTS_ERROR:
            return {
                ...state,
                error: action.error,
                isLoading: false
            };
        case LOADING_COMMENTS:
            return {
                ...state,
                isLoading: true,
                error: null
            };
        default: return state
    }
}