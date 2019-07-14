import React, { Component, Fragment } from 'react'
import ParseFile from './hoc/Parse.File';
import CommonAPI from './api/index';
import MatTable from './MaterialTable';


class FileUpload extends Component {


    handleSubmit = (e) => {

        this.saveData(e);
    }
    saveData = async data => {
        console.log(data);
        let mongoColName = this.props.data.fileName.replace(/[^-a-zA-Z0-9_ ]/g, '');
        let arrData = []
        data.unshift({ '_id': 0, 'chunk_size': this.props.data.chunkSize })
        for (let index = 0; index < data.length; index += this.props.data.chunkSize) {
            arrData.push(data.slice(index, index + this.props.data.chunkSize));
            console.log(arrData);
        }
        for (let i = 0; i < arrData.length; i++) {
            await CommonAPI.saveRecords(arrData[i], i, mongoColName).then((res) => {
                console.log(res);
            })
        }

    }

    render() {
        console.log('Render FileUpload');
        return (
            <Fragment>
                <div className="custom-file">
                    <input type="file"
                        className="custom-file-input"
                        onChange={this.props.handleFileChange} />
                    <label className="custom-file-label" htmlFor="customFile">{this.props.data.fileName}</label>
                </div>
                {this.props.data.data.length > 0 &&
                    <React.Fragment >
                        <MatTable
                            title=""
                            columns={this.props.data.columns}
                            data={this.props.data.data}
                            handleSubmit={this.handleSubmit}
                            action='Upload'
                        />

                    </React.Fragment>
                }
            </Fragment>
        )
    }
}
export default ParseFile(FileUpload);