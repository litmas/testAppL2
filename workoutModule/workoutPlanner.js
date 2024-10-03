import ExerciseGenerator from './exerciseGenerator.js'; 
import { getShoulderData } from '../API/exerciseAPI.js';

class WorkoutPlanner {
  constructor() {
    this.exerciseGenerator = new ExerciseGenerator();
  }

  /**
   * Creates a workout plan based on the given muscles, type, and difficulty.
   *
   * @param {Array<string>} musclesEntered - The muscles to include in the workout plan.
   * @param {string} [type=''] - The type of exercises to include in the workout plan.
   * @param {string} [difficulty=''] - The difficulty level of the exercises to include in the workout plan.
   * @returns {Promise<Object>} - A promise that resolves to the workout plan object.
   */
  async createWorkout(musclesEntered, type = '', difficulty = '') {
    try {
      const workoutPlan = {};
      
      for (const muscle of musclesEntered) {
        let exercisesFromAPI;
        
        if (muscle === 'shoulders') {
          exercisesFromAPI = getShoulderData(muscle, type, difficulty);
        } else {
          exercisesFromAPI = await this.exerciseGenerator.generateExercises(muscle, type, difficulty);
        }

        if (exercisesFromAPI.length >= 3) {
          workoutPlan[muscle] = exercisesFromAPI.slice(0, 3);
        } else {
          workoutPlan[muscle] = exercisesFromAPI;
        }
      }
      
      return workoutPlan;
    } catch (error) {
      console.error('Error creating workout:', error);
      throw error;
    }
  }

  /**
   * Creates a workout split plan based on the user input.
   *
   * @async
   * @param {string} splitUserEntered - The user-selected workout split.
   * @param {string} [type=''] - The type of workout.
   * @param {string} [difficulty=''] - The difficulty level of the workout.
   * @returns {Promise<object>} - The generated workout split plan.
   */
  async createWorkoutSplit(splitUserEntered, type = '', difficulty = '') {
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
          const dailyWorkout = await this.createWorkout(day.muscles, type, difficulty);
          workoutPlan[`Day ${day.day}`] = dailyWorkout;
        }
      }

      return workoutPlan;
    } catch (error) {
      console.error('Error creating workout split:', error);
      throw error;
    }
  }
}

export default WorkoutPlanner;
