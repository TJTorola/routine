import AsyncStorage from '@react-native-community/async-storage';

const ROUTINE_KEY = '@routine:0';

export const setRoutine = async ({ taskId, routine }) => {
  const jsonValue = JSON.stringify({ taskId, routine });
  await AsyncStorage.setItem(ROUTINE_KEY, jsonValue);
};

export const getRoutine = async () => {
  const storedJson = await AsyncStorage.getItem(ROUTINE_KEY);
  const stored = JSON.parse(storedJson);
  return stored || { taskId: 0, routine: [] };
};
