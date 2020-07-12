import React from 'react';
import { Text } from 'react-native';
import { Divider, List, ListItem, Toggle } from '@ui-kitten/components';

import { getRoutine, getTodaysTasks, setTodaysTask } from './storage';

class Today extends React.Component {
  state = {
    tasks: null,
  }

  async componentDidMount() {
    const [
      { routine },
      todaysTasks,
    ] = await Promise.all([
      getRoutine(),
      getTodaysTasks()
    ]);

    const tasks = routine.map(task => ({
      ...task,
      done: todaysTasks.some(tId => tId === task.id)
    }));

    this.setState({ tasks });
  }

  toggleTask = id => () => {
    let done;
    const tasks = this.state.tasks.map(task => {
      if (task.id !== id) return task;
      done = !task.done;
      return { ...task, done };
    });

    this.setState({ tasks });
    setTodaysTask(id, done);
  }

  renderTaskRight = task => () => (
    <Toggle key={task.id} checked={task.done} onChange={this.toggleTask(task.id)} />
  )

  renderTask = ({ item }) => (
    <ListItem key={item.id} title={item.task} accessoryRight={this.renderTaskRight(item)} />
  )

  render() {
    if (this.state.tasks === null) {
      return null;
    }

    return (
      <List
        data={this.state.tasks}
        renderItem={this.renderTask}
        ItemSeparatorComponent={Divider}
      />
    );
  }
}

export default Today;
