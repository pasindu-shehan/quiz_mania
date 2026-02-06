const axios = require("axios");

async function getQuiz(params) {
  try {
    let string = "";
    Object.keys(params).forEach((value) => {
      string = string + `${value}=${params[value]}&`;
    });
    const last = string.split("");
    last.pop();
    const parameters = last.join("");

    let response = await axios.get(`https://opentdb.com/api.php?${parameters}`);

    let questions = response.data.results;

    questions.forEach((value) => {
      if (value.type == "multiple") {
        data = [];
        value.incorrect_answers.forEach((e) => {
          let randNum = Math.random() * 5;
          data.splice(randNum, 0, e);
        });

        data.splice(Math.random() * 5, 0, value.correct_answer);
        value.all_answers = data;
      }
      if (value.type == "boolean") {
        value.all_answers = ["True", "False"];
      }
    });
    return questions;
  } catch (error) {
    throw error;
  }
}

module.exports = { getQuiz };
