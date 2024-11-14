import React, {useState} from 'react';
import {Text, StyleSheet, View, TextInput, Button, Alert} from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>this is the form</Text>
      <TextInput placeholder="insulin type" />
      <TextInput placeholder="glycemia" />
      <TextInput placeholder="carbohydrate" />
      <TextInput placeholder="dose" />
      <TextInput placeholder="userId" />
      <Button
          title="Send data"
          onPress={() => Alert.alert('Simple Button pressed')}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
