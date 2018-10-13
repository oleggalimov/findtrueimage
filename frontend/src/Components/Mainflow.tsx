import React from "react";
import { Provider } from "react-redux";
import Identificationmodal from "./Identificationmodal";
import Taskmodal from "./Taskmodal";
import Mainwindow from "./Mainwindow";
import Result from "./Result";

export default class Mainflow extends React.Component<{store:any},{}> {

    render() {
        // setTimeout(() => {
        //     store.dispatch(Setword("jellyfish"));
        // }, 5000);
        return (
                <Provider store={this.props.store}>
                    <div>
                        {/* <button onClick={this.show}>Показать задание</button> */}
                        <Identificationmodal />
                        {/* {this.state.show_task?<div>Show</div>:<div>NOtShow</div>} */}
                        <Taskmodal />
                        {<Mainwindow />}
                        <Result />
                    </div>
                </Provider>

        );
    };
}