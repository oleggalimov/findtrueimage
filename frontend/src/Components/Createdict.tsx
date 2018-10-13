import React from "react";
import { Table, Button, Row, Container, Col, Form, FormGroup, Label, Input } from "reactstrap";
import { v1 } from 'uuid'
import axios from 'axios'
const Loader = require("react-loader-spinner").default

export default class Createdictionary extends React.Component<
    {},
    { dictId: string | null}
    > {
    constructor(props: any) {
        super(props);
        this.state = {
            dictId: null,
        }
        this.create = this.create.bind(this);

    }
    async create() {
        const uuid=v1();
        //создаем словарь
        try {
            let response = await axios(
                `/createdictionary?id=${uuid}`
            );
            if (response.status==200 && response.data!="fail" && response.data!="error") {
                this.setState(
                    {
                        dictId: uuid
                    }
                );
            }
        } catch (error) {
            console.log(error);
        }
    } 
render() {

        return (

            <Container>
                <Row>
                    <Col>
                    <p>
                    Для получения ключа нажмите кнопку "Создать". 
                    В ответ вам будет предоставлен <b>уникальный идентификатор. </b>
                    С его помощью вы сможете редактировать набор слов, которые будете изучать.
                    </p>
                    <p>
                        <b>Внимание: запишите или сохраните его!</b> В противном случае данные будут <b>безвозвратно утеряны!</b>
                    </p>
                    
                    
                        <Button onClick={this.create} disabled={this.state.dictId!=null} color="success">Создать</Button> {this.state.dictId} 
                    </Col>
                </Row>
            </Container>
        );
}
}