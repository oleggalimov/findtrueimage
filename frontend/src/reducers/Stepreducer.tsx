export const step_reducer=(
    state:string="IDENTIFICATION",
    action:any
)=>{
    switch(action.type) {
        case "SET_STEP" : return action.step;
        default: return state
    }
    
}