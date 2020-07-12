import React from 'react';
import { Button, Layout, List, ListItem, Text, Input, Divider } from '@ui-kitten/components';

import { setRoutine, getRoutine } from './storage';

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

  renderTaskRight = id => () => <Button onPress={this.removeTask(id)}>X</Button>

  renderTask = ({ item }) => (
    <ListItem key={item.id} title={item.task} accessoryRight={this.renderTaskRight(item.id)} />
  )

  render() {
    if (this.state.routine === null) {
      return null;
    }

    return (
      <>
        <List
          data={this.state.routine}
          renderItem={this.renderTask}
          ItemSeparatorComponent={Divider}
        />
        <Layout style={{ flexDirection: 'row' }}>
          <Input style={{ flex: 1 }} value={this.state.newTask} onChangeText={this.setNewTask} />
          <Button onPress={this.addTask}>Add</Button>
        </Layout>
      </>
    );
  }
}

export default Routine;
