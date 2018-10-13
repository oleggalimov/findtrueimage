import React from "react";
import Welcome from "./images/Welcome";
import { NavLink } from "reactstrap";

export default class Home extends React.Component {
    constructor(props:any) {
        super(props);
    }
    render() {
        return (
            <div>
                <NavLink href="/flow"><Welcome/></NavLink>
            </div>
        );
    }
}