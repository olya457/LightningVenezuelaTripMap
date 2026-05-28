import React, {useEffect, useMemo, useState} from 'react';
import {
  Image,
  Pressable,
  Share,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {images} from '../assets/images';
import {AppScreen} from '../components/AppScreen';
import {Button} from '../components/Buttons';
import {quizQuestions} from '../data/quiz';
import {colors, getNavigationMetrics, shadow} from '../theme';

type QuizMode = 'intro' | 'playing' | 'results';
const questionSeconds = 15;

export function QuizScreen() {
  const [mode, setMode] = useState<QuizMode>('intro');
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(questionSeconds);
  const {width, height} = useWindowDimensions();
  const metrics = getNavigationMetrics(width, height);
  const introImageSize = Math.min(
    width - metrics.pageX * 2,
    metrics.compact ? 214 : 340,
    height * (metrics.compact ? 0.32 : 0.38),
  );
  const questionImageHeight = Math.min(
    metrics.compact ? 118 : 170,
    height * (metrics.compact ? 0.2 : 0.24),
  );
  const question = quizQuestions[index];
  const selected = answers[question?.id];
  const timeExpired = mode === 'playing' && timeLeft === 0;
  const score = useMemo(
    () =>
      quizQuestions.reduce(
        (total, item) => total + (answers[item.id] === item.answer ? 1 : 0),
        0,
      ),
    [answers],
  );

  const start = () => {
    setAnswers({});
    setIndex(0);
    setTimeLeft(questionSeconds);
    setMode('playing');
  };

  const choose = (answer: string) => {
    setAnswers(current => ({...current, [question.id]: answer}));
  };

  const next = () => {
    if (index === quizQuestions.length - 1) {
      setMode('results');
      return;
    }
    setIndex(current => current + 1);
  };

  useEffect(() => {
    if (mode === 'playing') {
      setTimeLeft(questionSeconds);
    }
  }, [index, mode]);

  useEffect(() => {
    if (mode !== 'playing' || selected || timeLeft <= 0) {
      return;
    }

    const timer = setTimeout(
      () => setTimeLeft(current => Math.max(0, current - 1)),
      1000,
    );

    return () => clearTimeout(timer);
  }, [mode, selected, timeLeft]);

  const shareResults = () => {
    Share.share({
      title: 'Lightning Knowledge Quiz',
      message: `I scored ${score}/${quizQuestions.length} in the Lightning Knowledge Quiz.`,
    });
  };

  if (mode === 'intro') {
    return (
      <AppScreen scroll>
        <View style={[styles.intro, metrics.compact && styles.introCompact]}>
          <Image
            source={images.onboardingQuiz}
            style={[
              styles.introImage,
              {width: introImageSize, height: introImageSize},
              metrics.compact && styles.introImageCompact,
            ]}
          />
          <Text
            style={[
              styles.introTitle,
              metrics.compact && styles.introTitleCompact,
            ]}>
            Lightning Knowledge Quiz
          </Text>
          <Text
            style={[
              styles.introBody,
              metrics.compact && styles.introBodyCompact,
            ]}>
            Test your knowledge of lightning phenomena and Venezuelas storm science.
          </Text>
          <View style={[styles.infoBox, metrics.compact && styles.infoBoxCompact]}>
            <Text style={[styles.infoText, metrics.compact && styles.infoTextCompact]}>
              ❔  5 questions about lightning types
            </Text>
            <Text style={[styles.infoText, metrics.compact && styles.infoTextCompact]}>
              ⏱️  15 seconds per question
            </Text>
            <Text style={[styles.infoText, metrics.compact && styles.infoTextCompact]}>
              ☁️  Each question shows a lightning image
            </Text>
          </View>
          <Button
            title="Start Quiz"
            emoji="▶"
            variant="purple"
            onPress={start}
            style={[styles.startButton, metrics.compact && styles.startButtonCompact]}
          />
        </View>
      </AppScreen>
    );
  }

  if (mode === 'results') {
    const percent = Math.round((score / quizQuestions.length) * 100);

    return (
      <AppScreen title="Results" scroll>
        <View
          style={[
            styles.resultHeader,
            metrics.compact && styles.resultHeaderCompact,
          ]}>
          <View
            style={[
              styles.scoreCircle,
              metrics.compact && styles.scoreCircleCompact,
            ]}>
            <Text
              style={[
                styles.scoreText,
                metrics.compact && styles.scoreTextCompact,
              ]}>
              {score}/{quizQuestions.length}
            </Text>
            <Text style={styles.scorePercent}>{percent}%</Text>
          </View>
          <Text style={[styles.stars, metrics.compact && styles.starsCompact]}>
            {score > 3 ? '⭐ ⭐ ⭐' : '⭐ ☆ ☆'}
          </Text>
          <Text style={styles.keep}>{score > 3 ? 'Storm Expert!' : 'Keep Charging!'}</Text>
        </View>
        {quizQuestions.map(item => {
          const correct = answers[item.id] === item.answer;
          return (
            <View
              key={item.id}
              style={[
                styles.resultRow,
                metrics.compact && styles.resultRowCompact,
              ]}>
              <Text
                style={[
                  styles.resultQuestion,
                  metrics.compact && styles.resultQuestionCompact,
                ]}>
                {correct ? '✅' : '⭕'} {item.question}
              </Text>
              <Text style={styles.resultAnswer}>✓ {item.answer}</Text>
            </View>
          );
        })}
        <View style={styles.resultActions}>
          <Button
            title="Back"
            variant="ghost"
            onPress={() => setMode('intro')}
            style={[
              styles.resultButton,
              metrics.compact && styles.resultButtonCompact,
            ]}
          />
          <Button
            title="Share"
            onPress={shareResults}
            style={[
              styles.resultButton,
              metrics.compact && styles.resultButtonCompact,
            ]}
          />
        </View>
      </AppScreen>
    );
  }

  return (
    <AppScreen scroll>
      <View style={[styles.playing, metrics.compact && styles.playingCompact]}>
        <View
          style={[
            styles.progressRow,
            metrics.compact && styles.progressRowCompact,
          ]}>
          <Text style={styles.progressText}>{index + 1} / {quizQuestions.length}</Text>
          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                {width: `${((index + 1) / quizQuestions.length) * 100}%`},
              ]}
            />
          </View>
          <View
            style={[
              styles.timer,
              metrics.compact && styles.timerCompact,
              timeExpired && styles.timerExpired,
            ]}>
            <Text style={styles.timerIcon}>⏱</Text>
            <Text style={[styles.timerText, timeExpired && styles.timerTextExpired]}>
              {timeLeft}s
            </Text>
          </View>
        </View>
        <Image
          source={question.image}
          style={[
            styles.questionImage,
            {height: questionImageHeight},
            metrics.compact && styles.questionImageCompact,
          ]}
        />
        <Text
          style={[styles.question, metrics.compact && styles.questionCompact]}>
          {question.question}
        </Text>
        <View style={[styles.options, metrics.compact && styles.optionsCompact]}>
          {question.options.map((option, optionIndex) => {
            const isSelected = selected === option;
            const answered = Boolean(selected);
            const correct = option === question.answer;
            return (
              <Pressable
                key={option}
                onPress={() => choose(option)}
                disabled={answered || timeExpired}
                style={[
                  styles.option,
                  metrics.compact && styles.optionCompact,
                  isSelected && styles.selectedOption,
                  answered && correct && styles.correctOption,
                  answered && isSelected && !correct && styles.wrongOption,
                ]}>
                <View
                  style={[
                    styles.optionBadge,
                    metrics.compact && styles.optionBadgeCompact,
                  ]}>
                  <Text
                    style={[
                      styles.optionBadgeText,
                      metrics.compact && styles.optionBadgeTextCompact,
                    ]}>
                    {String.fromCharCode(65 + optionIndex)}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.optionText,
                    metrics.compact && styles.optionTextCompact,
                  ]}>
                  {option}
                </Text>
              </Pressable>
            );
          })}
        </View>
        <Button
          title={index === quizQuestions.length - 1 ? 'Result' : 'Next question'}
          disabled={!selected && !timeExpired}
          onPress={next}
          style={[styles.nextButton, metrics.compact && styles.nextButtonCompact]}
        />
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  intro: {
    alignItems: 'center',
    paddingTop: 28,
  },
  introCompact: {
    paddingTop: 20,
  },
  introImage: {
    borderRadius: 22,
    marginBottom: 24,
    ...shadow,
  },
  introImageCompact: {
    borderRadius: 18,
    marginBottom: 16,
  },
  introTitle: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '900',
    textAlign: 'center',
  },
  introTitleCompact: {
    fontSize: 20,
  },
  introBody: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 10,
  },
  introBodyCompact: {
    fontSize: 13,
    lineHeight: 19,
    marginTop: 8,
  },
  infoBox: {
    width: '100%',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.panel,
    padding: 16,
    marginTop: 28,
  },
  infoBoxCompact: {
    borderRadius: 14,
    padding: 12,
    marginTop: 16,
  },
  infoText: {
    color: '#aab8d8',
    fontSize: 13,
    fontWeight: '800',
    marginVertical: 6,
  },
  infoTextCompact: {
    fontSize: 12,
    marginVertical: 4,
  },
  startButton: {
    width: '100%',
    marginTop: 24,
  },
  startButtonCompact: {
    minHeight: 50,
    marginTop: 16,
  },
  playing: {
    paddingTop: 20,
  },
  playingCompact: {
    paddingTop: 10,
  },
  progressRow: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  progressRowCompact: {
    marginTop: 0,
    marginBottom: 12,
  },
  progressText: {
    color: colors.violet,
    fontSize: 12,
    fontWeight: '900',
    width: 46,
  },
  progressTrack: {
    flex: 1,
    height: 2,
    backgroundColor: '#16234a',
    marginHorizontal: 12,
  },
  progressFill: {
    height: 2,
    backgroundColor: colors.violet,
  },
  timer: {
    width: 76,
    height: 42,
    borderRadius: 21,
    borderWidth: 2,
    borderColor: colors.cyan,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.panel,
  },
  timerCompact: {
    width: 68,
    height: 38,
    borderRadius: 19,
  },
  timerExpired: {
    borderColor: colors.danger,
  },
  timerIcon: {
    fontSize: 13,
    marginRight: 5,
  },
  timerText: {
    color: colors.cyan,
    fontWeight: '900',
    fontSize: 15,
  },
  timerTextExpired: {
    color: colors.danger,
  },
  questionImage: {
    width: '100%',
    borderRadius: 14,
    marginBottom: 16,
  },
  questionImageCompact: {
    borderRadius: 12,
    marginBottom: 12,
  },
  question: {
    color: colors.text,
    fontSize: 15,
    lineHeight: 21,
    fontWeight: '900',
    marginBottom: 12,
  },
  questionCompact: {
    fontSize: 14,
    lineHeight: 19,
    marginBottom: 10,
  },
  options: {
    marginBottom: 22,
  },
  optionsCompact: {
    marginBottom: 14,
  },
  option: {
    minHeight: 52,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.panel,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  optionCompact: {
    minHeight: 44,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 8,
  },
  selectedOption: {
    borderColor: colors.borderStrong,
  },
  correctOption: {
    backgroundColor: '#0d5228',
    borderColor: colors.green,
  },
  wrongOption: {
    backgroundColor: '#651521',
    borderColor: colors.danger,
  },
  optionBadge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#122b59',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  optionBadgeCompact: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 9,
  },
  optionBadgeText: {
    color: '#4f91ff',
    fontSize: 10,
    fontWeight: '900',
  },
  optionBadgeTextCompact: {
    fontSize: 9,
  },
  optionText: {
    flex: 1,
    color: colors.text,
    fontSize: 13,
    fontWeight: '800',
  },
  optionTextCompact: {
    fontSize: 12,
  },
  nextButton: {
    marginTop: 4,
  },
  nextButtonCompact: {
    minHeight: 50,
    marginTop: 2,
  },
  resultHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  resultHeaderCompact: {
    marginBottom: 14,
  },
  scoreCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 6,
    borderColor: colors.violet,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.panel,
    marginBottom: 18,
  },
  scoreCircleCompact: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 5,
    marginBottom: 12,
  },
  scoreText: {
    color: colors.text,
    fontSize: 23,
    fontWeight: '900',
  },
  scoreTextCompact: {
    fontSize: 20,
  },
  scorePercent: {
    color: colors.dim,
    fontSize: 10,
    fontWeight: '900',
  },
  stars: {
    color: colors.yellow,
    fontSize: 22,
    marginBottom: 8,
  },
  starsCompact: {
    fontSize: 18,
    marginBottom: 6,
  },
  keep: {
    color: colors.violet,
    fontWeight: '900',
  },
  resultRow: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#3d1930',
    backgroundColor: colors.panel,
    padding: 14,
    marginBottom: 10,
  },
  resultRowCompact: {
    borderRadius: 10,
    padding: 11,
    marginBottom: 8,
  },
  resultQuestion: {
    color: '#b7c3df',
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '800',
  },
  resultQuestionCompact: {
    fontSize: 11,
    lineHeight: 16,
  },
  resultAnswer: {
    color: colors.green,
    fontSize: 12,
    fontWeight: '900',
    marginTop: 8,
  },
  resultActions: {
    flexDirection: 'row',
    marginTop: 18,
  },
  resultButton: {
    flex: 1,
    marginRight: 10,
  },
  resultButtonCompact: {
    minHeight: 50,
  },
});
