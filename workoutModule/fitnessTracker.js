import { getExerciseData, getShoulderData } from '../API/exerciseAPI.js';

/**
 * Generates exercises based on the specified muscle, type, and difficulty.
 *
 * @async
 * @param {string} muscle - The muscle for which exercises need to be generated.
 * @param {string} [type=''] - The type of exercises to be generated. (Optional)
 * @param {string} [difficulty=''] - The difficulty level of exercises to be generated. (Optional)
 * @returns {Promise<Array>} - A promise that resolves to an array of exercises.
 */
export const generateExercises = async (muscle, type = '', difficulty = '') => {
  try {
    const exercisesFromAPI = await getExerciseData(muscle, type, difficulty);
    return exercisesFromAPI
  } catch (error) {
    console.error('Error in tracking exercises:', error);
  }
};
// If you want to display the data in the terminal you have to call the function. To do this uncomment the line below.
/* generateExercises('biceps', 'strength', 'intermediate') */

/**
 * Creates a workout plan based on the given muscles, type, and difficulty.
 *
 * @param {Array<string>} musclesEntered - The muscles to include in the workout plan.
 * @param {string} [type=''] - The type of exercises to include in the workout plan.
 * @param {string} [difficulty=''] - The difficulty level of the exercises to include in the workout plan.
 * @returns {Promise<Object>} - A promise that resolves to the workout plan object.
 */
export const createWorkout = async (musclesEntered, type = '', difficulty = '') => {
  try {
    const workoutPlan = {};

    for (const muscle of musclesEntered) {
      let exercisesFromAPI;

      if (muscle === 'shoulders') {
        exercisesFromAPI = getShoulderData(muscle, type, difficulty);
      } else {
        exercisesFromAPI = await getExerciseData(muscle, type, difficulty);
      }
      if (exercisesFromAPI.length >= 3) {
        workoutPlan[muscle] = exercisesFromAPI.slice(0, 3);
      } else {
        workoutPlan[muscle] = exercisesFromAPI;
      }
    }
    return workoutPlan
  } catch (error) {
    console.error('Error creating workout:', error);
    throw error;
  }
};
// If you want to display the data in the terminal you have to call the function. To do this uncomment the line below.
/* createWorkout(['triceps', 'chest', 'shoulders', 'strength', 'beginner']) */

// Function to create the workout split plan for a week
/**
 * Creates a workout split plan based on the user input.
 *
 * @async
 * @param {string} splitUserEntered - The user-selected workout split.
 * @param {string} [type=''] - The type of workout.
 * @param {string} [difficulty=''] - The difficulty level of the workout.
 * @returns {Promise<object>} - The generated workout split plan.
 */
