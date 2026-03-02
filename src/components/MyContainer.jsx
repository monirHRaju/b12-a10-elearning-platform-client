import React from 'react';

const MyContainer = ({children}) => {
    return (
        <div className='max-w-7xl mx-auto'>
            {children}
        </div>
    );
};

export default MyContainer;