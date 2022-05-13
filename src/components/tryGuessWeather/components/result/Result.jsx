import React from 'react';
import { 
    ResultTitle,
    ResultButton,
    ResultWrapper,
} from './styled';

const Result = ({ children, onCallback }) => (
    <ResultWrapper>
        <ResultTitle children={children}/>
        <ResultButton onClick={onCallback} children={'Restart game'}/>
    </ResultWrapper>
)

export default Result;
