import { ActionTypes } from "../constants/actionTypes";

const initialState = {
  remainders: [],
  filteredRemainders: [],
  error: "",
  status: "",
  loading: true,
  filter: "all"
};

export const remainderReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.REQUEST_CREATE_REMAINDER:
      return {
        ...state,
        error: "",
        status: "requested",
        loading: true
      };
    case ActionTypes.REQUEST_UPDATE_REMAINDER:
      return {
        ...state,
        error: "",
        status: "requested",
        loading: true
      };
    case ActionTypes.CREATE_REMAINDER:
      return {
        ...state,
        remainders: [...state.remainders, payload],
        filteredRemainders: state.remainders,
        error: "",
        status: "created",
        loading: false
      };
    case ActionTypes.UPDATE_REMAINDER: {
      const index = state.remainders.findIndex((rem) => rem.id === payload.id);
      const newArray = [...state.remainders];
      newArray[index].text = payload.text;
      newArray[index].date = payload.date;
      newArray[index].time = payload.time;
      newArray[index].city = payload.city;
      newArray[index].weather = payload.weather;
      return {
        ...state,
        remainders: newArray,
        error: "",
        status: "updated",
        loading: false
      };
    }
    case ActionTypes.SET_FILTER: {
      if (payload === "all") {
        return {
          ...state,
          filteredRemainders: state.remainders.sort((a, b) =>
            a.date > b.date ? 1 : -1
          ),
          filter: payload,
          error: "",
          status: "filtered",
          loading: false
        };
      } else {
        const filterRemainders = state.remainders.filter(
          (rem) => rem.date.slice(8, 10) === payload
        );
        return {
          ...state,
          filteredRemainders: filterRemainders.sort((a, b) =>
            a.time > b.time ? 1 : -1
          ),
          filter: payload,
          error: "",
          status: "filtered",
          loading: false
        };
      }
    }
    case ActionTypes.SET_ERROR:
      return {
        ...state,
        error: payload,
        status: "error",
        loading: true
      };
    default:
      return state;
  }
};
