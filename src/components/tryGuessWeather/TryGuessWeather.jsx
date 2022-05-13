import React, { useState } from 'react';
import City from './components/city/City';
import { API_KEY, citiesList } from './constants';
import axios from 'axios';

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

                if ((Math.abs(userTemp) -  Math.abs(response?.data.main.temp)) <= 5) {
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
            ? <div>
                    <>
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
                        <div>
                            {answersList.length
                                ? answersList.map(({ city, userTemp, currentTemp }) => (
                                    <div key={city + currentTemp}>
                                        <div>{city}</div>
                                        <div>{userTemp}</div>
                                        <div>{currentTemp}</div>
                                    </div>
                                ))
                                : null
                            }
                        </div>
                    </>
                </div>
            : result > 3 
                ? <div>
                    <p>Win</p>
                    <button onClick={handleRestartGame}>Restart game</button>
                </div>
                : <div>
                    <p>Lose</p>
                    <button onClick={handleRestartGame}>Restart game</button>
                </div>
            }
        </>
    );
};

export default TryGuessWeather;
