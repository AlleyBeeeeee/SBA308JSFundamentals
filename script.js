// The provided course information.
const courseInfo = {
  id: 451,
  name: "Introduction to JavaScript",
};

// The provided assignment group.
const assignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50,
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150,
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500,
    },
  ],
};

// The provided learner submission data.
const learnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47,
    },
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150,
    },
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400,
    },
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39,
    },
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140,
    },
  },
];

function getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions) {
  try {
    let learnerData = {};


    // group submissions by learner loop
  for (let i = 0; i < LearnerSubmissions.length; i++) {
    const submission = LearnerSubmissions[i];
    if (!learnerData[submission.learner_id]) {
      learnerData[submission.learner_id] = [];
    }
    learnerData[submission.learner_id].push(submission);
  }
  //array to hold results
  let results = [];

//loop for each learner
  for (let learner_id of Object.keys(learnerData)) {
    const learnerSubmissions = learnerData[learner_id];
    const learnerResult = { id: learner_id };

    let totalScore = 0;
    let totalPossible = 0;

    // each submission for learner loop
    for (const currentSubmission of learnerSubmissions) {
      const assignment = AssignmentGroup.assignments.find(
        (assign) => assign.id === currentSubmission.assignment_id
      );

//if due loop
      const current = new Date();
      const dueDate = new Date(currentSubmission.submission.submitted_at);
      if (current > dueDate) {
        continue;
      }
      if (assignment.points_possible === 0) {
        continue;
      }
      //penalty point loop and calculations
      let score = currentSubmission.submission.score;
      const dateSubmitted = new Date(currentSubmission.submission.submitted_at);
      if (dateSubmitted > dueDate) {
        const penalty = assignment.points_possible * 0.1;
        score -= penalty;
      }

      //final score calculations and for avg
      learnerResult[assignment.id] = score / assignment.points_possible;
      totalScore += score;
      totalPossible += assignment.points_possible
    }
    //final avg
    learnerResult.avg = totalScore / totalPossible
    results.push(learnerResult)
  }
  return results;
} catch (error) {
    console.error("An error occurred in the function:", error);
    return [];
  }}

console.log(getLearnerData(courseInfo, assignmentGroup, learnerSubmissions));

