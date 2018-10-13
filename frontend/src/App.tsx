import * as React from 'react';
import * as ReactDOM from 'react-dom';
import configStore from './store/ConfigStore';
import 'bootstrap/dist/css/bootstrap.css';
import Mainflow from './Components/Mainflow';
import { Route, Switch } from 'react-router';
import { BrowserRouter, NavLink, Link } from 'react-router-dom';
import Page404 from './Components/Page404';

import Addwords from './Components/Addwords';
import Createdict from './Components/Createdict';
import Removewords from './Components/Removewords';
// import contextRoot from './utils/Context'
import Navbar from 'reactstrap/lib/Navbar';
import NavbarBrand from 'reactstrap/lib/NavbarBrand';
import NavbarToggler from 'reactstrap/lib/NavbarToggler';
import Collapse from 'reactstrap/lib/Collapse';
import Nav from 'reactstrap/lib/Nav';
import NavItem from 'reactstrap/lib/NavItem';
import Welcome from './Components/images/Welcome';


const store = configStore();
const undefined = store.subscribe(() => {
    console.log(store.getState())
}
);

const Home = ()=>(
    <Link to='/flow'><Welcome/></Link>
);
class App extends React.Component<{}, { isOpen: boolean }> {
    constructor(props: any) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render(): any {
        return (

            <BrowserRouter>
                <div>
                    <Navbar color="light" light >
                        <NavbarBrand href='/'>Главная</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <NavLink to="/createdictionary">Создать словарь</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink to='/addwords'>Добавить слова</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink to='/remwords'>Удалить слова</NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Navbar>

                    <Switch>
                        {/* <Route path={`${Context.contextRoot}`} component={App} exact={true}/> */}
                        {/* <Route path="/" component={App} exact={true}/> */}
                        <Route path='/' exact={true} component={Home} />
                        <Route path='/createdictionary' component={Createdict} />
                        <Route path='/addwords' component={Addwords} />
                        <Route path='/remwords' component={Removewords} />
                        <Route path='/flow' render={() => <Mainflow store={store} />} />
                        <Route render={(props) => <Page404 />} />
                    </Switch>
                </div>
            </BrowserRouter >



        );
    }
}
ReactDOM.render(
    <App />,
    document.getElementById('App')
);