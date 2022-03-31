const axios = require('axios');
const dayjs = require('dayjs');
const allSessions = require('./allSessions.json');

const isSameDay = (day1, day2) => dayjs(day1).isSame(day2, 'day');

const isBeforeDay = (day1, day2) => dayjs(day1).add(1, 'day').isBefore(day2);
const isAfterDay = (day1, day2) => dayjs(day1).add(1, 'day').isAfter(day2);

// exercise 1
const calculateDaysOfStreack = (allSessions) => {
  const today = '2022-01-25T22:34:14-03:00';
  let maxStreak = {};

  // Filter only session completed
  const completedSessions = allSessions.filter((s) => s.isSessionCompleted);

  // add first streak day if completedSessions is not empty
  const lastDate = completedSessions[completedSessions.length - 1].dateSession;
  if (completedSessions.length > 0 && isSameDay(today, lastDate)) {
    maxStreak = {
      lastDate: completedSessions[completedSessions.length - 1].dateSession, // Last date of completedSessions
      days: 1,
    };
  } else {
    return 0;
  }

  // Iterate the array of completed sessions
  for (let i = completedSessions.length - 2; i >= 0; i--) {
    const currentDate = completedSessions[i].dateSession;

    // if is the same day update the last date
    if (isSameDay(currentDate, maxStreak.lastDate)) {
      maxStreak.lastDate = currentDate;
      continue;
    }

    //if is the previus day update the streak days
    if (!isAfterDay(currentDate, maxStreak.lastDate)) {
      maxStreak.days++;
      maxStreak.lastDate = currentDate;
    } else {
      return maxStreak.days;
    }
  }

  return maxStreak.days;
};

// exercise 2
const calculateMaxStreak = (allSessions) => {
  // Filter only session completed
  const completedSessions = allSessions.filter((s) => s.isSessionCompleted);

  const streaks = [];
  let maxDaysOfAllStreaks = 0;
  let numero = 0;

  // Push first streak if completedSessions is not empty
  if (completedSessions.length > 0) {
    streaks.push({
      lastDate: completedSessions[0].dateSession, // Last date of the streak
      streakDays: 1,
    });
    maxDaysOfAllStreaks = 1;
  }

  // Iterate the array of completed sessions
  for (let i = 1; i < completedSessions.length; i++) {
    const lastStreak = streaks[streaks.length - 1];
    const currentDate = completedSessions[i].dateSession;

    // If the session corresponds to the same day update lastDate and go to next iteration
    if (isSameDay(lastStreak.lastDate, currentDate)) {
      lastStreak.lastDate = currentDate;
      continue;
    }

    // If the session corresponds to the next day, increase the streak
    if (isBeforeDay(lastStreak.lastDate, currentDate)) {
      lastStreak.lastDate = currentDate;
      lastStreak.streakDays++;
      if (maxDaysOfAllStreaks < lastStreak.streakDays) {
        maxDaysOfAllStreaks = lastStreak.streakDays; //update max streak days
      }
    } else {
      //push a new streak
      streaks.push({
        lastDate: currentDate,
        streakDays: 1,
      });
    }
  }


  
  return maxDaysOfAllStreaks;
};

console.log(`The days of you streak are ${calculateDaysOfStreack(allSessions)} days`)
console.log(`The days of you historical maximum streak are ${calculateMaxStreak(allSessions)} days`)


