import React from 'react';
import { View } from 'react-native';
import {
  Button,
  Card,
  Divider,
  Icon,
  Input,
  Layout,
  List,
  ListItem,
  Text,
} from '@ui-kitten/components';

import { setRoutine, getRoutine } from './storage';

const Header = props => (
  <View {...props}>
    <Text>Daily Routine</Text>
  </View>
);

const ExIcon = props => <Icon name="close" {...props} />;
const PlusIcon = props => <Icon name="plus" {...props} />;

class Routine extends React.Component {
  state = {
    routine: null,
    newTask: '',
  }

  async componentDidMount() {
    const { taskId, routine } = await getRoutine();
    this.taskId = taskId;
    this.setState({ routine });
  }

  componentDidUpdate(_, prevState) {
    if (prevState.routine !== this.state.routine) {
      setRoutine({ taskId: this.taskId, routine: this.state.routine });
    }
  }

  addTask = () => {
    const task = this.state.newTask.trim();
    if (task.length === 0) return;

    const id = this.taskId++;

    this.setState({ routine: [...this.state.routine, { task, id }], newTask: '' });
  }

  removeTask = id => () => {
    // TODO make this ID specific
    const routine = this.state.routine.filter(t => t.id !== id);
    this.setState({ routine });
  }

  setNewTask = newTask => this.setState({ newTask });

  renderTaskRight = id => () => (
    <Button
      accessoryLeft={ExIcon}
      appearance='outline'
      onPress={this.removeTask(id)}
      size="small"
      status="danger"
    />
  )

  renderTask = ({ item }) => (
    <ListItem key={item.id} title={item.task} accessoryRight={this.renderTaskRight(item.id)} />
  )

  renderAddIcon = props => {
    const task = this.state.newTask.trim();
    if (task.length === 0) return null;

    return (
      <Button
        accessoryLeft={PlusIcon}
        appearance="outline"
        onPress={this.addTask}
        size="small"
      />
    );
  }

  renderFooter = props => (
    <Input
      {...props}
      accessoryRight={this.renderAddIcon}
      label="New Task:"
      onChangeText={this.setNewTask}
      onSubmitEditing={this.addTask}
      value={this.state.newTask}
    />
  )

  render() {
    if (this.state.routine === null) {
      return null;
    }

    return (
      <Card header={Header} footer={this.renderFooter} style={{ margin: 10 }}>
        <List
          style={{ maxHeight: 400 }}
          data={this.state.routine}
          renderItem={this.renderTask}
          ItemSeparatorComponent={Divider}
        />
      </Card>
    );
  }
}

export default Routine;
