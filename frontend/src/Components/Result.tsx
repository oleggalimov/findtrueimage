import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux'
import Setdict from '../actions/Setdict'
import { Container, Row, Col } from 'reactstrap/';
import Showtask from '../actions/Showtask';
import Imagecount from '../actions/Imagecount';
import Nextstep from '../actions/Nextstep';
import Showanswer from '../actions/Showanswer';
import Welldone from './images/welldone';
import Tryagain from './images/tryagain';

Modal.setAppElement('#App');

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        color: 'green',
        // width: '50%',
        // height: '50%'
    }
};

class Resultmodal extends React.Component<Props, StateProps> {
    constructor(props: any) {
        super(props);

        this.state = {
            modalIsOpen: this.props.result?true:false,
        };

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
    }

    openModal() {
        this.setState({ modalIsOpen: true });
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.

    }
    closeModal=(result:boolean)=>{
        console.log (`Кнопка ${result} `)
        this.props.Showanswer(null);
        if (result) {
            this.props.Nextstep('SHOW_TASK');
        }
    }
        


    render() {
        let res: boolean|null=null;
        if (this.props.result != null) {
            res = this.props.result;
        }

        return (
            <div>
                <Modal
                    isOpen={this.props.result==null?false:true}
                    onAfterOpen={this.afterOpenModal}
                    //   onRequestClose={this.findDict}
                    style={customStyles}
                    contentLabel="Main Modal"
                    shouldCloseOnOverlayClick={false}
                >
                <Row>
                    {res?<Welldone/>:<Tryagain/>}
                </Row>
                {
                    this.props.result?
                        <button onClick={()=>this.closeModal(true)}>Дальше!</button>
                        :
                        <button onClick={()=>this.closeModal(false)}>Попробовать еще раз!</button>
                
                }
                </Modal>
            </div>
        );
    }
}


const mapStateToProps = (state: any) => ({ result: state.result, step: state.step });

interface DispatchProps {
    Showanswer: typeof Showanswer,
    Nextstep: typeof Nextstep
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    ...bindActionCreators({ Showanswer, Nextstep }, dispatch),
});

interface Props extends StateProps, DispatchProps {
    result: boolean,
    step: string
}
interface StateProps {
    modalIsOpen: boolean

}

export default connect(mapStateToProps, mapDispatchToProps)(Resultmodal);
