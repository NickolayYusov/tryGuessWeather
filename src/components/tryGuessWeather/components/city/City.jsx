import React, { useState } from 'react';
import {
    Input, 
    Button,
    CityName,
    QuestionWrapper,
} from './styled';

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
        <QuestionWrapper>
            <CityName>{city}</CityName>
            <Input type="number" value={inputValue} placeholder={'try...'} onChange={onHandleChange}/>
            <Button onClick={handleClick} children={'Guess'}></Button>   
        </QuestionWrapper>        
    );
};

export default City;
