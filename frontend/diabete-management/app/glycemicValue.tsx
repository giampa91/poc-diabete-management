import React, {useState} from 'react';
import {Text, StyleSheet, View, TextInput, Button, Alert} from 'react-native';

export default function HomeScreen() {
  const [insulinType, setInsulinType] = useState('');
  const [glycemia, setGlycemia] = useState(0);
  const [carbohydrate, setCarbohydrate] = useState(0);
  const [dose, setDose] = useState(0);
  const [userId, setUserId] = useState(0);
  return (
    <View style={styles.container}>
      <Text>insert glycemic data</Text>
      <TextInput placeholder="insulin type" 
        onChangeText={newInsulinType => setInsulinType(newInsulinType)}/>
      <TextInput placeholder="glycemia" 
        onChangeText={newGlycemia => setGlycemia(parseInt(newGlycemia))}/>
      <TextInput placeholder="carbohydrate" 
        onChangeText={newCarbohydrate => setCarbohydrate(parseInt(newCarbohydrate))}/>
      <TextInput placeholder="dose"
        onChangeText={newDose => setDose(parseInt(newDose))}/>
      <TextInput placeholder="userId" 
        onChangeText={newUserId => setUserId(parseInt(newUserId))}/>
      <Button
          title="Send data"
          onPress={() => {
              console.log(insulinType + " " + glycemia + " " + carbohydrate
                + " " + dose + " " + userId
              )
            }
          }
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
