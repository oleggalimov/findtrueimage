import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux'
import Showtask from '../actions/Showtask'
import { Container, Row, Col } from 'reactstrap/';
import Image from './Image'
import shuffle from '../utils/shuffle';
const Loader = require("react-loader-spinner").default;

Modal.setAppElement('#App');


class Mainwindow extends React.Component<Props> {
    constructor(props: any) {
        super(props);
    }
    //https://medium.com/@admin_86118/react-re-render-child-components-on-parent-state-change-387720c3cff8
    // async componentWillReceiveProps(newProps:any) {
    //     try {
    //         const response = await fetch(`http://localhost:8080/findtrueimage/imageslist?word=${this.state.word}&counter=${this.props.image_counter}`);
    //         if (!response.ok) {
    //             throw Error(response.statusText);
    //         } else {
    //             await response.text().then(
    //                 body => {
    //                     const res = body.split(";");
    //                     this.setState({
    //                         mock_words: res
    //                     });
    //                 }
    //             );
    //         }
    //     } catch (error) {
    //         console.log(`Ошибка при получении списка слов: ${error}`);
    //     }
    //   }
    render() {
        function buildTableOfImages(elements: Array<string>, pos: number): Array<any> {
            const rows = Array();
            let counter = 0;
            while (counter < elements.length) {
                counter = counter + 2;
                rows.push(
                    <Row key={counter}>
                        <Col>
                            <Image word={elements[(counter - 2)].replace(".jpg", "").trim()} answer={pos == counter - 2} />
                        </Col>
                        <Col>
                            <Image word={elements[(counter - 1)].replace(".jpg", "").trim()} answer={pos == counter - 1} />
                        </Col>
                    </Row>
                );
            }
            return rows;
        }
        if (this.props.step == "SHOW_IMAGES") {
            console.log('Render main window');
            let position: number = 0, images: string[] = [];
            let listwords = this.props.words;


            if (listwords.length > 0) {
                position = listwords.indexOf(this.props.word);
                images = buildTableOfImages(listwords, position);
            };
            return (
                <div>
                    <Container>
                        {images ? images : <div style={{ position: "absolute", left: "40%", top: "30%" }}>
                            <Loader type="Plane" color="green" height="100" width="100" /></div>}
                    </Container>
                </div>
            );
        } else {
            return (
                <div>
                    <Container>
                        <div style={{ position: "absolute", left: "40%", top: "10%" }}>
                            <Loader type="Plane" color="green" height="100" width="100" /></div>
                    </Container>
                </div>
            );
        }

    }
}


interface DispatchProps {
    Showtask: typeof Showtask;
}
interface Props extends DispatchProps {
    words: string[],
    image_counter: number,
    word: string,
    step: String

}
const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    ...bindActionCreators({ Showtask }, dispatch),
});
const mapStateToProps = (state: any) => {
    //подключаем стор к пропсам если нужно пробросить пропс напрямую - возвращаем пустой объект
    return {
        words: state.words,
        image_counter: state.image_counter,
        word: state.word,
        step: state.step
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Mainwindow);