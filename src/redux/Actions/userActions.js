import { FETCH_USER, FETCH_RATINGHIST } from "./types.js";
import { userinfo, userrating } from "./links.js";
import { trackPromise } from "react-promise-tracker";

export const fetchUser = string => dispatch => {
  console.log("User Fetched");
  if (!string) string = "tourist";
  const url = userinfo + string;
  console.log(url);
  trackPromise(
    fetch(url)
      .then(res => res.json())
      .then(userData =>
        dispatch({
          type: FETCH_USER,
          payload: userData,
          userExists: 1
        })
      )
      .catch(error => {
        dispatch({
          type: FETCH_USER,
          payload: error,
          userExists: 0
        });
      })
  );
};

export const fetchRatingHist = string => dispatch => {
  console.log("Rating History Fetched");
  if (!string) string = "tourist";
  const url = userrating + string;

  console.log(url);
  trackPromise(
    fetch(url)
      .then(res => res.json())
      .then(ratingData =>
        dispatch({
          type: "FETCH_RATINGHIST",
          payload: ratingData
        })
      )
  );
};
