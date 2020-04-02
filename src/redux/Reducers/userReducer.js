import { FETCH_USER, FETCH_RATINGHIST } from "../Actions/types.js";

const initialState = {
  name: "",
  info: {
    contribution: "",
    lastOnlineTimeSeconds: "",
    rating: "",
    friendOfCount: "",
    titlePhoto: "",
    rank: "",
    handle: "-e",
    maxRating: "",
    avatar: "",
    registrationTimeSeconds: "",
    maxRank: ""
  },
  ratingHist: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
    case FETCH_USER:
      console.log(JSON.stringify(action.payload));
      if (action.payload.result) {
        console.log(action.payload.result);
        return {
          ...state,
          name: action.payload.result[0].handle,
          info: action.payload.result[0],
          userExists: action.userExists
        };
      } else {
        return {
          ...state,
          name: "User_Not_Found",
          //info: initialState.info,
          userExists: action.userExists
        };
      }
    case FETCH_RATINGHIST: {
      //?console.log(action.payload.result);
      return {
        ...state,
        ratingHist: action.payload.result
      };
    }
  }
}
