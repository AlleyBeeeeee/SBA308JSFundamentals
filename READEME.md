
## Description
This program processes learner submission data for a course. It calculates a weighted average score for each learner and provides a breakdown of their percentage score on each assignment.
- Calculates a learner's weighted average score based on points_possible.
- Deducts a 10% late penalty for late submissions.
- Skips assignments that are not yet due or have a points_possible value of zero.
- Uses a `try...catch` block for error handling.