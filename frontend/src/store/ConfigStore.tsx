import { createStore, combineReducers } from 'redux';
import { Dict_reducer } from '../reducers/Dicid';
import { set_word_reducer } from '../reducers/Word';
import { set_modal_visible } from '../reducers/Task';
import { imagecount_reducer } from '../reducers/Setimagecounter';
import { step_reducer } from '../reducers/Stepreducer';
import { Setwords_reducer } from '../reducers/Setwordsreducer';
import { Result_reducer } from '../reducers/Result';

export default ()=>{
    const store=createStore(
        combineReducers({
            words:Setwords_reducer,
            // word:set_current_word,
            // show_result:check_answer,
            // view:show_qw
            dict_id:Dict_reducer,
            word:set_word_reducer,
            image_counter: imagecount_reducer,
            step:step_reducer,
            result:Result_reducer
        }));
        return store;
} 