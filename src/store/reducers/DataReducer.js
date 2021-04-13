const initialState = {
};

function DataReducer(state = initialState, action) {
    switch (action.type) {
        case "CASE_IDENTIFIER":
            return {
                ...state,
                value: action.value
            };

        default:
            return state;
    }
}

export default DataReducer;