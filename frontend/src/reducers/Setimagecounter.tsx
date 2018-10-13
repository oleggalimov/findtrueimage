export const imagecount_reducer=(
    state:string="",
    action:any
)=>{
    switch(action.type) {
        case "SET_COUNT_OF_WORDS" : return action.countimages;
        default: return state
    }
    
}