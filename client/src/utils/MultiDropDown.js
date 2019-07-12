import React, { PropTypes } from 'react';

const MultiDropDown = ({ id, name, onChange, value, error, options, divClassName }) => {
    let wrapperClass = 'form-group row';
    if (error && error.length > 0) {
        wrapperClass += " " + 'has-error';
    }  
    var lis = [];
    var selected = 'None selected';
    if (options.length > 0) {
     
        for (var i = 0; i < options.length; i++) {
            if (value.length > 0) {
                let isOptionSelect = value.filter((item) => item === options[i]);
                if (isOptionSelect.length > 0) {
                    selected = value.length == 1 ? options[i] : `${value.length} selected`;
                    lis.push(<li className='active' key={options[i]}>
                        <a>
                            <label className="checkbox" title={options[i]}>
                                <input  type="checkbox" value={options[i]} onChange={onChange} checked={true} />
                                {options[i]}</label></a></li>)
                }
                else {
                    lis.push(<li key={options[i]}>
                        <a>
                            <label className="checkbox" title={options[i]}>
                                <input type="checkbox" value={options[i]} onChange={onChange} checked={false} />
                                {options[i]}</label></a></li>)
                }
            }
            else {
                lis.push(<li key={options[i]}>
                    <a>
                        <label className="checkbox" title={options[i]}>
                            <input type="checkbox" value={options[i]} onChange={onChange} checked={false} />
                            {options[i]}</label></a></li>)
            }
        }
    }

    if (options.length > 0) {
        return (
            <div>
                <div className={divClassName}>
                    <span className="multiselect-native-select">
                        <div className="btn-group">
                            <button type="button" className="multiselect dropdown-toggle btn btn-default" data-toggle="dropdown" aria-expanded="true">
                                <span className="multiselect-selected-text">{selected} </span>
                                <b className="caret"></b>
                            </button>
                            <ul className="multiselect-container dropdown-menu">
                                {lis}
                            </ul>
                        </div>
                    </span>
                    {error && <div className="alert alert-danger">{error}</div>}
                </div>
            </div>);
    }
    else {
        return (<div>Record(s) not found for user.</div>);
    }
}



export default MultiDropDown;
