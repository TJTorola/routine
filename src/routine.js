import React from 'react';
import { Button, Layout, List, ListItem, Text, Input, Divider } from '@ui-kitten/components';

class Routine extends React.Component {
  state = {
    tasks: [],
    newTask: '',
  }

  taskId = 0

  addTask = () => {
    const task = this.state.newTask.trim();
    if (task.length === 0) return;

    const id = this.taskId++;

    this.setState({ tasks: [...this.state.tasks, { task, id }], newTask: '' });
  }

  removeTask = id => () => {
    // TODO make this ID specific
    const tasks = this.state.tasks.filter(t => t.id !== id);
    this.setState({ tasks });
  }

  setNewTask = newTask => this.setState({ newTask });

  renderTaskRight = id => () => <Button onPress={this.removeTask(id)}>X</Button>

  renderTask = ({ item }) => (
    <ListItem key={item.id} title={item.task} accessoryRight={this.renderTaskRight(item.id)} />
  )

  render() {
    return (
      <>
        <List
          data={this.state.tasks}
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
