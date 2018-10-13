export const set_word_reducer= (
    state: string|null=null, 
    action: any
    ) => {
    switch (action.type) {
        case "SET_WORD":return action.word;
        default: return state;
    }
}