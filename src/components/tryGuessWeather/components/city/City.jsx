import React, { useState } from 'react';

const City = ({ city, onHandleSetAnswer, onClickCallback }) => {
    const [inputValue, setInputValue] = useState('');

    const handleClick = () => {
        if (!inputValue) {
            return
        }

        onHandleSetAnswer(city, inputValue);
        onClickCallback();
    };

    const onHandleChange = event => {
        const { currentTarget: { value } } = event;

        setInputValue(value);
    };

    return (
        <div>
            <div>{city}</div>
            <input type="number" value={inputValue} onChange={onHandleChange}/>
            <button onClick={handleClick}>Guess</button>
        </div>        
    );
};

export default City;
