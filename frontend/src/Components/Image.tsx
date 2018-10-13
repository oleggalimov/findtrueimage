import * as React from "react";
import axios from 'axios'
const Loader = require("react-loader-spinner").default
import {connect} from 'react-redux'
import {Dispatch, bindActionCreators} from 'redux'
import Showanswer from "../actions/Showanswer";

export class Image extends React.Component<Props, {loaded:boolean,  imageData:string }> {
    constructor(props: any) {
        super(props);
        this.state = {
            loaded: false,
            imageData: ""
        }
    }
    async componentDidMount() {
        try {
            let response = await axios(
                    `http://localhost:8080/findtrueimage/image?word=${this.props.word}`
                );
            this.setState(
                {
                    loaded: true,
                    imageData:response.data
                }
            );
        } catch (error) {
            console.log(error);
        }
        
    }
    
    onClickImage=()=>{
        
        // let url=`https://translate.google.com.vn/translate_tts?ie=UTF-8&q=${this.props.word}&tl=en&client=tw-ob`;
        let url=`http://localhost:8080/findtrueimage/audio?word=${this.props.word}`;
        let audio = new Audio(url);
        audio.play();
        this.props.Showanswer(this.props.answer);
    }
    render() {
        let image;
        let base64image = `data:image/jpeg;base64,${this.state.imageData}`;
        if (this.state.loaded) {
            image =<img src={base64image} height="200" width="300" onClick={this.onClickImage}/>
        } else {
            image = <Loader
                type="Plane"
                color="#00BFFF"
                height="100"
                width="100"
            />
        };
        return (
                image 
        );
    }
}

interface DispatchProps {
    Showanswer: typeof Showanswer;
}
interface Props extends DispatchProps {
    result: boolean,
    word: string,
    answer: boolean,

}
const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    ...bindActionCreators({ Showanswer }, dispatch),
});
const mapStateToProps = (state: any) => {
    //подключаем стор к пропсам если нужно пробросить пропс напрямую - возвращаем пустой объект
    return {
        // word: state.word,
        // answer: state.answer
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Image);