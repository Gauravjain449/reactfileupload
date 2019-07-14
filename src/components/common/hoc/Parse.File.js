import React, { Component, Fragment } from 'react'
import CommonParseFile from './ParseFileContent';



const ParseFile = (File) => {
    class NewComp extends Component {
        constructor(props) {
            super(props);
            this.handleFileChange = this.handleFileChange.bind(this);
            this.state = ({
                fileName: 'Choose file',
                columns: [],
                errorCount: 0,
                errorsData: [],
                data: [],
                chunkSize: 0,
                file: null
            });
        }       


        async  handleFileChange(e) {
            let ref = this;
            let { fileName, columns, errorCount, chunkSize, errorsData, data } = this.setState;
            fileName = e.target.files[0].name;

            await CommonParseFile.CSVParseFileContent(e.target.files[0]).then((res) => {
                errorCount = res.data.dataErrorsCount;
                errorsData = res.data.dataErrors;
                chunkSize = res.data.chunk_size;
                data = res.data.data;
                columns = Object.keys(res.data.data[0]).map((key, id) => {
                    return {
                        title: key,
                        field: key
                    }
                });
            });

            ref.setState({ fileName, columns, errorCount, chunkSize, errorsData, data });
        }
        render() {
            console.log('Render HOC FileUpload');
            return (
                <Fragment>
                    <File
                        data={this.state}
                        handleFileChange={this.handleFileChange}
                    />
                </Fragment>
            )
        }
    }
    return NewComp;
}

export default ParseFile;