import React, { Component, Fragment } from 'react'
import CommonAPI from './common/api/index';
import MatTable from './common/MaterialTable';

class FileUpdate extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = ({
            mongoCols: [],
            mongoDocs: [],
            columns: [],
            selectedCol: ''
        })
    }

    componentDidMount() {
        let { mongoCols } = this.state;
        mongoCols.push('Select Collection');
        CommonAPI.getCollections().then((res) => {
            // console.log(res);
            res.collections.map((x) => {
                mongoCols.push(x);
            });
            this.setState({ mongoCols });
        })
    }
    handleChange(e) {
        let { selectedCol } = this.state;
        selectedCol = e.target.value;
        this.setState({ selectedCol }, () => {
            this.getMongoDocs(selectedCol);
        });


    }

    async getMongoDocs(colName) {
        let { mongoDocs, columns } = this.state;
        let id = -1;
        let limit = 1;
        let isRecordsExist = true;
        let data = [];
        while (isRecordsExist) {
            await CommonAPI.getMongoDocs(id, limit, colName).then((res) => {

                if (res['data'].length == 0)
                    return isRecordsExist = false;
                id = res['data'][res['data'].length - 1]['_id'];
                if (id === 0) {
                    limit = parseInt(res['data'][res['data'].length - 1]['chunk_size']);
                }
                else {
                    data.push(res['data']);
                }
            })


        }
     
      
        mongoDocs = [].concat.apply([], data);
        columns = Object.keys(mongoDocs[0]).map((key) => {
            return {
                title: key,
                field: key
            }
        });
        columns = columns.slice(0, columns.length - 1); // Remove tableData extra column
        this.setState({ columns, mongoDocs }, () => {

        });
    }
    handleSubmit = (e) => {

        this.saveData(e);
    }

    saveData = async data => {
        // console.log(data);
        // console.log(this.state.selectedCol);
        await CommonAPI.updelRecords(data, this.state.selectedCol).then((res) => {
            console.log(res);
        })

    }

    render() {
        return (
            <Fragment>
                <select value={this.state.selectedCol} onChange={this.handleChange}>
                    {this.state.mongoCols.map((col) => <option key={col} value={col}>{col}</option>)}
                </select>

                {this.state.mongoDocs.length > 0 &&


                    <MatTable
                        title=""
                        columns={this.state.columns}
                        data={this.state.mongoDocs}
                        handleSubmit={this.handleSubmit}
                        action='Update'
                    />
                }
            </Fragment>
        )
    }
}

export default FileUpdate;
