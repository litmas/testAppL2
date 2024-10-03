import { getExerciseData, getShoulderData } from '../API/exerciseAPI.js';

class ExerciseGenerator {
  /**
   * Generates exercises based on the specified muscle, type, and difficulty.
   *
   * @async
   * @param {string} muscle - The muscle for which exercises need to be generated.
   * @param {string} [type=''] - The type of exercises to be generated. (Optional)
   * @param {string} [difficulty=''] - The difficulty level of exercises to be generated. (Optional)
   * @returns {Promise<Array>} - A promise that resolves to an array of exercises.
   */
  async generateExercises(muscle, type = '', difficulty = '') {
    try {
      const exercisesFromAPI = await getExerciseData(muscle, type, difficulty);
      return exercisesFromAPI;
    } catch (error) {
      console.error('Error in generating exercises:', error);
    }
  }
}

export default ExerciseGenerator;
