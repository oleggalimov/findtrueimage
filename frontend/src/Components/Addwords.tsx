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


export default class Addwords extends React.Component<
    {},
    { loading: boolean, words: Array<string> | null, dictID: string, tempWord: string, tempFile: File | null }
    >
{
    constructor(props: any) {
        super(props);
        this.state = {
            words: null,
            dictID: "",
            tempWord: "",
            tempFile: null,
            loading: true
        }
        this.inputIdHandler = this.inputIdHandler.bind(this);
        this.handleChangeInput = this.handleChangeInput.bind(this);
    }
    async LoadDataFromDict(id:string) {
        {
        
            if (id.length == 36) {
                //получаем словарь
                try {
                    let response = await axios(
                        `/dictionary?id=${id}&get=true`
                    );
                    if (response.status == 200) {
                        if (response.data != 'fail' && response.data != 'error') {
                            const resp = response.data;
                            const result = Array<string>();
                            for (let word in resp) {
                                result.push(word);
                            }
                            this.setState({ words: result, dictID: id, loading:false });
                        } else {
                            alert("Ошибка получения словаря");
                        }

                    }
                } catch (error) {
                    console.log('Ошибка получения словаря');
                    console.log(error);
                }
            } else {
                this.setState({ loading: true });
            }
        }
    }
    inputIdHandler(event: any) {
        if (event.target.name = 'dictId') {
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
    async handleChangeInput(event: any) {
        switch (event.target.name) {
            case "wordinput": {
                this.setState({ tempWord: event.target.value });
                break;
            }
            case "fileinput": {
                this.setState({ tempFile: event.target.files[0] });
                console.log(this.state);
                break;
            }
            case "add": {
                try {
                    if (this.state.tempFile == null) {
                        throw Error("File is empty!");
                    } else {
                        this.setState({loading:true})
                        let formData = new FormData();
                        formData.append('file', this.state.tempFile);
                        formData.append('word', this.state.tempWord);
                        formData.append('dictid', this.state.dictID);
                        let response = await axios.post(
                            `/addwordtodictionary`,
                            formData
                        );
                        if (response.status == 200) {
                            if (response.data == 'success') {
                                {   
                                    this.setState({
                                        tempFile:null,
                                        tempWord:""
                                    });
                                    this.LoadDataFromDict(this.state.dictID);
                                }
                            }
                        } else {
                            console.log(response.status);
                        };
                    }
                } catch (error) {
                    alert("Ошибка загрузки файла!");
                    console.log(error);
                }
            }
            default:

        }
    }
    //TODO: Uploading files
    //https://blog.codeinfuse.com/upload-multiple-files-to-cloudinary-using-react-dropzone-axios-27883c2a5ec6
    render() {
        let rows: Array<any> = [];
        if (this.state.words != null) {
            rows = buildTable(this.state.words);
        }
        return (
            <div>

                <Container>
                    <Form>
                        <FormGroup>
                            <Label for="exampleEmail">Идентификатор словаря</Label>
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
                            <tbody>
                                {rows}
                                <tr>
                                    <td><Button disabled={(this.state.tempWord == "") || (this.state.tempFile == null)} color="success" name="add" onClick={this.handleChangeInput}>+</Button></td>
                                    <td><Input onChange={this.handleChangeInput} type="text" name="wordinput" placeholder="Введите слово" /></td>

                                            <td><Input onChange={this.handleChangeInput} type="file" name="fileinput" /></td>
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
            <td>    </td>
        </tr>;
        result.push(newRow);
    });
    return result

}