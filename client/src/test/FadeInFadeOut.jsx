import React from 'react';
import LoadingOverlay from 'react-loading-overlay';

const FadeInFadeOut = ({ show }) => {

    return (
        <div>
            <LoadingOverlay
                active={true}
                spinner
                text='Loading your content...'>
                <p>Some content or children or something.</p>
                <p>Some content or children or something.</p>
                <p>Some content or children or something.</p>
                <p>Some content or children or something.</p>
                <p>Some content or children or something.</p>
                <p>Some content or children or something.</p>
            </LoadingOverlay>
        </div>
    );
};

FadeInFadeOut.propTypes = {
    //show: React.PropTypes.bool.isRequired
};

export default FadeInFadeOut;