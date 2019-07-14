import React, { Component, Fragment } from 'react'
import MaterialTable from 'material-table';
import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};


class MatTable extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            columns: this.props.columns,
            data: this.props.data,
            editData: []
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
       
        if (this.props.action === 'Update')
            this.props.handleSubmit(this.state.editData);
        else if (this.props.action === 'Upload')
            this.props.handleSubmit(this.state.data);
    }
    render() {
        return (
            <Fragment>
                <MaterialTable
                    icons={tableIcons}
                    title=""
                    columns={this.state.columns}
                    data={this.state.data}
                    editable={{
                        // onRowAdd: newData =>
                        //     new Promise(resolve => {
                        //         setTimeout(() => {
                        //             resolve();
                        //             const data = [...this.state.data];
                        //             data.push(newData);
                        //             this.setState({ ...this.state, data, editData: Object.assign({}, newData) });
                        //         }, 600);
                        //     }),
                        onRowUpdate: (newData, oldData) =>
                            new Promise(resolve => {
                                setTimeout(() => {
                                    resolve();
                                    const data = [...this.state.data];
                                    data[data.indexOf(oldData)] = newData;

                                    let ee = Object.assign({}, newData);
                                    ee['isDeleted'] = false;
                                    let { editData } = this.state;
                                    editData.push(ee);

                                    this.setState({ ...this.state, data, editData });

                                }, 600);
                            }),
                        onRowDelete: oldData =>
                            new Promise(resolve => {
                                setTimeout(() => {
                                    resolve();
                                    const data = [...this.state.data];
                                    data.splice(data.indexOf(oldData), 1);

                                    let ee = Object.assign({}, oldData);
                                    ee['isDeleted'] = true;
                                    let { editData } = this.state;
                                    editData.push(ee);

                                    this.setState({ ...this.state, data, editData });
                                }, 600);
                            }),
                    }}
                />
                <br />
                <button onClick={this.handleSubmit}>Submit</button>
            </Fragment>
        )
    }

}

export default MatTable;