export const createWorkoutSplit = async (splitUserEntered, type = '', difficulty = '') => {
    try {
      const workoutPlan = {};

      const allSplitsAvailable = {
        pplSplit: [
          { day: 1, muscles: ['chest', 'shoulders', 'triceps'] },
          { day: 2, muscles: ['lats', 'middle_back', 'biceps'] },
          { day: 3, muscles: ['quadriceps', 'hamstrings', 'adductors', 'glutes'] },
          { day: 4, rest: true },
          { day: 5, muscles: ['chest', 'shoulders', 'triceps'] },
          { day: 6, muscles: ['lats', 'lower_back', 'biceps'] },
          { day: 7, muscles: ['quadriceps', 'hamstrings', 'abductors', 'glutes'] }
        ],
          arnoldSplit: [
          { day: 1, muscles: ['chest', 'lats', 'middle_back'] },
          { day: 2, muscles: ['shoulders', 'biceps', 'triceps'] },
          { day: 3, muscles: ['quadriceps', 'hamstrings', 'adductors', 'glutes'] },
          { day: 4, muscles: ['chest', 'lats', 'lower_back'] },
          { day: 5, muscles: ['shoulders', 'biceps', 'triceps'] },
          { day: 6, muscles: ['quadriceps', 'hamstrings', 'abductors', 'glutes'] },
          { day: 7, rest: true }
        ],
        fullBodySplit: [
          { day: 1, muscles: ['chest', 'lats', 'quadriceps', 'hamstrings', 'glutes', 'biceps', 'triceps', 'shoulders']},
          { day: 2, rest: true },
          { day: 3, muscles: ['chest', 'lats', 'quadriceps', 'hamstrings', 'glutes', 'biceps', 'triceps', 'shoulders']},
          { day: 4, rest: true },
          { day: 5, muscles: ['chest', 'lats', 'quadriceps', 'hamstrings', 'glutes', 'biceps', 'triceps', 'shoulders'] },
          { day: 6, rest: true },
          { day: 7, rest: true }
        ],
        upperLowerSplit: [
          { day: 1, muscles: ['chest', 'lats', 'middle_back', 'biceps', 'triceps', 'shoulders'] },
          { day: 2, muscles: ['quadriceps', 'hamstrings', 'adductors', 'glutes'] },
          { day: 3, rest: true },
          { day: 4, muscles: ['chest', 'lats', 'lower_back', 'biceps', 'triceps', 'shoulders'] },
          { day: 5, muscles: ['quadriceps', 'hamstrings', 'abductors', 'glutes'] },
          { day: 6, rest: true },
          { day: 7, rest: true }
        ],
        fourDaySplit: [
          { day: 1, muscles: ['lats', 'middle_back', 'biceps'] },
          { day: 2, muscles: ['chest', 'triceps'] },
          { day: 3, rest: true },
          { day: 4, muscles: ['quadriceps', 'hamstrings', 'adductors', 'glutes']},
          { day: 5, muscles: ['shoulders'] },
          { day: 6, rest: true },
          { day: 7, rest: true }
        ],
        fiveDaySplit: [
          { day: 1, muscles: ['chest'] },
          { day: 2, muscles: ['lats', 'middle_back'] },
          { day: 3, muscles: ['shoulders', 'traps'] },
          { day: 4, muscles: ['quadriceps', 'hamstrings', 'glutes'] },
          { day: 5, muscles: ['biceps', 'triceps'] },
          { day: 6, rest: true },
          { day: 7, rest: true }
        ]
      };

      const selectedSplit = allSplitsAvailable[splitUserEntered];

      if (!selectedSplit) {
        throw new Error('Invalid split type');
      }

      for (const day of selectedSplit) {
        if (day.rest) {
          workoutPlan[`Day ${day.day}`] = 'Rest day';
        } else {
          const dailyWorkout = await createWorkout(day.muscles, type, difficulty);
          workoutPlan[`Day ${day.day}`] = dailyWorkout;
        }
      }

    return workoutPlan

    } catch (error) {
      console.error('Error creating workout split:', error);
      throw error;
    }
  };
  // If you want to display the data in the terminal you have to call the function. To do this uncomment the line below.
  /* createWorkout('fourDaySplit', 'strongman', 'intermediate') */


/**
 * Returns the recommended number of sets and reps based on the given difficulty level.
 *
 * @param {string} difficulty - The difficulty level ("beginner", "intermediate", or "expert").
 * @returns {Object} An object containing the recommended number of sets and reps.
 * @throws {TypeError} If the difficulty parameter is not a string.
 * @throws {Error} If the difficulty parameter is not one of the valid difficulty levels.
 */
export const getRecommendedRepsAndSets = (difficulty) => {
  const recommendations = {
    beginner: { sets: 3, reps: "10-12" },
    intermediate: { sets: 4, reps: "8-10" },
    expert: { sets: 5, reps: "6-8" }
  };

  return recommendations[difficulty] || { sets: 3, reps: 10 };
};
  // If you want to display the data in the terminal you have to call the function. To do this uncomment the line below.
  /* getRecommendedRepsAndSets('beginner') */

/**
 * Returns exercise tips based on the given exercise type.
 * If the exercise type is not found, a generic tip is returned.
 *
 * @param {string} exerciseType - The type of exercise.
 * @returns {string} - The exercise tip.
 */
export const getExerciseTips = (exerciseType) => {
  const tips = {
    strength: "Focus on form over weight. Lift heavier but with control.",
    strongman: "Focus on lifting heavy whilst also maintaining control of the weight to reduce risk of injury.",
    powerlifting: "Hold stretches for at least 30 seconds, don't rush.",
    chest: "Ensure proper range of motion and avoid bouncing weights off the chest.",
    lats: "Engage the lats throughout and maintain a neutral spine."
  };

  return tips[exerciseType] || "Stay hydrated and maintain proper form.";
};
  // If you want to display the data in the terminal you have to call the function. To do this uncomment the line below.
  /* getExerciseTips('chest') */
