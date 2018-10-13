const Setword = (word_to_find:string|null=null) => {
    return {
        type:"SET_WORD",
        word:word_to_find
    }
}
export default Setword;