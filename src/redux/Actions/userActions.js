import { FETCH_USER, FETCH_RATINGHIST, FETCH_USUBMISSIONS } from "./types.js";
import { userinfo, userrating } from "./links.js";
import { trackPromise } from "react-promise-tracker";
import { userstatus } from "./links.js";

export const fetchUser = string => dispatch => {
  // console.log("User Fetched");
  const url = userinfo + string;
  //console.log(url);
  trackPromise(
    fetch(url)
      .then(res => res.json())
      .then(userData =>
        dispatch({
          type: FETCH_USER,
          payload: userData,
          name: string,
          userExists: 1,
          gotosearch: 0
        })
      )
      .catch(error => {
        dispatch({
          type: FETCH_USER,
          payload: error,
          userExists: 0,
          gotosearch: 1
        });
      })
  );
};

export const fetchRatingHist = string => dispatch => {
  // console.log("Rating History Fetched");
  const url = userrating + string;

  //  console.log(url);
  trackPromise(
    fetch(url)
      .then(res => res.json())
      .then(ratingData =>
        dispatch({
          type: FETCH_RATINGHIST,
          payload: ratingData,
          name: string
        })
      )
  );
};

var groupBy = function(data, key) {
  return data.reduce(function(storage, item) {
    var group = item[key];
    storage[group] = storage[group] || [];
    storage[group].push(item);
    return storage;
  }, {});
};

