export const Result_reducer=(state:boolean|null=null, action:any)=>{
    switch(action.type) {
        case "SET_RESULT" : return action.result;
        default : return state
    }
};