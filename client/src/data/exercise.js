const beginnerExercises = [
  {
    dayType: "Chest & Triceps",
    exercises: [
      {
        name: "Bench Press",
        sets: 3,
        reps: 10,
        rest: "60 seconds",
        caloriesBurned: "150",
      },
      {
        name: "Incline Dumbbell Press",
        sets: 3,
        reps: 10,
        rest: "60 seconds",
        caloriesBurned: "120",
      },
      {
        name: "Tricep Dips",
        sets: 3,
        reps: 10,
        rest: "60 seconds",
        caloriesBurned: "100",
      },
      {
        name: "Tricep Pushdown",
        sets: 3,
        reps: 10,
        rest: "60 seconds",
        caloriesBurned: "80",
      },
    ],
  },
  {
    dayType: "Back & Biceps",
    exercises: [
      {
        name: "Lat Pulldown",
        sets: 3,
        reps: 10,
        rest: "60 seconds",
        caloriesBurned: "150",
      },
      {
        name: "Seated Cable Row",
        sets: 3,
        reps: 10,
        rest: "60 seconds",
        caloriesBurned: "120",
      },
      {
        name: "Barbell Curl",
        sets: 3,
        reps: 10,
        rest: "60 seconds",
        caloriesBurned: "100",
      },
      {
        name: "Hammer Curl",
        sets: 3,
        reps: 10,
        rest: "60 seconds",
        caloriesBurned: "80",
      },
    ],
  },
  {
    dayType: "Rest",
    exercises: [],
  },
  {
    dayType: "Legs & Shoulders",
    exercises: [
      {
        name: "Squats",
        sets: 3,
        reps: 10,
        rest: "60 seconds",
        caloriesBurned: "200",
      },
      {
        name: "Leg Press",
        sets: 3,
        reps: 10,
        rest: "60 seconds",
        caloriesBurned: "150",
      },
      {
        name: "Overhead Press",
        sets: 3,
        reps: 10,
        rest: "60 seconds",
        caloriesBurned: "120",
      },
      {
        name: "Lateral Raise",
        sets: 3,
        reps: 10,
        rest: "60 seconds",
        caloriesBurned: "80",
      },
    ],
  },
  {
    dayType: "Rest",
    exercises: [],
  },
  {
    dayType: "Full Body",
    exercises: [
      {
        name: "Deadlift",
        sets: 3,
        reps: 10,
        rest: "60 seconds",
        caloriesBurned: "200",
      },
      {
        name: "Bent Over Row",
        sets: 3,
        reps: 10,
        rest: "60 seconds",
        caloriesBurned: "150",
      },
      {
        name: "Push Ups",
        sets: 3,
        reps: 10,
        rest: "60 seconds",
        caloriesBurned: "100",
      },
      {
        name: "Pull Ups",
        sets: 3,
        reps: 10,
        rest: "60 seconds",
        caloriesBurned: "120",
      },
    ],
  },
  {
    dayType: "Cardio & Abs",
    exercises: [
      {
        name: "Treadmill Run",
        sets: 1,
        reps: "30 minutes",
        rest: "None",
        caloriesBurned: "300",
      },
      {
        name: "Crunches",
        sets: 3,
        reps: 15,
        rest: "60 seconds",
        caloriesBurned: "50",
      },
      {
        name: "Plank",
        sets: 3,
        reps: "60 seconds",
        rest: "60 seconds",
        caloriesBurned: "50",
      },
    ],
  },
];

const intermediateExercises = [
  {
    dayType: "Chest & Triceps",
    exercises: [
      {
        name: "Incline Barbell Bench Press",
        sets: 4,
        reps: 8,
        rest: "90 seconds",
        caloriesBurned: "180",
      },
      {
        name: "Dumbbell Flyes",
        sets: 4,
        reps: 8,
        rest: "90 seconds",
        caloriesBurned: "140",
      },
      {
        name: "Close-Grip Bench Press",
        sets: 4,
        reps: 8,
        rest: "90 seconds",
        caloriesBurned: "130",
      },
      {
        name: "Tricep Pushdown",
        sets: 4,
        reps: 8,
        rest: "90 seconds",
        caloriesBurned: "100",
      },
    ],
  },
  {
    dayType: "Back & Biceps",
    exercises: [
      {
        name: "Bent Over Barbell Row",
        sets: 4,
        reps: 8,
        rest: "90 seconds",
        caloriesBurned: "180",
      },
      {
        name: "Wide-Grip Pull-Up",
        sets: 4,
        reps: 8,
        rest: "90 seconds",
        caloriesBurned: "140",
      },
      {
        name: "Barbell Curl",
        sets: 4,
        reps: 8,
        rest: "90 seconds",
        caloriesBurned: "120",
      },
      {
        name: "Hammer Curl",
        sets: 4,
        reps: 8,
        rest: "90 seconds",
        caloriesBurned: "100",
      },
    ],
  },
  {
    dayType: "Rest",
    exercises: [],
  },
  {
    dayType: "Legs & Shoulders",
    exercises: [
      {
        name: "Barbell Squats",
        sets: 4,
        reps: 8,
        rest: "90 seconds",
        caloriesBurned: "240",
      },
      {
        name: "Leg Press",
        sets: 4,
        reps: 8,
        rest: "90 seconds",
        caloriesBurned: "180",
      },
      {
        name: "Military Press",
        sets: 4,
        reps: 8,
        rest: "90 seconds",
        caloriesBurned: "140",
      },
      {
        name: "Arnold Press",
        sets: 4,
        reps: 8,
        rest: "90 seconds",
        caloriesBurned: "120",
      },
    ],
  },
  {
    dayType: "Rest",
    exercises: [],
  },
  {
    dayType: "Full Body",
    exercises: [
      {
        name: "Deadlift",
        sets: 4,
        reps: 8,
        rest: "90 seconds",
        caloriesBurned: "240",
      },
      {
        name: "Weighted Pull-Up",
        sets: 4,
        reps: 8,
        rest: "90 seconds",
        caloriesBurned: "160",
      },
      {
        name: "Weighted Dips",
        sets: 4,
        reps: 8,
        rest: "90 seconds",
        caloriesBurned: "140",
      },
      {
        name: "Hanging Leg Raise",
        sets: 4,
        reps: 8,
        rest: "90 seconds",
        caloriesBurned: "80",
      },
    ],
  },
  {
    dayType: "Cardio & Abs",
    exercises: [
      {
        name: "High-Intensity Interval Training (HIIT)",
        sets: 1,
        reps: "30 minutes",
        rest: "None",
        caloriesBurned: "350",
      },
      {
        name: "Russian Twist",
        sets: 4,
        reps: 15,
        rest: "60 seconds",
        caloriesBurned: "60",
      },
      {
        name: "Bicycle Crunches",
        sets: 4,
        reps: 15,
        rest: "60 seconds",
        caloriesBurned: "60",
      },
    ],
  },
];

