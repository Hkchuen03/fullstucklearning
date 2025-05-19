import { useState, useEffect } from 'react';
import axios from 'axios';

import { apiBaseUrl } from './constants';
import { type Diary, type Weather, type Visibility, VisibilityEnum, WeatherEnum } from './types';

import diariesService from './services/diaries';

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [date, setDate] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [weather, setWeather] = useState<Weather>(WeatherEnum.Sunny);
  const [visibility, setVisibility] = useState<Visibility>(VisibilityEnum.Great);
  const [error, setError] = useState<string>();

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchDiariesList = async () => {
      const diaries = await diariesService.getAll();
      setDiaries(diaries);
    };

    void fetchDiariesList();
  }, []);

  const addDiary = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    console.log('adding diary entry', date, comment, weather, visibility);
    
    try {
      const diary = await diariesService.create({
        date,
        comment,
        weather,
        visibility
      });
      console.log(diary);
      setDiaries(diaries.concat(diary));
      setDate('');
      setComment('');
      setWeather(WeatherEnum.Sunny);
      setVisibility(VisibilityEnum.Great);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data);
        if (e?.response?.data) {
          const message = e.response.data.error[0].message.replace('Something went wrong. Error: ', '');
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  }

  const handleVisibilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value as Visibility;
    setVisibility(value);
  };

  const handleWeatherChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value as Weather;
    setWeather(value);
  };  

  return (
    <div>
      <h1>Add new entry</h1>
      {error && <p style={{color: 'red'}}>{error}</p>}
      <form onSubmit={addDiary}>
        <div>
          date <input
            type='date'
            value={date}
            placeholder='YYYY-MM-DD'
            onChange={({ target }) => setDate(target.value)}
            checked={visibility === VisibilityEnum.Great}
          />
        </div>
        <div>
          visibility great <input
            type='radio'
            name='visibility'
            onChange={(event) => handleVisibilityChange(event)}
            value={VisibilityEnum.Great}
            checked={visibility === VisibilityEnum.Great}
          />
          good <input
            type='radio'
            name='visibility'
            onChange={(event) => handleVisibilityChange(event)}
            value={VisibilityEnum.Good}
            checked={visibility === VisibilityEnum.Good}
          />
          ok <input
            type='radio'
            name='visibility'
            onChange={(event) => handleVisibilityChange(event)}
            value={VisibilityEnum.Ok}
            checked={visibility === VisibilityEnum.Ok}
          />
          poor <input
            type='radio'
            name='visibility'
            onChange={(event) => handleVisibilityChange(event)}
            value={VisibilityEnum.Poor}
            checked={visibility === VisibilityEnum.Poor}
          />
        </div>
        <div>
        weather sunny <input
            type='radio'
            name='weather'
            onChange={(event) => handleWeatherChange(event)}
            value={WeatherEnum.Sunny}
            checked={weather === WeatherEnum.Sunny}
          />
          rainy <input
            type='radio'
            name='weather'
            onChange={(event) => handleWeatherChange(event)}
            value={WeatherEnum.Rainy}
            checked={weather === WeatherEnum.Rainy}
          />
          cloudy <input
            type='radio'
            name='weather'
            onChange={(event) => handleWeatherChange(event)}
            value={WeatherEnum.Cloudy}
            checked={weather === WeatherEnum.Cloudy}
          />
          stormy <input
            type='radio'
            name='weather'
            onChange={(event) => handleWeatherChange(event)}
            value={WeatherEnum.Stormy}
            checked={weather === WeatherEnum.Stormy}
          />
          windy <input
            type='radio'
            name='weather'
            onChange={(event) => handleWeatherChange(event)}
            value={WeatherEnum.Windy}
            checked={weather === WeatherEnum.Windy}
          />
        </div>
        <div>
          comment <input
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />  
        </div>
        <button type="submit">add</button>
      </form>
      <h1>Diary entries</h1>
      {diaries.map((diary: Diary) => 
        <div key={diary.id}>
          <h2>{diary.date}</h2>
          <p>visibility: {diary.visibility}</p>
          <p>weather: {diary.weather}</p>
        </div>
      )}
    </div>
  );
};

export default App;
