import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useTodo } from './src/hooks/Todo';

export default function App() {
  const [todos, addTodo, deleteTodo, toggleTodo] = useTodo();
  const [todo, setTodo] = useState('');
  const [error, setError] = useState('');

  const createTodo = () => {
    setError('');
    addTodo(todo, (res) => {
      setError(res);
    });
    setTodo('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputText}
          placeholder={'Write your todo'}
          placeholderTextColor={'white'}
          onChangeText={(text) => setTodo(text)}
          value={todo}
          onSubmitEditing={() => createTodo()}
        />
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            createTodo();
          }}
        >
          <View style={styles.inputButton}>
            <Text style={styles.inputButtonText}>+</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Text
        style={{
          color: '#f08080',
          marginHorizontal: 15,
          marginBottom: 15,
          marginTop: -15
        }}
      >
        {error ? error : ''}
      </Text>
      <View style={styles.listContainer}>
        <FlatList
          data={todos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            return (
              <View style={styles.itemListContainer}>
                <TouchableOpacity
                  onPress={() => {
                    toggleTodo(item.id);
                  }}
                  activeOpacity={0.7}
                  style={{
                    flex: 1,
                    flexDirection: 'row'
                  }}
                >
                  <Text
                    style={[
                      styles.itemListText,
                      {
                        textDecorationLine: item.checked
                          ? 'line-through'
                          : 'none'
                      }
                    ]}
                  >
                    {item.name}
                  </Text>
                  {item.checked ? (
                    <FontAwesome5
                      style={{ marginHorizontal: 15, alignSelf: 'center' }}
                      name="check"
                      size={16}
                      color="#73a942"
                    />
                  ) : null}
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.itemDeleteButton}
                  onPress={() => {
                    deleteTodo(item.id);
                  }}
                >
                  <Text style={styles.itemDeleteButtonText}>x</Text>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 30,
    backgroundColor: 'white'
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 15
  },
  inputText: {
    flex: 1,
    fontSize: 16,
    backgroundColor: '#f8ad9d',
    paddingHorizontal: 10,
    color: 'white',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5
  },
  inputButton: {
    width: 50,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    backgroundColor: '#f4978e',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5
  },
  inputButtonText: {
    fontSize: 30,
    color: 'white',
    paddingBottom: 5
  },
  listContainer: {
    flex: 1
  },
  itemListContainer: {
    flexDirection: 'row',
    marginVertical: 2.5,
    backgroundColor: '#fbc4ab',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15
  },
  itemListText: {
    flex: 1,
    color: 'white',
    fontSize: 16,
    marginHorizontal: 15,
    marginVertical: 5
  },
  itemDeleteButton: {
    width: 40,
    backgroundColor: '#f08080',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  itemDeleteButtonText: {
    color: 'white',
    fontSize: 25,
    paddingBottom: 5,
    paddingLeft: 2
  }
});
