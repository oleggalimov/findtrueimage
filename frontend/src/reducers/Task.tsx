export const set_modal_visible= (
    state: boolean=false, 
    action: any
    ) => {
    switch (action.type) {
        case "SHOW_TASK":return action.show;
        default: return state;
    }
}