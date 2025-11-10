import React from 'react';

const MyContainer = ({children}) => {
    return (
        <div className='w-11/12 mx-auto'>
            {children}
        </div>
    );
};

export default MyContainer;