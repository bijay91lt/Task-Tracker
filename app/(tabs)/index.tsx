import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskItem from '../../components/TaskItem';

export default function TaskTrackerScreen() {
  const [task, setTask] = useState('');
  const [taskList, setTaskList] = useState([]);

  const TASKS_KEY = 'TASKS_STORAGE_KEY';

  // 🧠 Load tasks on app start
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem(TASKS_KEY);
        if (storedTasks) {
          setTaskList(JSON.parse(storedTasks));
        }
      } catch (err) {
        console.error('Failed to load tasks:', err);
      }
    };
    loadTasks();
  }, []);

  // 💾 Save tasks when taskList changes
  useEffect(() => {
    const saveTasks = async () => {
      try {
        await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(taskList));
      } catch (err) {
        console.error('Failed to save tasks:', err);
      }
    };
    saveTasks();
  }, [taskList]);

  const handleAddTask = () => {
    if (task.trim() === '') return;
    setTaskList([
      ...taskList,
      { id: Date.now().toString(), title: task, completed: false },
    ]);
    setTask('');
  };

  const handleDelete = id => {
    setTaskList(prev => prev.filter(item => item.id !== id));
  };

  const handleToggleComplete = id => {
    setTaskList(prev =>
      prev.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task Tracker</Text>

      <TextInput
        placeholder="Enter a task"
        value={task}
        onChangeText={setTask}
        style={styles.input}
      />

      <Button title="Add Task" onPress={handleAddTask} />

      <FlatList
        data={taskList}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TaskItem
            item={item}
            onDelete={handleDelete}
            onToggleComplete={handleToggleComplete}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 50 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
});
