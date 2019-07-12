import React from 'react';
import './App.css';
// import FileUpload from './components/FileUpload';
// import FileReadercsv from './components/FileReadercsv'
// import FadeInFadeOut from './test/FadeInFadeOut'
// import HooksFileUpload from './components/HooksFileReader'
import FileUploadReader from './components/csvFileReader/FileUploadReader.component'

function App() {
  return (
    <div className="container">
      <h4 className="display-4 text-center mb-4">
        <i className="fab fa-react" />
        React File Upload
      </h4>
      {/* <FileUpload /> */}
      {/* <FileReadercsv /> */}
      {/* <FadeInFadeOut show={true}/> */}
      {/* <HooksFileUpload /> */}
      <FileUploadReader />
    </div>
  );
}

export default App;
