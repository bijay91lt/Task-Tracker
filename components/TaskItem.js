// components/TaskItem.js

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function TaskItem({ item, onDelete, onToggleComplete }) {
  return (
    <View style={styles.taskContainer}>
      <TouchableOpacity onPress={() => onToggleComplete(item.id)}>
        <Text style={[styles.taskText, item.completed && styles.completed]}>
          {item.title}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onDelete(item.id)}>
        <Text style={styles.deleteBtn}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#eee',
    marginTop: 8,
    borderRadius: 8,
  },
  taskText: {
    fontSize: 16,
  },
  completed: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  deleteBtn: {
    fontSize: 18,
  },
});
