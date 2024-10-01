
import { generateExercises, createWorkout, createWorkoutSplit, getRecommendedRepsAndSets, getExerciseTips } from "./workoutModule/fitnessTracker.js";

// DOM elements
const generateExerciseForm = document.getElementById("generateExerciseForm");
const exerciseResultDisplay = document.getElementById("exerciseResultDisplay");
const createWorkoutForm = document.getElementById("createWorkoutForm");
const workoutResultDisplay = document.getElementById("workoutResultDisplay");
const workoutSplitForm = document.getElementById("workoutSplitForm");
const splitResultDisplay = document.getElementById("splitResultDisplay");


/**
 * Event listener for the submit event of the exercise form.
 * It retrieves the form values, generates the exercises,
 * and displays them on the page.
 */
generateExerciseForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const muscle = document.getElementById("exerciseMuscle").value;
  const type = document.getElementById("exerciseType").value;
  const difficulty = document.getElementById("exerciseDifficulty").value;

  console.log("Form submitted with values:", { muscle, type, difficulty });

  try {
    const exercises = await generateExercises(muscle, type, difficulty);
    console.log(exercises)

    console.log("Fetched exercises:", exercises);

    if (exercises && exercises.length > 0) {
      exerciseResultDisplay.innerHTML = exercises.map(exercise => `
        <p>Name: ${exercise.name}<br>
        Type: ${exercise.type}<br>
        Muscle: ${exercise.muscle}<br>
        Difficulty: ${exercise.difficulty}<br>
        Instructions: ${exercise.instructions}</p>`).join('');

        const recommendations = getRecommendedRepsAndSets(difficulty);
      exerciseResultDisplay.innerHTML += `
        <p><strong>Recommended Sets:</strong> ${recommendations.sets}</p>
        <p><strong>Recommended Reps:</strong> ${recommendations.reps}</p>`;

        const tips = getExerciseTips(type);
      exerciseResultDisplay.innerHTML += `
        <p><strong>Exercise Tips:</strong> ${tips}</p>`;

    } else {
      exerciseResultDisplay.innerHTML = `<p>No exercises found for the selected criteria.</p>`;
    }
  } catch (error) {
    console.error("Error fetching exercises:", error);
    exerciseResultDisplay.innerHTML = `<p>Error: ${error.message}</p>`;
  }
});

/**
 * Event listener for the submit event of the workout form.
 * It retrieves the form values, creates the workout,
 * and displays the workout plan on the page.
 */
createWorkoutForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const muscles = document.getElementById("muscles").value.split(",").map(muscle => muscle.trim());
  const type = document.getElementById("workoutType").value;
  const difficulty = document.getElementById("difficulty").value;

  try {
      const workout = await createWorkout(muscles, type, difficulty);

      workoutResultDisplay.innerHTML = `
          <div class="workout-plan">
              ${Object.entries(workout).map(([muscle, exercises]) => `
                  <h3>${muscle}</h3>
                  <ul>
                      ${exercises.map(exercise => `
                          <li>
                              <strong>Name:</strong> ${exercise.name}<br>
                              <strong>Type:</strong> ${exercise.type}<br>
                              <strong>Muscle:</strong> ${exercise.muscle}<br>
                              <strong>Difficulty:</strong> ${exercise.difficulty}<br>
                              <strong>Instructions:</strong> ${exercise.instructions}
                          </li>
                      `).join('')}
                  </ul>
              `).join('')}
          </div>
      `;

  } catch (error) {
      workoutResultDisplay.innerHTML = `<p>Error creating workout: ${error.message}</p>`;
  }
});

/**
 * Event listener for the submit event of the workout split form.
 * It retrieves the form values, creates the workout split,
 * and logs the workout plan to the console.
 */
workoutSplitForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const splitType = document.getElementById("splitType").value;
  const workoutType = document.getElementById("splitWorkoutType").value;
  const difficulty = document.getElementById("splitDifficulty").value;

  try {

    const workoutPlan = await createWorkoutSplit(splitType, workoutType, difficulty);

    console.log("Workout Plan:", workoutPlan);

    splitResultDisplay.innerHTML = `
      <h2>${splitType.charAt(0).toUpperCase() + splitType.slice(1)} Workout Plan</h2>
      <div class="workout-splits">
        ${Object.entries(workoutPlan).map(([day, muscles]) => `
          <div class="day">
            <h3>${day}: ${typeof muscles === 'string' ? muscles : Object.keys(muscles).join(', ')}</h3>
            ${typeof muscles === 'object' && !Array.isArray(muscles) ? Object.entries(muscles).map(([muscleGroup, exercises]) => `
              <div class="muscle-group">
                <h4>${muscleGroup}</h4>
                <ul>
                  ${exercises.map(exercise => `
                    <li>
                      <strong>Name:</strong> ${exercise.name}<br>
                      <strong>Type:</strong> ${exercise.type}<br>
                      <strong>Muscle:</strong> ${exercise.muscle}<br>
                      <strong>Difficulty:</strong> ${exercise.difficulty}<br>
                      <strong>Instructions:</strong> ${exercise.instructions}
                    </li>
                  `).join('')}
                </ul>
              </div>
            `).join('') : ''}
          </div>
        `).join('')}
      </div>
    `;
  } catch (error) {
    splitResultDisplay.innerHTML = `<p>Error creating workout split: ${error.message}</p>`;
  }
});
