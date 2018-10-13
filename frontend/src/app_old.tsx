// import * as React from 'react';
// import * as ReactDOM from 'react-dom';
// import {Provider} from 'react-redux';
// import Image from './Components/Old/Image';
// import Footer from './Components/Footer';
// import 'bootstrap/dist/css/bootstrap.css';
// import configStore from './store/ConfigStore';
// import setwords from './actions/old/Setwords'
// import shuffle from './utils/shuffle';
// import Questionwindow  from './Components/Old/Questionmodal';
// const Loader = require("react-loader-spinner").default;

// import {Container, Row, Col} from 'reactstrap';
// import Resultmodal from './Components/Old/Resultmodal';
// import setCurrentWord from './actions/old/Setcurrentword';

// const store=configStore();


// class App extends React.Component <{words_in_state:string[], current_word?:string},{words_in_state:string[],current_word:string}> {
//     constructor(props: any) {
//         super(props);
//         this.state={
//             words_in_state:[],
//             current_word:""
//         }
//     }
//     async componentDidMount() {
//         const word = "horse";
//         const counter=6;
//         try {
//             const response = await fetch(`http://localhost:8080/findtrueimage/imageslist?word=${word}&counter=${counter}`);
//             if (!response.ok) {
//                 throw Error(response.statusText);
//             } else {
//                 await response.text().then(
//                     body=>{
//                         const res = body.split(";");
//                         console.log(res);
//                         store.dispatch(setwords({words:res}));
//                         this.setState({
//                             words_in_state:store.getState().words
//                         }
                            
//                         );
//                     }
//                     );
//             }
//         } catch (error) {
//             console.log(`Ошибка при получении списка слов: ${error}`);
//         }
//       }

//     render() {
//         const ELEMETNS_ON_PAGE=6;
//         const CURRENT_WORD:string=this.state.current_word;
//         store.dispatch(setCurrentWord({word:"CURRENT_WORD"}));
//         let position:number=0, images:string[]=[];
//         let listwords:string[]=this.state.words_in_state;
//         const unsubscribe = store.subscribe(()=>{
//             console.log(store.getState());
//         });
//         function buildTableOfImages (elements:Array<string>, pos:number): Array<any> {
//             console.log('create table')
//             const  rows = Array();
//             let counter=0;
//             while (counter<elements.length) {
//                 counter=counter+2;
//                 console.log(`counter is: ${counter}, element is ${elements[(counter-1)]}`);
//                 rows.push(
//                     <Row key={counter}>
//                         <Col>
//                             <Image word={elements[(counter-2)].replace(".jpg","").trim()} answer={pos==counter-2} />
//                         </Col>
//                         <Col>
//                             <Image word={elements[(counter-1)].replace(".jpg","").trim()}  answer={pos==counter-1}/>
//                         </Col>
//                     </Row>
//                 );
                
//             }
//             return rows;
//        }
//         if (listwords.length>0) {
//             shuffle(listwords);
//             position = listwords.indexOf(CURRENT_WORD);
//             images=buildTableOfImages(listwords, position);
//         };
        
//             return (
                
//                 <Provider store={store}>
//                 <div>
//                     <Resultmodal/>
//                     <Questionwindow modalIsOpen={CURRENT_WORD.length>0?true:false}/>
//                     {CURRENT_WORD.length==0?"true":"false"}
//                     <Footer />
//                     <Container>
//                     {images?images:<div style={{position: "absolute",left: "40%",top: "30%"}}><Loader type="Plane" color="green" height="100" width="100"/></div>}
//                         </Container>
//                 </div>
//                 </Provider>
//             );   
//     }
// }
// ReactDOM.render(
//     <App words_in_state={[]} />,
//     document.getElementById('App')
// );