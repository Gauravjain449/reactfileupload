import React, { Fragment, useState, useRef } from 'react'
import { CSVReader } from 'react-papaparse';


const HooksFileUpload = () => {
    const _csvData = [];
    const fileInput = useRef(null);
    const [csvData, setCSVData] = useState([]);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);

    const testhandleReadCSV = (data) => {
        if (data.data.length === 1) {
            // setCSVData(csvData.push(data.data));
            _csvData.push(data.data);
            // this.setState({ csvData: [...this.state.csvData, data.data], isLoading: true, isRender: false }
            //     , () => {
            //         this.state.csvData.length === 1
            //             ? this.setState({ isRender: true, isLoading: true })
            //             : this.setState({ isRender: false })
            //     }
            // );
        }
        else {
            var tempDate = new Date();
            var date = tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getDate() + ' ' + tempDate.getHours() + ':' + tempDate.getMinutes() + ':' + tempDate.getSeconds();
            const currDate = "End Time= " + date;
            setEndTime(currDate);
            setCSVData(csvData.push(_csvData));
            console.log(csvData);
            // var tempDate = new Date();
            // var date = tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getDate() + ' ' + tempDate.getHours() + ':' + tempDate.getMinutes() + ':' + tempDate.getSeconds();
            // const currDate = "Start Time= " + date;
            // this.setState({ csvData: this._data, isLoading: false, isRender: true, EndFileupload: currDate }, () => {
            //     console.log(this.state.csvData);
            // })
        }
    }
    const handleImportOffer = (e) => {
        fileInput.current.click();
        var tempDate = new Date();
        var date = tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getDate() + ' ' + tempDate.getHours() + ':' + tempDate.getMinutes() + ':' + tempDate.getSeconds();
        const currDate = "Start Time= " + date;
        setStartTime(currDate)
    }
    const handleOnError = (err, file, inputElem, reason) => {
        console.log(err);
    }

    return (
        <Fragment>
            <CSVReader
                onFileLoaded={testhandleReadCSV}
                inputRef={fileInput}
                style={{ display: 'none' }}
                onError={handleOnError}
                configOptions={{
                    header: true /* Header row support */,
                    step: testhandleReadCSV
                }}
            />
            {startTime}
            <br />
            <button onClick={handleImportOffer}>CSV Import</button>
            <br />
            {endTime}
        </Fragment>
    )
}

export default HooksFileUpload
