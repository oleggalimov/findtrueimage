export const Setwords_reducer=(
    state:string[]=[],
    action:any
)=>{
    switch(action.type) {
        case "SET_WORDS" : return action.words;
        default: return state
    }
}