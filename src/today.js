import React from 'react';
import { Text } from 'react-native';
import { Divider, List, ListItem } from '@ui-kitten/components';

import { getRoutine } from './storage';

class Today extends React.Component {
  state = {
    routine: null,
  }

  async componentDidMount() {
    const { routine } = await getRoutine();
    this.setState({ routine });
  }

  renderTask = ({ item }) => (
    <ListItem key={item.id} title={item.task} />
  )

  render() {
    if (this.state.routine === null) {
      return <Text>Loading</Text>;
    }

    return (
      <List
        data={this.state.routine}
        renderItem={this.renderTask}
        ItemSeparatorComponent={Divider}
      />
    );
  }
}

export default Today;
