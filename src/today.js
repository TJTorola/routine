import React from 'react';
import { View } from 'react-native';
import { Card, Divider, List, ListItem, Text, Toggle } from '@ui-kitten/components';

import { getRoutine, getTodaysTasks, setTodaysTask } from './storage';

const Header = props => (
  <View {...props}>
    <Text>Daily Routine</Text>
  </View>
);

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
    <Toggle
      checked={task.done}
      key={task.id}
      onChange={this.toggleTask(task.id)}
      status={task.done ? 'success' : 'basic'}
    />
  )

  renderTask = ({ item }) => (
    <ListItem key={item.id} title={item.task} accessoryRight={this.renderTaskRight(item)} />
  )

  render() {
    if (this.state.tasks === null) {
      return null;
    }

    return (
      <Card header={Header} style={{ margin: 10 }}>
        <List
          style={{ maxHeight: 500 }}
          data={this.state.tasks}
          renderItem={this.renderTask}
          ItemSeparatorComponent={Divider}
        />
      </Card>
    );
  }
}

export default Today;
