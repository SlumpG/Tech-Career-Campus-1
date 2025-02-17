import {  SET_USER} from '../actions/types'
function userReducer(state = {}, action) {
    switch (action.type) {
            case SET_USER:
                return {
                    ...state, ...action.payload
                }
        default:
            return state;
    }
}

export default userReducer;
