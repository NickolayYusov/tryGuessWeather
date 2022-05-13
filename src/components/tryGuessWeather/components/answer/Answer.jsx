import React from 'react';
import { 
    City,
    UserTemp,
    CurrentTemp,
    AnswerWrapper,
} from './styled';

export const Answer = ({ city, userTemp, currentTemp }) => (
    <AnswerWrapper>
        <City>{city}</City>
        <UserTemp>{'Your answer: '}{userTemp}</UserTemp>
        <CurrentTemp>{'Current temp: '}{Math.trunc(currentTemp)}</CurrentTemp>
    </AnswerWrapper>
);

export default Answer;
