import AsyncStorage from '@react-native-community/async-storage';

const ROUTINE_KEY = '@routine:0';
const DAY_KEY = '@day:0';

const getTodaysKey = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const dayStamp = `${year}-${month}-${day}`;
  return `${DAY_KEY}:${dayStamp}`;
}

export const setRoutine = async ({ taskId, routine }) => {
  const jsonValue = JSON.stringify({ taskId, routine });
  await AsyncStorage.setItem(ROUTINE_KEY, jsonValue);
};

export const getRoutine = async () => {
  const storedJson = await AsyncStorage.getItem(ROUTINE_KEY);
  const stored = JSON.parse(storedJson);
  return stored || { taskId: 0, routine: [] };
};

// TODO, handle corner case where today changes unexpectidly
const setTodaysTasks = async tasks => {
  const jsonValue = JSON.stringify(tasks);
  await AsyncStorage.setItem(getTodaysKey(), jsonValue);
};

export const getTodaysTasks = async () => {
  const storedJson = await AsyncStorage.getItem(getTodaysKey());
  const stored = JSON.parse(storedJson);
  return stored || [];
};

export const setTodaysTask = async (taskId, done) => {
  const todaysTasks = await getTodaysTasks();
  const alreadyDone = todaysTasks.some(tId => tId === taskId);

  if (alreadyDone === done) return;

  if (!done) {
    const tasks = todaysTasks.filter(tId => tId !== taskId);
    await setTodaysTasks(tasks);
  } else {
    const tasks = [...todaysTasks, taskId];
    await setTodaysTasks(tasks);
  }
}
