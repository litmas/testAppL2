
const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': '19668c176bmsha76050a4b747794p188878jsnd448d56c8fd9',
    'x-rapidapi-host': 'exercises-by-api-ninjas.p.rapidapi.com'
  }
};
const baseURL = 'https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises';

/**
 * Retrieves exercise data from the API based on muscle, type, and difficulty parameters.
 *
 * @param {string} muscle - The muscle for which to retrieve exercise data.
 * @param {string} [type=''] - The type of exercise (optional).
 * @param {string} [difficulty=''] - The difficulty level of exercise (optional).
 * @returns {Promise<any>} - A promise that resolves to the fetched exercise data.
 * @throws {Error} - If there is an error fetching the exercise data.
 */
export const getExerciseData = async (muscle, type = '', difficulty = '') => {
  try {
    let url = `${baseURL}?muscle=${muscle}`;
    if (type) url += `&type=${type}`;
    if (difficulty) url += `&difficulty=${difficulty}`;

    const response = await fetch(url, options);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error fetching exercise data:', error);
    throw error;
  }
};

/**
 * Retrieves shoulder exercises based on specified filters.
 *
 * @param {string} muscle - The target muscle group for the exercises.
 * @param {string} type - The type of exercise (Strength, Powerlifting, Strongman).
 * @param {string} difficulty - The difficulty level of the exercise (Beginner, Intermediate, Expert).
 * @returns {Array} - An array of objects representing matching shoulder exercises.
 */
export const getShoulderData = (muscle, type = '', difficulty = '') => {
    const shoulderExercises = [
        {
            "name": "Overhead Press",
            "type": "Strength",
            "muscle": "Shoulders",
            "equipment": "Dumbbells",
            "difficulty": "Expert",
            "instructions": "There are multiple variations of this exercise where you can either use a shoulder press machine, where you press the weight upwards. This is best for intermediate lifters. Then there is the overhead press with either dumbells or a bar which if you are pressing a lot of weight can easily lead to bad form or injury which is why this exercise is classed in expert. You do this exercise by sitting up right on a bench and then pressing the dumbbells/Barbell above your head."
        },
        {
           "name": "Lateral Raise",
            "type": "Strength",
            "muscle": "Shoulders",
            "equipment": "Dumbbells",
            "difficulty": "Intermediate",
            "instructions": "The lateral raise can either be done whilst standing or sitting up right on a bench. Grab some reasonably light dumbells and lift the dumbells laterally, activating your posterior deltoids and upper back muscles.  "
        },
        {
            "name": "Cable Lateral Raise",
             "type": "Strength",
             "muscle": "Shoulders",
             "equipment": "Cable Machine",
             "difficulty": "Beginner",
             "instructions": "Using an appropriate one handed handle, attach it to the cable machine and drop the handel to the lowest point. After that use reasonably light weight and lift it laterally. You should be standing side on to the cable machine when lifting."
         },
         {
            "name": "Front Raise",
             "type": "Powerlifting",
             "muscle": "Shoulders",
             "equipment": "Dumbbells",
             "difficulty": "Beginner",
             "instructions": "The front raise exercise is used in weight training. It primarily works the anterior deltoid and the clavicular head of the pectoralis major through the use of arm abduction and flexion through the frontal plane. Grab two reasonably light dumbbells and hold them with your palms facind down. Holding them at your hips lift them vertically up without bending your arms."
         },
         {
            "name": "Arnold Press",
             "type": "Powerlifting",
             "muscle": "Shoulders",
             "equipment": "Dumbbells",
             "difficulty": "Intermediate",
             "instructions": "The Arnold Press is a variation of the military press, but one that more effectively hits all three heads (the front, lateral, and rear) of your deltoids. Grab two dumbbells and whilst standing lift them above your shoudlers. After that press up the way, similar to an overhead press."
         },
         {
            "name": "Circus Dumbbell Press",
             "type": "Strongman",
             "muscle": "Shoulders",
             "equipment": "Dumbbell",
             "difficulty": "Expert",
             "instructions": "First is the clean to the shoulder. Grab the dumbbell with either one or both hands (if you need the extra stability). Keep your feet shoulder-width apart or slightly further out for more stability. From here, bend your knees and pull the dumbbell to your shoulder, using the momentum from your hips. Take your other hand off the dumbbell and use it as a counter weight.Once you have yourself steady, take a breath to brace your core, then press the dumbbell overhead and lock out your elbow. As the weight of the dumbbell goes up, you will need to adopt a push press or split jerk stance. I would recommend a push press unless you have a solid Olympic lifting background."
         },
         {
            "name": "Viking Press",
             "type": "Strongman",
             "muscle": "Shoulders",
             "equipment": "Barbell/Machine",
             "difficulty": "Intermediate",
             "instructions": "The viking press is usually a rep-based event in a given time frame, typically 60 seconds. It's a neutral grip press, meaning your hands face inward. It's hard to find a gym with equipment specific to the viking press, even in strongman gyms. But fear not! You can easily mimic this movement with a power rack, two barbells and safety bars.At your power rack, set one side of the safety pins at shoulder height and the other side at the next lowest setting. On the lower setting, sandwich the safety pin between two 5kg (10lb) plates with collars on each end. There will be a space between the two plates where the barbell sits on the safety bar. On the higher side, stand outside the power rack and load the plates for your desired weight.From here, use the ends of the two barbells as handles. You can either strict press or push press the weight up. A “good lift” is given once the body is straight, elbows locked and head through."
         },
         {
            "name": "Barbell Military Press",
             "type": "Powerlifting",
             "muscle": "Shoulders",
             "equipment": "Barbell",
             "difficulty": "Expert",
             "instructions": " Adjust the barbell to just below shoulder height then load the desired weight onto the bar. Assume a shoulder width stance and place your hands at (or just outside of) shoulder width with a pronated grip on the bar. Step underneath the bar and unrack it while keeping the spine in a neutral position. Take two steps back, inhale, brace, tuck the chin, then press the bar to lockout overhead. Exhale once the bar gets to lockout and reverse the movement slowly while controlling the bar back to your chest. Repeat for the desired number of repetitions"
         },
    ]
    return shoulderExercises.filter(exercise => {
        const matchesType = type ? exercise.type.toLowerCase() === type.toLowerCase() : true;
        const matchesDifficulty = difficulty ? exercise.difficulty.toLowerCase() === difficulty.toLowerCase() : true;
        return matchesType && matchesDifficulty;
    });
}
