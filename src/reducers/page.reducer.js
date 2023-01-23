import { pageConstants } from "../actions/constants"

const initState = {
    error: null,
    laoding: false,
    page: {}
}

export default (state = initState, action) => {
    switch (action.type) {
        case pageConstants.CREATE_PAGE_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case pageConstants.CREATE_PAGE_SUCCESS:
            state = {
                ...state,
                loading: false
            }
            break;
        case pageConstants.CREATE_PAGE_FAILURE:
            state = {
                ...state,
                laoding: false,
                error: action.payload.error
            }
            break;
    }

    return state;
}