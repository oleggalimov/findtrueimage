import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
import contextRoot from '../utils/Context';
import { Link,  BrowserRouter, Route } from 'react-router-dom';
import Addwords from './Addwords'

export default class Footer extends React.Component<{},{isOpen:boolean}> {
  constructor(props:any) {
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
  
  render() {
    let element = <BrowserRouter>
     <div>
    <Navbar color="light" light expand="md">
      <NavbarBrand href={`${contextRoot}`}>Главная</NavbarBrand>
      <NavbarToggler onClick={this.toggle} />
      <Collapse isOpen={this.state.isOpen} navbar>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink href={`${contextRoot}createdictionary`}>Создать словарь</NavLink>
          </NavItem>
          <NavItem>
            <Link to='/addwords'>Добавить слова</Link>
            <NavLink href={`${contextRoot}remwords`}>Удалить слова</NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
    <Route path="/addwords" component={Addwords}/>
  </div>
  
  </BrowserRouter>
  
    return (
        element
    );
  }
}