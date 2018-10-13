export const Dict_reducer= (
    state: string|null=null, 
    action: any
    ) => {
    switch (action.type) {
        case "SET_DICT_ID":return action.dict_id;
        default: return state;
    }
}