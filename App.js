import React, { useState } from 'react'
import { StyleSheet, Keyboard, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity, SectionList, FlatList, ScrollView } from 'react-native';
import Task from './components/Task'
import { useFonts, Inter_900Black, Inter_500Medium } from '@expo-google-fonts/inter'

const initialState = [
  {
    id: 'Task 1',
    text: 'Task 1'
  },
  {
    id: 'Task 2',
    text: 'Task 2'
  },
  {
    id: 'Task 3',
    text: 'Task 3'
  }
]

export default function App() {
  const [task, setTask] = useState('')
  const [tasksList, setTasksList] = useState(initialState)
   
  let [fontsLoaded] = useFonts({
    Inter_900Black,
    Inter_500Medium
  });

  console.log(fontsLoaded)

  const handleAddTask = () => {
    setTasksList([...tasksList, {
      text: task
    }])
    Keyboard.dismiss()
    setTask('')
  }

  const completeTask = (index) => {
    const itemCopy = [...tasksList]
    itemCopy.splice(index, 1)
    setTasksList(itemCopy)
  }

  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Mijel's Task</Text>
        <View style={styles.items}>
          <FlatList
            data={tasksList}
            renderItem={({item, index}) => (
              <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                <Task text={item.text} />
              </TouchableOpacity>
            )}
          />
        </View>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS==='ios' ? 'padding': 'height'}
        style={styles.writeTaskWrapper}
      >
          <TextInput style={styles.input} placeholder='Write a task' value={task} onChangeText={text => setTask(text)} />
        <TouchableOpacity onPress={handleAddTask}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20
  },
  sectionTitle: {
    color: 'white',
    fontSize: 24,
    fontFamily: 'Inter_900Black',
    fontWeight: 'bold',
  },
  items: {
    marginTop: 30
  },
  writeTaskWrapper: {
    color: 'white',
    position: 'absolute',
    marginBottom: 20,
    bottom: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: 'grey',
    borderRadius: 10,
    borderColor: 'grey',
    borderWidth: 1,
    width: 250
  },
  addWrapper: {
    width: 40,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'grey',
    borderWidth: 1
  },
  addText: {

  }
});
