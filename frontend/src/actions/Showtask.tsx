const Showtask = (show:boolean=true) => {
    return {
        type:"SHOW_TASK",
        show:show
    }
}
export default Showtask;