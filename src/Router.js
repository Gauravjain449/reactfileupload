import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import FileUpload from './components/common/FileUpload';
import FileUpdate from './components/FileUpdate';

function Routers() {
    return (
        <Router>
            <div>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/Upload">File Upload</Link>
                    </li>
                    <li>
                        <Link to="/Update">Update File</Link>
                    </li>
                </ul>

                <hr />

                <Route exact path="/" component={() => {
                    return 'Home Page'
                }} />
                <Route path="/Upload" component={FileUpload} />
                <Route path="/Update" component={FileUpdate} />
            </div>
        </Router>
    );
}

export default Routers;