const advancedExercises = [
  {
    dayType: "Chest & Triceps",
    exercises: [
      {
        name: "Incline Barbell Bench Press",
        sets: 4,
        reps: 8,
        rest: "90 seconds",
        caloriesBurned: "180",
      },
      {
        name: "Dumbbell Flyes",
        sets: 4,
        reps: 8,
        rest: "90 seconds",
        caloriesBurned: "150",
      },
      {
        name: "Close-Grip Bench Press",
        sets: 4,
        reps: 8,
        rest: "90 seconds",
        caloriesBurned: "140",
      },
      {
        name: "Tricep Pushdown",
        sets: 4,
        reps: 8,
        rest: "90 seconds",
        caloriesBurned: "120",
      },
    ],
  },
  {
    dayType: "Back & Biceps",
    exercises: [
      {
        name: "Deadlift",
        sets: 4,
        reps: 8,
        rest: "90 seconds",
        caloriesBurned: "200",
      },
      {
        name: "Wide-Grip Pull-Up",
        sets: 4,
        reps: 8,
        rest: "90 seconds",
        caloriesBurned: "160",
      },
      {
        name: "Barbell Row",
        sets: 4,
        reps: 8,
        rest: "90 seconds",
        caloriesBurned: "150",
      },
      {
        name: "Barbell Curl",
        sets: 4,
        reps: 8,
        rest: "90 seconds",
        caloriesBurned: "130",
      },
    ],
  },
  {
    dayType: "Rest",
    exercises: [],
  },
  {
    dayType: "Legs & Shoulders",
    exercises: [
      {
        name: "Back Squat",
        sets: 4,
        reps: 8,
        rest: "90 seconds",
        caloriesBurned: "240",
      },
      {
        name: "Leg Press",
        sets: 4,
        reps: 8,
        rest: "90 seconds",
        caloriesBurned: "200",
      },
      {
        name: "Overhead Press",
        sets: 4,
        reps: 8,
        rest: "90 seconds",
        caloriesBurned: "160",
      },
      {
        name: "Lateral Raise",
        sets: 4,
        reps: 8,
        rest: "90 seconds",
        caloriesBurned: "120",
      },
    ],
  },
  {
    dayType: "Rest",
    exercises: [],
  },
  {
    dayType: "Full Body",
    exercises: [
      {
        name: "Power Clean",
        sets: 4,
        reps: 8,
        rest: "90 seconds",
        caloriesBurned: "220",
      },
      {
        name: "Weighted Pull-Up",
        sets: 4,
        reps: 8,
        rest: "90 seconds",
        caloriesBurned: "180",
      },
      {
        name: "Weighted Dip",
        sets: 4,
        reps: 8,
        rest: "90 seconds",
        caloriesBurned: "160",
      },
      {
        name: "Hanging Leg Raise",
        sets: 4,
        reps: 8,
        rest: "90 seconds",
        caloriesBurned: "100",
      },
    ],
  },
  {
    dayType: "Cardio & Abs",
    exercises: [
      {
        name: "High Intensity Interval Training (HIIT)",
        sets: 1,
        reps: "30 minutes",
        rest: "None",
        caloriesBurned: "400",
      },
      {
        name: "Russian Twist",
        sets: 4,
        reps: 15,
        rest: "60 seconds",
        caloriesBurned: "60",
      },
      {
        name: "Bicycle Crunch",
        sets: 4,
        reps: 15,
        rest: "60 seconds",
        caloriesBurned: "60",
      },
    ],
  },
];

export { beginnerExercises, intermediateExercises, advancedExercises };
