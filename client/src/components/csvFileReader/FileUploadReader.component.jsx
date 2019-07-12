import React, { Component } from 'react';
import Papa from 'papaparse';
import MaterialTable from 'material-table';
import { tableIcons } from '../../utils/MaterialTable';
import axios from 'axios';

class FileUploadReader extends Component {
    constructor(props) {
        super(props);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.state = ({
            fileName: '',
            csvData: [],
            dataErrorsCount: 0,
            dataErrors: [],
            columns: { key: '', dataKey: '' },
            chunk_size: 0
        });
    }
    handleFileChange(e) {
        let ref = this;
        ref.setState({ fileName: e.target.files[0].name });
        let _filemb = e.target.files[0].size / 1000000;
        let i = 1;
        let _data = [];
        let _dataErrorsCount = 0;
        let _dataErrors = [];
        Papa.parse(e.target.files[0], {
            worker: _filemb > 50 ? true : false,
            header: true,
            step: function (row) {
                if (row.data.length === undefined) {
                    row.data['_id'] = i;
                    if (row.errors.length > 0) {
                        let err = {};
                        _dataErrorsCount = _dataErrorsCount++;
                        err['_id'] = i;
                        err['Error'] = 'Failed:' + JSON.stringify(row.errors);
                        _dataErrors.push(err);
                    }
                    _data.push(row.data);
                    i++;
                }
                else {
                    // Blank Rows
                    //console.log(row.data);
                }
            },
            complete: function () {
                console.log('Completed');
                let chunk_size = _filemb <= 1.5 ? _data.length + 1 : (_data.length / (_filemb * 2));

                let columns = Object.keys(_data[0]).map((key, id) => {
                    return {
                        title: key,
                        field: key
                    }
                });
                ref.setState({ columns, csvData: _data, dataErrorsCount: _dataErrorsCount, dataErrors: _dataErrors, chunk_size }, () => {
                    console.log(ref.state);
                })
            }
        });

    }
    handleSubmit = async (e) => {
        e.preventDefault();
        let { csvData, chunk_size, fileName } = this.state;
        let mongoColName = fileName.replace(/[^-a-zA-Z0-9_ ]/g, '');
        let arrData = []

        for (let index = 0; index < csvData.length; index += chunk_size) {
            arrData.push(csvData.slice(index, index + chunk_size));
        }

        for (let i = 0; i < arrData.length; i++) {
            await this.getTitle(arrData[i], i, mongoColName).then((res) => {
                console.log(res);
            })
        }
    }
    getTitle = (rows, index, mongoColName) => {
        return new Promise((resolve, reject) => {
            axios({
                method: 'post',
                url: 'http://localhost:5000/addrecords', headers: {},
                data: {
                    foo: rows,
                    index: index, // This is the body part
                    mongoColName: mongoColName
                }
            }).then(response => {
                return resolve(response.data)
            })
                .catch(error => {
                    return reject(error.message)
                })
        })
    }
    render() {
        let _fileName = this.state.fileName === '' ? 'Choose file' : this.state.fileName;
        return (
            <React.Fragment >
                <div className="custom-file">
                    <input type="file"
                        className="custom-file-input"
                        onChange={this.handleFileChange} />
                    <label className="custom-file-label" htmlFor="customFile">{_fileName}</label>
                </div>
                <hr />
                {this.state.csvData.length > 0 &&
                    <React.Fragment >
                        <MaterialTable
                            icons={tableIcons}
                            title=""
                            columns={this.state.columns}
                            data={this.state.csvData}
                            editable={{
                                onRowAdd: newData =>
                                    new Promise(resolve => {
                                        setTimeout(() => {
                                            resolve();
                                            const data = [...this.state.csvData];
                                            data.push(newData);
                                            this.setState({ ...this.state, csvData: data });
                                        }, 600);
                                    }),
                                onRowUpdate: (newData, oldData) =>
                                    new Promise(resolve => {
                                        setTimeout(() => {
                                            resolve();
                                            const data = [...this.state.csvData];
                                            data[data.indexOf(oldData)] = newData;
                                            this.setState({ ...this.state, csvData: data });
                                        }, 600);
                                    }),
                                onRowDelete: oldData =>
                                    new Promise(resolve => {
                                        setTimeout(() => {
                                            resolve();
                                            const data = [...this.state.csvData];
                                            data.splice(data.indexOf(oldData), 1);
                                            this.setState({ ...this.state, csvData: data });
                                        }, 600);
                                    }),
                            }}
                        />
                        <br />
                        <button onClick={this.handleSubmit}>Submit</button>
                    </React.Fragment>

                }
            </React.Fragment>
        );
    }
}

export default FileUploadReader;