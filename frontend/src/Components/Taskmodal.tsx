import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux'
import Showtask from '../actions/Showtask'
import { Container, Row, Col } from 'reactstrap/';
import Task from './images/Task';
import Setword from '../actions/Setword'
import Nextstep from '../actions/Nextstep';
import Setwords from '../actions/Setwords';
import shuffle from '../utils/shuffle';

Modal.setAppElement('#App');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    // color: 'blue',
    // width: '50%',
    // height: '50%'
  }

};

class Taskmodal extends React.Component<Props, { modalIsOpen: boolean, error:boolean }> {
  constructor(props: any) {
    console.log(props.modalIsOpen);
    super(props);

    this.state = {
      modalIsOpen: this.props.step == "SHOW_TASK",
      error:false
    };

    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    // this.getWord = this.getWord.bind(this);
  }
//   async getWord() {

//     //получаем слово
//     let get_word = false;
//     try {

//       const response = await fetch(`http://localhost:8080/findtrueimage/dictionary?id=${this.props.dict_id}&get=false`);
//       if (!response.ok) {
//         throw Error(response.statusText);
//       } else {
//         await response.text().then(
//           body => {
//             this.props.Setword(body);
//             get_word = true;
//           }

//         );
//       }
//     } catch (error) {
//       console.log(`Ошибка при получении списка слов: ${error}`);
//     }
//     if (get_word) {
//     try {
//       const response = await fetch(`http://localhost:8080/findtrueimage/imageslist?word=${this.props.word}&counter=${this.props.image_counter}`);
//       if (!response.ok) {
//         throw Error(response.statusText);
//       } else {
//         await response.text().then(
//           body => {
//             const res = body.split(";");
//             this.props.Setwords(shuffle(res));
//           }
//         );
//       }
//     } catch (error) {
//       console.log(`Ошибка при получении списка слов: ${error}`);
//     }
//   }
// }

  async afterOpenModal() {
    let get_word = false;
    try {

      const response = await fetch(`/findtrueimage/dictionary?id=${this.props.dict_id}&get=false`);
      if (!response.ok) {
        throw Error(response.statusText);
      } else {
        await response.text().then(
          body => {
            this.props.Setword(body);
            get_word = true;
          }

        );
      }
    } catch (error) {
      console.log(`Ошибка при получении списка слов: ${error}`);
    }
    if (get_word) {
    try {
      const response = await fetch(`/findtrueimage/imageslist?word=${this.props.word}&counter=${this.props.image_counter}`);
      if (!response.ok) {
        throw Error(response.statusText);
      } else {
        await response.text().then(
          body => {
            const res = body.split(";");
            this.props.Setwords(shuffle(res));
            this.setState({error:false});
          }
        );
      }
    } catch (error) {
      console.log(`Ошибка при получении списка слов: ${error}`);
      this.setState({error:true});
    }
  }
  }

  closeModal() {
    this.props.Nextstep("SHOW_IMAGES");
  }

  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.step == "SHOW_TASK"}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
          shouldCloseOnOverlayClick={false}
        >
          <Container>
            <Row>
              <Col>
                <Task />
                <br />
              </Col>
            </Row>
            <Row>
              <Col sm="12" md={{ size: 8, offset: 4 }}>
                <h2><u>{this.props.word}</u></h2>
                <br />
              </Col>
            </Row>
            <Row>
              <Col>
                {/* <button onClick={this.getWord}>Подобрать</button> */}
              </Col>
            </Row>

            <Row>
              <Col>
                <br />
                {!this.state.error && <button onClick={this.closeModal}>Начать</button>}
                {this.state.error && <div>Ошибка получения слова.<br/> Возможно словарь пуст!</div>}
              </Col>
            </Row>
          </Container>
        </Modal>
      </div>
    );
  }
}


interface DispatchProps {
  Setword: typeof Setword,
  Nextstep: typeof Nextstep,
  Setwords: typeof Setwords
}
interface Props extends DispatchProps {
  modalIsOpen: boolean,
  word: string,
  dict_id: string,
  step: string,
  image_counter:number
}
const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  ...bindActionCreators({ Nextstep, Setword,Setwords }, dispatch),
});
const mapStateToProps = (state: any) => {
  //подключаем стор к пропсам если нужно пробросить пропс напрямую - возвращаем пустой объект
  return {
    step: state.step,
    word: state.word,
    dict_id: state.dict_id,
    image_counter:state.image_counter
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Taskmodal);
