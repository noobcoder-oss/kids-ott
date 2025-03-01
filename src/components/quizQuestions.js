export const quizQuestions = [
  {
    id: 1,
    timestamp: 30, // Show after 30 seconds
    question: "What is Olaf's favorite season?",
    options: [
      { id: "a", text: "Winter" },
      { id: "b", text: "Summer" },
      { id: "c", text: "Spring" },
      { id: "d", text: "Fall" },
    ],
    correctAnswer: "b",
    reward: 10,
    answered: false,
  },
  {
    id: 2,
    timestamp: 60,
    question: "Who created Olaf?",
    options: [
      { id: "a", text: "Anna" },
      { id: "b", text: "Kristoff" },
      { id: "c", text: "Elsa" },
      { id: "d", text: "Sven" },
    ],
    correctAnswer: "c",
    reward: 10,
    answered: false,
  },
];
