import React from "react";

const Spinner = ({ isLoading = false, color = 'primary' }) => {

    return (
        isLoading ? <div className={'spinner-border text-'+color} role="status"></div> : ''
    );
};

export default Spinner;