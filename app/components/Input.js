import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

const Input = ({ inputValue, onChangeText, onDoneAddItem }) => (
  <TextInput
    style={styles.input}
    value={inputValue}
    onChangeText={onChangeText}
    placeholder="Type here to add a note"
    multiline={true}
    autoCapitalize="sentences"
    selectionColor={'white'}
    maxLength={30}
    returnKeyType="done"
    autoCorrect={false}
    blurOnSubmit={true}
    onSubmitEditing={onDoneAddItem}
)
