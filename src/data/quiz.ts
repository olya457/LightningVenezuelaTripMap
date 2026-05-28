import {images} from '../assets/images';
import {QuizQuestion} from '../types';

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'ball-lightning',
    question:
      'What type of lightning appears as a glowing sphere of plasma, floating slowly through the air?',
    options: [
      'Sheet Lightning',
      'Ball Lightning',
      'Heat Lightning',
      'Ribbon Lightning',
    ],
    answer: 'Ball Lightning',
    image: images.ballLightning,
  },
  {
    id: 'thunder-sound',
    question:
      'What causes the sound of thunder after a lightning strike?',
    options: [
      'Rapid air expansion from heat',
      'Clouds colliding together',
      'Rain freezing instantly',
      'Wind changing direction',
    ],
    answer: 'Rapid air expansion from heat',
    image: images.cloudToGroundLightning,
  },
  {
    id: 'cloud-light',
    question:
      'Which type of lightning illuminates an entire cloud without reaching the ground?',
    options: [
      'Forked Lightning',
      'Sheet Lightning',
      'Ribbon Lightning',
      'Red Sprite Lightning',
    ],
    answer: 'Sheet Lightning',
    image: images.sheetLightning,
  },
  {
    id: 'catatumbo-nights',
    question:
      'Catatumbo Lightning in Venezuela produces approximately how many active nights per year?',
    options: ['20', '80', '140 to 200', '365'],
    answer: '140 to 200',
    image: images.lakeMaracaiboStorm,
  },
  {
    id: 'bolt-heat',
    question:
      'How hot can a lightning bolts core channel reach at peak activity?',
    options: ['300C', '3,000C', '30,000C', '300,000C'],
    answer: '30,000C',
    image: images.blogLightning,
  },
];
