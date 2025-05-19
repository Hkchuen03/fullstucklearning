export const WeatherEnum = {
    Sunny: 'sunny',
    Rainy: 'rainy',
    Cloudy: 'cloudy',
    Stormy: 'stormy',
    Windy: 'windy'
} as const;

export type Weather = typeof WeatherEnum[keyof typeof WeatherEnum];
  
export const VisibilityEnum = {
    Great: 'great',
    Good: 'good',
    Ok: 'ok',
    Poor: 'poor'
} as const;

export type Visibility = typeof VisibilityEnum[keyof typeof VisibilityEnum];
  
export interface Diary {
    id: number;
    date: string;
    weather: Weather;
    visibility: Visibility;
    comment?: string;
}

export type DiaryFormValues = Omit<Diary, 'id'>;