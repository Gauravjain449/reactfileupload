import Papa from 'papaparse';
class CommonParseFile {
    static CSVParseFileContent(file) {
        let filemb = file.size / 1000000;
        let i = 1;
        let data = [];
        let dataErrorsCount = 0;
        let dataErrors = [];
        return new Promise((resolve) => {
            Papa.parse(file, {
                worker: filemb > 50 ? true : false,
                header: true,
                step: function (row) {
                    if (row.data.length === undefined) {
                        row.data['_id'] = i;
                        if (row.errors.length > 0) {
                            let err = {};
                            dataErrorsCount = dataErrorsCount++;
                            err['_id'] = i;
                            err['Error'] = 'Failed:' + JSON.stringify(row.errors);
                            dataErrors.push(err);
                        }
                        data.push(row.data);
                        i++;
                    }
                    else {
                        // Blank Rows                   
                    }
                },
                complete: function () {
                    console.log('Read all file....Completed');
                    let chunk_size = filemb <= 1.5 ? data.length + 1 : (data.length / (filemb * 2));
                    return resolve({ 'data': { data, dataErrors, dataErrorsCount, chunk_size } });
                }

            });
        });
    }
}

export default CommonParseFile;

