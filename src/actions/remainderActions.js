import ActionTypes from "../constants/actionTypes";
import axios from "axios";

export const set_Error = (actionType, error) => ({
  type: actionType,
  payload: error.message
});

export const set_Remainder = (devices) => ({
  type: ActionTypes.SET_DEVICES,
  payload: devices
});

export const fetchWeather =
  (id, text, date, time, city) => async (dispatch) => {
    try {
      dispatch({ type: ActionTypes.REQUEST_CREATE_REMAINDER });
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`,
        { mode: "cors" }
      );
      const data = await response.data;
      const weather = data.weather[0].main;
      const dataRemainder = {
        id: id,
        text: text,
        date: date,
        time: time,
        city: city,
        weather: weather
      };
      dispatch({ type: ActionTypes.CREATE_REMAINDER, payload: dataRemainder });
    } catch (error) {
      dispatch(set_Error(ActionTypes.SET_ERROR, error));
    }
  };

export const UpdateRemainderInfo =
  (id, text, date, time, city) => async (dispatch) => {
    try {
      dispatch({ type: ActionTypes.REQUEST_UPDATE_REMAINDER });
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`,
        { mode: "cors" }
      );
      const data = await response.data;
      const weather = data.weather[0].main;
      const newDataRemainder = {
        id: id,
        text: text,
        date: date,
        time: time,
        city: city,
        weather: weather
      };
      dispatch({
        type: ActionTypes.UPDATE_REMAINDER,
        payload: newDataRemainder
      });
    } catch (error) {
      dispatch(set_Error(ActionTypes.SET_ERROR, error));
    }
  };

export const setFilter = (payload) => ({
  type: ActionTypes.SET_FILTER,
  payload: payload
});
