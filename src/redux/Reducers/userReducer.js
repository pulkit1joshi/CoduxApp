import {
  FETCH_USER,
  FETCH_RATINGHIST,
  FETCH_USUBMISSIONS
} from "../Actions/types.js";

const initialState = {
  gotosearch: 1,
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
  ratingHist: [],
  tags: [],
  byverdict: [],
  verdicts: [],
  problemsbytags: [],
  gotosearch: 0,
  problemsinfo: [],
  unsolved: [],
  solved: [],
  qbyindex: [],
  qbyindexlist: [],
  languages: [],
  langdata: [],
  verdictcount: [],
  uniqueprob: [],
  verdictinfo: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
    case FETCH_USER:
      if (!action.name) {
        return {
          ...state,
          gotosearch: 1
        };
      } else if (action.payload.result) {
        // console.log(action.payload.result);
        return {
          ...state,
          name: action.name,
          info: action.payload.result[0],
          userExists: action.userExists,
          gotosearch: 0
        };
      } else {
        return {
          ...state,
          name: "User_Not_Found",
          gotosearch: 1,
          //info: initialState.info,
          userExists: action.userExists
        };
      }
    case FETCH_RATINGHIST: {
      //?console.log(action.payload.result);
      if (!action.name) {
        return {
          ...state,
          gotosearch: 1
        };
      } else if (!action.payload.result) {
        return {
          ...state,
          gotosearch: 1
        };
      } else {
        return {
          ...state,
          ratingHist: action.payload.result,
          name: action.name,
          userExists: action.userExists,
          gotosearch: 0
        };
      }
    }
    case FETCH_USUBMISSIONS: {
      //console.log(action);
      if (!action.name) {
        console.log("Name not found");
        return {
          ...state,
          gotosearch: 1
        };
      } else if (!action.tags) {
        console.log("Tags not found");
        return {
          ...state,
          gotosearch: 1
        };
      } else {
        return {
          ...state,
          tags: action.tags,
          byverdict: action.byverdict,
          verdicts: action.verdicts,
          problemsbytags: action.problemsbytags,
          gotosearch: 0,
          problemsinfo: action.problemsinfo,
          unsolved: action.unsolved,
          solved: action.solved,
          qbyindex: action.qbyindex,
          qbyindexlist: action.qbyindexlist,
          languages: action.languages,
          langdata: action.langdata,
          verdictcount: action.verdictcount,
          uniqueprob: action.uniqueprob,
          verdictinfo: action.verdictinfo,
          gotosearch: action.gotosearch
        };
      }
    }
  }
}
