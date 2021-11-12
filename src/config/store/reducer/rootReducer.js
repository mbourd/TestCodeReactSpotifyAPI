import { combineReducers } from "redux";
// import userReducer from "./userReducer";

const globalReducer = (state = {}, action) => {
    switch (action.type) {
        case "REPLACE_GLOBAL":
            return action.value;
            break;

        default:
            break;
    }

    return state;
}

export const rootReducer = combineReducers({
    // user: userReducer,
    global : globalReducer
})

export default rootReducer;
