import React from 'react';
import loader from '../../../public/images/Loader.gif';

const Loader = () => {
    return (
        <img className={"img-fluid rounded-circle vertical-center"} src={loader}/>
    );
};

export default Loader;