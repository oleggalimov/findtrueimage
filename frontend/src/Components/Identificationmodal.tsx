import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux'
import Setdict from '../actions/Setdict'
import { Container, Row, Col } from 'reactstrap/';
import Showtask from '../actions/Showtask';
import Imagecount from '../actions/Imagecount';
import Nextstep from '../actions/Nextstep';

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

class Identificationmodal extends React.Component<Props, StateProps> {
  constructor(props: any) {
    super(props);

    this.state = {
      modalIsOpen: this.props.step == "IDENTIFICATION" ? true : false,
      dictionary_id: "",
      not_found: false,
      count:0,
      emptyDict:false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.findDict = this.findDict.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    this.props.Setdict();
    // references are now sync'd and can be accessed.

  }

  async findDict() {
    if (this.state.count) {
      try {
        const response = await fetch(`/dictionary?id=${this.state.dictionary_id}&get=false`);
        if (!response.ok) {
          throw Error(response.statusText);
        } else {
          await response.text().then(
            body => {
              if (body != "fail" && body!="error") {
                if (body!="") {
                  this.setState({ modalIsOpen: false });
                  this.props.Setdict(this.state.dictionary_id);
                  this.props.Imagecount(this.state.count)
                  this.props.Nextstep("SHOW_TASK");
                } else {
                  this.setState({emptyDict:true});
                }
                
              } else {
                this.setState({ not_found: true });
              }
            }
          );
        }
      } catch (error) {
        console.log(`Ошибка при получении списка слов: ${error}`);
      }
    } else {

    }
    

  }

  inputHandler = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    switch (name){
      case 'id': {
        this.setState({ dictionary_id: value });
        this.setState({ not_found: false });
      }break;
      case 'imagecount': {
        parseInt(value)?this.setState({ count: value as number}):this.setState({ count: 0});
      }break;
      default:

    }
  }
  render() {
    return (
      <div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.findDict}
          style={customStyles}
          contentLabel="Main Modal"
          shouldCloseOnOverlayClick={false}
        >
          <Container>
            <Row>
              <Col>
                <h4>Введите идентификатор словаря</h4>
                <br />
              </Col>
            </Row>
            <Row>
              <Col>
                <input name='id' type="text" placeholder='123-456' onChange={this.inputHandler} />
                <br />
              </Col>
            </Row>
            <Row>
              <Col>
                <br />
                <button onClick={this.findDict}>Найти</button>
              </Col>
            </Row>
            <Row>
              <Col>
                <br />
                Количество изображений на странице:
                <select name='imagecount' onChange={this.inputHandler} size={1}>
                <option >
                    Выбрать
                  </option>
                  <option>
                    2
                  </option>
                  <option>
                    4
                  </option>
                  <option>
                    6
                  </option>
                  <option>
                    8
                  </option>
                </select>
              </Col>
            </Row>
            <Row>
              <Col>
                <br />
                {!this.state.count && 'Выберите количество изображений!'}<br/>
                {this.state.not_found && 'Словарь не найден!'}
                {this.state.emptyDict && 'Словарь пуст!'}
              </Col>
            </Row>
          </Container>


        </Modal>
      </div>
    );
  }
}

// const mapStateToProps=(state:any)=> {
//     return {
//         view:state.view
//     }
// }
// export default connect(mapStateToProps)(Image);

const mapStateToProps = (state: any) => ({ dict_id: state.dict_id,step:state.step });

interface DispatchProps {
  Setdict: typeof Setdict,
  Imagecount: typeof Imagecount,
  Nextstep:typeof Nextstep
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  ...bindActionCreators({ Setdict,Imagecount,Nextstep }, dispatch),
});

interface Props extends StateProps, DispatchProps {
  dict_id: string,
  step:string,
}
interface StateProps {
  count:number
  modalIsOpen: boolean,
  dictionary_id: string,
  not_found: boolean,
  emptyDict:boolean
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Identificationmodal);
