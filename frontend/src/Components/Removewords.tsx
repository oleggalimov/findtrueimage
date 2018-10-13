import React from "react";
import Form from "reactstrap/lib/Form";
import FormGroup from "reactstrap/lib/FormGroup";
import Label from "reactstrap/lib/Label";
import Input from "reactstrap/lib/Input";
import Container from "reactstrap/lib/Container";
import axios from 'axios'
import Table from "reactstrap/lib/Table";
import Button from "reactstrap/lib/Button";
const Loader = require("react-loader-spinner").default;


export default class Removewords extends React.Component<
    {},
    {
        loading: boolean,
        dictID: string,
        words: Array<string>
    }
    >
{
    constructor(props: any) {
        super(props);
        this.state = {
            words: [],
            dictID: "",
            loading: true
        }
        this.inputIdHandler = this.inputIdHandler.bind(this);
        this.handleDeleteButton = this.handleDeleteButton.bind(this);
        this.handleSaveButton = this.handleSaveButton.bind(this);
    }
    async LoadDataFromDict(id: string) {
        {

            if (id.length == 36) {
                //получаем словарь
                try {
                    let response = await axios(
                        `http://localhost:8080/findtrueimage/dictionary?id=${id}&get=true`
                    );
                    if (response.status == 200) {
                        if (response.data != 'fail' && response.data != 'error') {
                            const resp = response.data;
                            const result = Array<string>();
                            for (let word in resp) {
                                result.push(word);
                            }
                            this.setState({ words: result, dictID: id, loading: false });
                        } else {
                            alert("Ошибка получения словаря");
                        }

                    }
                } catch (error) {
                    console.log('Ошибка получения словаря');
                    console.log(error);
                }
            }
        }
    }
    inputIdHandler(event: any) {
        if (event.target.name == 'dictId') {
            const val: string = event.target.value;
            if (val.length == 36) {
                this.LoadDataFromDict(val);
            } else {
                this.setState({
                    loading:true
                });
            }
        }

    };
    handleDeleteButton(event: any) {
        if (event.target.name == "deleteword") {
            this.setState({
                words: this.state.words.filter(
                    (word) => {
                        return word!=event.target.id
                    }
                )
            });
        }

    }
    async handleSaveButton(event: any) {
        if (event.target.name == "saveChanges") {
            this.setState({
                loading:true
            });
            try {
                let response = await axios.post(
                    `http://localhost:8080/findtrueimage/updatedictionary`,
                    {
                        id:this.state.dictID,
                        words:this.state.words
                    }

                );
                if (response.status == 200) {
                    if (response.data == 'success') {
                        this.LoadDataFromDict(this.state.dictID);
                    } else {
                        alert("Ошибка получения словаря");
                    }

                }
            } catch (error) {
                console.log('Ошибка получения словаря');
                console.log(error);
            }
            
        }

    }
    render() {
        let rows: Array<any> = [];
        rows = buildTable(this.state.words);
        return (
            <div>

                <Container>
                    <Form>
                        <FormGroup>
                            <Label >Идентификатор словаря</Label>
                            <Input name="dictId" onChange={this.inputIdHandler} type="search" placeholder="Введите идентификатор" />
                        </FormGroup>
                    </Form>
                </Container>
                <Container>
                    {!this.state.loading ?
                        <Table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Слово</th>
                                    <th>   </th>
                                </tr>
                            </thead>
                            <tbody onClick={this.handleDeleteButton}>
                                {rows}
                                <tr>
                                    <td><Button name="saveChanges" onClick={this.handleSaveButton} color="danger">Сохранить</Button></td>
                                    <td>    </td>
                                    <td>    </td>
                                </tr>
                            </tbody>
                        </Table>
                        : <Loader type="Plane" color="#00BFFF" height="100" width="100" />
                    }
                </Container>


            </div>
        );
    }
}


function buildTable(array: Array<string>) {
    const result = new Array();
    let counter = 0;
    array.forEach((word) => {
        counter = counter + 1;
        const newRow = <tr key={counter}>
            <td>{counter}</td>
            <td>{word}</td>
            <td> <Button name="deleteword" id={word} color="warning">Удалить</Button> </td>
        </tr>;
        result.push(newRow);
    });
    return result

}