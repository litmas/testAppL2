class WorkoutUtility {
    /**
     * Returns the recommended number of sets and reps based on the given difficulty level.
     *
     * @param {string} difficulty - The difficulty level ("beginner", "intermediate", or "expert").
     * @returns {Object} An object containing the recommended number of sets and reps.
     */
    getRecommendedRepsAndSets(difficulty) {
      const recommendations = {
        beginner: { sets: 3, reps: "10-12" },
        intermediate: { sets: 4, reps: "8-10" },
        expert: { sets: 5, reps: "6-8" }
      };
  
      return recommendations[difficulty] || { sets: 3, reps: 10 };
    }
  
    /**
     * Returns exercise tips based on the given exercise type.
     * If the exercise type is not found, a generic tip is returned.
     *
     * @param {string} exerciseType - The type of exercise.
     * @returns {string} - The exercise tip.
     */
    getExerciseTips(exerciseType) {
      const tips = {
        strength: "Focus on form over weight. Lift heavier but with control.",
        strongman: "Focus on lifting heavy whilst also maintaining control of the weight to reduce risk of injury.",
        powerlifting: "Hold stretches for at least 30 seconds, don't rush.",
        chest: "Ensure proper range of motion and avoid bouncing weights off the chest.",
        lats: "Engage the lats throughout and maintain a neutral spine."
      };
  
      return tips[exerciseType] || "Stay hydrated and maintain proper form.";
    }
  }
  
  export default WorkoutUtility;
  