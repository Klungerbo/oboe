export function doCase(value) {
    return function (dispatch) {
        dispatch({
            type: "CASE_IDENTIFIER",
            value: value 
        });
    };
}