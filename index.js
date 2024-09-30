
import { generateExercises, createWorkout, createWorkoutSplit, getRecommendedRepsAndSets, getExerciseTips } from "./assignmentL2/workoutModule/fitnessTracker.js";

// Select DOM elements for the forms and result displays
const generateExerciseForm = document.getElementById("generateExerciseForm");
const exerciseResultDisplay = document.getElementById("exerciseResultDisplay");
const createWorkoutForm = document.getElementById("createWorkoutForm");
const workoutResultDisplay = document.getElementById("workoutResultDisplay");
const workoutSplitForm = document.getElementById("workoutSplitForm");
const splitResultDisplay = document.getElementById("splitResultDisplay");



// generateExercises 
generateExerciseForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Get user input values
  const muscle = document.getElementById("exerciseMuscle").value;
  const type = document.getElementById("exerciseType").value;
  const difficulty = document.getElementById("exerciseDifficulty").value;

  // Debugging: Check if inputs are being captured correctly
  console.log("Form submitted with values:", { muscle, type, difficulty });

  try {
    // Fetch exercises
    const exercises = await generateExercises(muscle, type, difficulty);
    console.log(exercises)
    
    // Debugging: Log the fetched exercises
    console.log("Fetched exercises:", exercises);

    // Display the exercises (if any were fetched)
    if (exercises && exercises.length > 0) {
      exerciseResultDisplay.innerHTML = exercises.map(exercise => `
        <p>Name: ${exercise.name}<br>
        Type: ${exercise.type}<br>
        Muscle: ${exercise.muscle}<br>
        Difficulty: ${exercise.difficulty}<br>
        Instructions: ${exercise.instructions}</p>`).join('');

            // Display recommended sets and reps
      const recommendations = getRecommendedRepsAndSets(difficulty);
      exerciseResultDisplay.innerHTML += `
        <p><strong>Recommended Sets:</strong> ${recommendations.sets}</p>
        <p><strong>Recommended Reps:</strong> ${recommendations.reps}</p>`;

      // Display exercise tips
      const tips = getExerciseTips(type);
      exerciseResultDisplay.innerHTML += `
        <p><strong>Exercise Tips:</strong> ${tips}</p>`;
      
    } else {
      exerciseResultDisplay.innerHTML = `<p>No exercises found for the selected criteria.</p>`;
    }
  } catch (error) {
    // Debugging: Log any errors
    console.error("Error fetching exercises:", error);
    exerciseResultDisplay.innerHTML = `<p>Error: ${error.message}</p>`;
  }
});

// Create Workout Function
createWorkoutForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  
  // Get user input values
  const muscles = document.getElementById("muscles").value.split(",").map(muscle => muscle.trim());
  const type = document.getElementById("workoutType").value;
  const difficulty = document.getElementById("difficulty").value;
  
  try {
      // Create workout
      const workout = await createWorkout(muscles, type, difficulty);
      
      // Display the workout
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



workoutSplitForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  
  const splitType = document.getElementById("splitType").value;
  const workoutType = document.getElementById("splitWorkoutType").value;
  const difficulty = document.getElementById("splitDifficulty").value;
  
  try {
    // Generate workout split
    const workoutPlan = await createWorkoutSplit(splitType, workoutType, difficulty);
    
    // Log the workout plan for debugging
    console.log("Workout Plan:", workoutPlan);
    
    // Display the workout splits
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