var Promise = require('promise');
const express = require('express');
const fileUpload = require('express-fileupload');
var MongoClient = require('mongodb').MongoClient;
var Binary = require('mongodb').Binary;
var fs = require('fs');


const app = express();

app.use(fileUpload());

var url = 'mongodb://localhost/EmployeeDB';
var str = "";

// upload endpoint

app.post('/upload', (req, res) => {
    if (req.files == null) {
        return res.status(400).json({ msg: 'No File uploaded' });
    }
    const file = req.files.file;
    file.mv(`${__dirname}/client/public/upload/${file.name}`, err => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }
        res.json({ fileName: file.name, filePath: `/upload/${file.name}` });
    });
});


app.post('/mongoupload', (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log("Please check you db connection parameters");
        } else {
            console.log("Connection success");
            // console.log(req.files.file.data);
            // var data = fs.readFileSync('C:\\Users\\Gaurav\\Downloads\\IMG_20190514_121434.jpg');
            var insert_data = {};
            insert_data.file_data = Binary(req.files.file.data);
            insert_data.id = 207;

            var collection = db.collection('files');
            collection.insert(insert_data, function (err, result) { // If the collection does not exist, then the insert() method will create the collection.
                if (err) {
                    console.log(err);
                }
                else {
                    console.log('Inserted!!');
                }
            });

            var cursor = db.collection('files').find({ "id": 207 });
            var i = 0;
            cursor.each(function (err, item) {
                console.log(i);
                console.log(item);
                i++;
                if (err) {
                    console.log(err);
                }
                else {
                    if (item) {
                        console.log(item.file_data.buffer);
                        fs.writeFile('C:\\Users\\Gaurav\\Downloads\\GauravJain1.jpg', item.file_data.buffer, function (err) {
                            if (err) throw err;
                            console.log('Sucessfully saved!');
                        });
                    }
                }

            });

        }
    });
});

var azuremongourl = "mongodb://gauravjain449:fBTaVMbDnbGRS8H0965DQNSBQ5BiCjcgsDeAXN5Up6LlPvxvTpOx1PAIIR9noXodnldRnXNYLdv6Zn1My8bUlQ==@gauravjain449.documents.azure.com:10255/?ssl=true";
app.post('/azuremongoupload', (req, res) => {
    MongoClient.connect(azuremongourl, function (err, db) {
        if (err) {
            console.log("Please check you db connection parameters");
        } else {
            console.log("Connection success");
            var BinaryData = Binary(req.files.file.data);
            var bufToSend = new Buffer(3 + 100 + BinaryData.length);
            bufToSend.writeUInt32LE(INTEGER, 0);
            bufToSend.write(STRING, 4, STRING.length, "ascii");
            BinaryData.copy(bufToSend, 105, 0, BinaryData.length);

            var insert_data = {};
            insert_data.file_data = BinaryData;//Binary(req.files.file.data);  

            insert_data.id = 2;
            var collection = db.collection('files');
            //console.log(collection);
            collection.insert(insert_data, function (err, result) { // If the collection does not exist, then the insert() method will create the collection.
                if (err) {
                    // console.log(err);
                    console.log('Error');
                }
                else {
                    console.log('Inserted!!');
                }
            });

        }

        db.close();
    });
});

app.listen(5000, () => {
    console.log('Server Started...');
})