import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  TextInput,
  Keyboard,
  Platform
} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';

const isAndroid = Platform.OS == "android";
const viewPadding = 10;

const TASKS_KEY = '@tasks';

const getTasks = async () => {
  const jsonValue = await AsyncStorage.getItem(TASKS_KEY);
  return jsonValue !== null ? JSON.parse(jsonValue) : [];
}

const saveTasks = async tasks => {
  const jsonValue = JSON.stringify(tasks);
  await AsyncStorage.setItem(TASKS_KEY, jsonValue);
}

export default class TodoList extends Component {
  state = {
    tasks: null,
    text: ""
  };

  key = 0

  async componentDidMount() {
    Keyboard.addListener(
      isAndroid ? "keyboardDidShow" : "keyboardWillShow",
      e => this.setState({ viewMargin: e.endCoordinates.height + viewPadding })
    );

    Keyboard.addListener(
      isAndroid ? "keyboardDidHide" : "keyboardWillHide",
      () => this.setState({ viewMargin: viewPadding })
    );

    const tasks = await getTasks();
    this.setState({ tasks });
  }

  setText = text => this.setState({ text })

  addTask = () => {
    const text = this.state.text.trim();
    if (text.length === 0) return;

    const key = (this.key++).toString();
    const tasks = [
      ...this.state.tasks,
      { key, text }
    ];

    this.setState(
      { tasks, text: '' },
      () => saveTasks(tasks)
    );
  };

  deleteTask = key => {
    const tasks = this.state.tasks.filter(t => t.key !== key);
    this.setState({ tasks }, () => saveTasks(tasks));
  };

  render() {
    if (this.state.tasks === null) {
      return (
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
      );
    }

    return (
      <View
        style={[styles.container, { paddingBottom: this.state.viewMargin }]}
      >
        <FlatList
          style={styles.list}
          data={this.state.tasks}
          renderItem={({ item }) =>
            <View>
              <View style={styles.listItemCont}>
                <Text style={styles.listItem}>
                  {item.text}
                </Text>
                <Button title="X" onPress={() => this.deleteTask(item.key)} />
              </View>
              <View style={styles.hr} />
            </View>}
        />
        <TextInput
          style={styles.textInput}
          onChangeText={this.setText}
          onSubmitEditing={this.addTask}
          value={this.state.text}
          placeholder="Add Tasks"
          returnKeyType="done"
          returnKeyLabel="done"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    padding: viewPadding,
    paddingTop: 20
  },
  list: {
    width: "100%"
  },
  listItem: {
    paddingTop: 2,
    paddingBottom: 2,
    fontSize: 18
  },
  hr: {
    height: 1,
    backgroundColor: "gray"
  },
  listItemCont: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  textInput: {
    height: 40,
    paddingRight: 10,
    paddingLeft: 10,
    borderColor: "gray",
    borderWidth: isAndroid ? 0 : 1,
    width: "100%"
  }
});

AppRegistry.registerComponent("TodoList", () => TodoList);