export const fetchUSubmissions = string => dispatch => {
  //console.log("Submissions Fetched");
  const url = userstatus + string;
  if (!string) {
    dispatch({
      type: FETCH_USUBMISSIONS,
      payload: "User not entered",
      gotosearch: 1
    });
  }
  trackPromise(
    fetch(url)
      .then(res => res.json())
      .then(submissionData => {
        // Group by with key
        //console.log(submissionData);
        var groupByProb = function(data, key) {
          return data.reduce(function(storage, item) {
            let index = 0;
            for (index = 0; index < item.problem[key].length; index++) {
              var group = item.problem[key][index];
              storage[group] = storage[group] || [];
              if (item.verdict === "OK") storage[group].push(item);
            }
            return storage;
          }, {});
        };

        let problemsbytags = groupByProb(submissionData.result, "tags");
        let tags = Object.keys(groupByProb(submissionData.result, "tags"));
        let byverdicts = groupBy(submissionData.result, "verdict");
        let verdicts = Object.keys(groupBy(submissionData.result, "verdict"));

        let usubmission = submissionData.result;

        let data2 = [];
        verdicts.map((tag, index) => {
          data2.push(byverdicts[tag].length);
          return 0;
        });
        let submissioninfo = [];
        let data = {
          name: "",
          num: 0
        };
        data.name = "Total Submissions";
        data.num = usubmission.length;
        submissioninfo.push(data);
        let data3 = {
          name: "",
          num: 0
        };
        data3.name = "Successfull Submissions";
        data3.num = data2[1];
        submissioninfo.push(data3);

        submissioninfo.push({
          name: "Unsuccessfull Submissions",
          num: data.num - data3.num
        });

        submissioninfo.push({
          name: "Average Attempts",
          num: data.num / data3.num
        });
        let problems = new Set();
        let uniqueprob = [];
        usubmission.map((question, index) => {
          if (!problems.has(question.problem.name)) {
            uniqueprob.push(question.problem);
          }
          problems.add(question.problem.name);
          return 0;
        });

        let countok = [];
        let countwa = [];
        let countot = [];
        let sumok = 0;
        let sumwa = 0;
        let sumot = 0;
        let maxrating = 0;
        let minrating = 10000000;
        let unsolved = [];

        let qbyindex = [];
        let solved = [];

        let languages = [];
        let langdata = [];

        for (let i = 0; i < usubmission.length; i++) {
          if (!languages.includes(usubmission[i].programmingLanguage)) {
            languages.push(usubmission[i].programmingLanguage);
            langdata[usubmission[i].programmingLanguage] = 0;
          } else {
            langdata[usubmission[i].programmingLanguage] += 1;
          }

          if (usubmission[i].verdict === "OK") {
            if (usubmission[i].problem.rating > maxrating)
              maxrating = usubmission[i].problem.rating;
            if (usubmission[i].problem.rating)
              sumok += usubmission[i].problem.rating;
            countok.push(usubmission[i].problem.rating);
            qbyindex[usubmission[i].problem.index[0]] =
              qbyindex[usubmission[i].problem.index[0]] + 1 || 1;
            if (solved.some(e => e.name === usubmission[i].problem.name)) {
              /* vendors contains the element we're looking for */
              //console.log("YE");
              continue;
            }
            solved.push(usubmission[i].problem.name);
          } else if (usubmission[i].verdict === "WRONG_ANSWER") {
            if (usubmission[i].problem.rating < minrating)
              minrating = usubmission[i].problem.rating;
            if (usubmission[i].problem.rating)
              sumwa += usubmission[i].problem.rating;
            countwa.push(usubmission[i].problem.rating);
          } else {
            if (usubmission[i].problem.rating < minrating)
              minrating = usubmission[i].problem.rating;
            if (usubmission[i].problem.rating)
              sumot += usubmission[i].problem.rating;
            countot.push(usubmission[i].problem.rating);
          }
        }
        languages = Object.keys(langdata);
        let langdata2 = [];
        for (let i = 0; i < languages.length; i++) {
          langdata2.push(langdata[languages[i]]);
        }

        let solvedlist = [];
        for (let i = 0; i < uniqueprob.length; i++) {
          if (!solved.includes(uniqueprob[i].name)) {
            unsolved.push(uniqueprob[i]);
          } else {
            solvedlist.push(uniqueprob[i]);
          }
        }
        let qbyindexlist = Object.keys(qbyindex);
        let sumtotal = sumok + sumwa + sumot;
        if (countok.length + countwa.length + countot.length > 0)
          sumtotal /= countok.length + countwa.length + countot.length;
        if (countok.length > 0) sumok /= countok.length;
        if (countwa.length > 0) sumwa /= countwa.length;
        if (countot.length > 0) sumot /= countot.length;

        let problemsinfo = [];
        problemsinfo.push({
          name: "Attempted",
          num: uniqueprob.length
        });
        problemsinfo.push({
          name: "Solved",
          num: data2[1]
        });

        problemsinfo.push({
          name: "Average Difficulty",
          num: Math.round(sumtotal)
        });

        problemsinfo.push({
          name: "Solved Average Difficulty",
          num: Math.round(sumok)
        });

        problemsinfo.push({
          name: "Wrong Average Difficulty",
          num: Math.round(sumwa)
        });
        problemsinfo.push({
          name: "Other Verdicts Average Difficulty",
          num: Math.round(sumot)
        });

        problemsinfo.push({
          name: "Max Difficulty among solved",
          num: Math.round(maxrating)
        });

        problemsinfo.push({
          name: "Min Difficulty among unsolved",
          num: Math.round(minrating)
        });

        dispatch({
          type: FETCH_USUBMISSIONS,
          name: string,
          tags: tags,
          byverdict: byverdicts,
          verdicts: verdicts,
          problemsbytags: problemsbytags,
          gotosearch: 0,
          problemsinfo: problemsinfo,
          unsolved: unsolved,
          solved: solvedlist,
          qbyindex: qbyindex,
          qbyindexlist: qbyindexlist,
          languages: languages,
          langdata: langdata2,
          verdictcount: data2,
          uniqueprob: uniqueprob,
          verdictinfo: submissioninfo,
          gotosearch: 0
        });
      })
      .catch(error => {
        //console.log("Error");
        dispatch({
          type: FETCH_USUBMISSIONS,
          payload: error,
          gotosearch: 1
        });
      })
  );
};
