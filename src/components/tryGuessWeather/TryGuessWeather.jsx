import React, { useState } from 'react';
import City from './components/city/City';
import Answer from './components/answer/Answer';
import Result from './components/result/Result';
import { API_KEY, citiesList } from './constants';
import axios from 'axios';
import { 
    AnswersWrapper,
    QuestionsWrapper,
    QuestionsAndAnswersBlock,
    QuestionsAndAnswersTitle,
} from './styled';

const TryGuessWeather = () => {
    const [result, setResult] = useState(0);
    const [cities, setCities] = useState(citiesList);
    const [answersList, setAnswersList] = useState([]);

    const handleClick = city => {
        setCities([...cities.filter(item => item !== city)]);
    };

    const handleSetAnswer = async (city, userTemp) => {
        try {
            await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
            .then(response => {
                setAnswersList([
                    ...answersList, 
                    {
                        city,
                        userTemp,
                        currentTemp: response?.data.main.temp
                    }
                ]);

                if (Math.abs(userTemp - response?.data.main.temp) <= 5) {
                        setResult(prev => prev + 1);
                }
            });

        } catch(error) {
            console.log(error);
        }
    };

    const handleRestartGame = () => {
        setResult(0);
        setCities(citiesList);
        setAnswersList([]);
    };
    
    return (
        <>
            {answersList.length < 5 
            ? <QuestionsAndAnswersBlock>
                <QuestionsAndAnswersTitle children={'Try to guess the weather in cities'}/>
                <QuestionsWrapper>
                    {cities.length
                        ? cities.map((city, index) => (
                            <City 
                                key={city + index}
                                city={city}
                                onClickCallback={() => handleClick(city)}
                                onHandleSetAnswer={handleSetAnswer}
                            />
                        ))
                        : null
                    }
                </QuestionsWrapper>                    
                <AnswersWrapper>
                    {answersList.length
                        ? answersList.map(({ city, userTemp, currentTemp }) => (
                            <Answer 
                                key={city + currentTemp}
                                city={city}
                                userTemp={userTemp}
                                currentTemp={currentTemp}
                            />
                        ))
                        : null
                    }
                </AnswersWrapper>                    
            </QuestionsAndAnswersBlock>
            : <Result 
                children={result >= 3 ? 'Won' : 'Lose'}
                onCallback={handleRestartGame}
             />    
            }
        </>
    );
};

export default TryGuessWeather;
