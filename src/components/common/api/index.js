import axios from 'axios';
const apiUrl = 'http://localhost:5000/';
class CommonAPI {

    static saveRecords = (rows, index, mongoColName) => {
        return new Promise((resolve, reject) => {
            axios({
                method: 'post',
                url: apiUrl + 'addrecords', headers: {},
                data: {
                    foo: rows,
                    index: index,
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

    static getCollections = () => {
        return axios({
            method: 'get',
            url: 'http://localhost:5000/getCollections', headers: {}
        }).then(response => {
            return response.data;
        })
            .catch(error => {
                console.log(error.message)
            })
    }

    static getMongoDocs = (id, limit, colName) => {
        return new Promise((resolve, reject) => {
            axios({
                method: 'get',
                url: 'http://localhost:5000/getColDocs',
                params: {
                    id: id,
                    limit: limit,
                    colName: colName
                }
            }).then(response => {
                return resolve(response.data)
            })
                .catch(error => {
                    return reject(error.message)
                })
        })
    }

    static updelRecords = (data, mongoColName) => {
        return new Promise((resolve, reject) => {
            axios({
                method: 'post',
                url: 'http://localhost:5000/updelrecords', headers: {},
                data: {
                    foo: data,
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

}

export default CommonAPI;