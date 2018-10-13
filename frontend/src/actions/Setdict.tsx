const Setdictid = (id:string|null=null) => {
    return {
        type:"SET_DICT_ID",
        dict_id:id
    }
}
export default Setdictid;