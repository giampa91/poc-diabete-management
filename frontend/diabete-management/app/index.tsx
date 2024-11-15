import React, {useState} from 'react';
import {Text, StyleSheet, View, TextInput, Button, FlatList} from 'react-native';

export default function HomeScreen() {
  const [glycemicDataList, setNewGlycemicDataList] = 
    useState([{
      id: 1,
      insulineType: "fiasp", 
      glycemia: "120",
      carbohydrate: "12",
      dose: "2",
      userId: "1"
    }]);
  const [newGlycemicDataID, setNewGlycemicDataId] = useState(1);
  const [newInsulinType, setNewInsulinType] = useState("");
  const [newGlycemia, setNewGlycemia] = useState("");
  const [newCarbohydrate, setNewCarboidrate] = useState("");
  const [newDose, setNewDose] = useState("");
  const [newUserId, setnewUserId] = useState("");

  type ItemProps = {
    id: number,
    insulineType: string, 
    glycemia: string,
    carbohydrate: string,
    dose: string,
    userId: string
  };
  
  function addTheNewGlycemicData() {
    if(newGlycemicDataID == undefined) return;

    let filteredList = glycemicDataList.filter(e => e.id == newGlycemicDataID);

    if(filteredList.length == 0){
      setNewGlycemicDataList([...glycemicDataList, {
        id: newGlycemicDataID, 
        dose: newDose,
        insulineType: newInsulinType,
        glycemia: newGlycemia,
        carbohydrate: newCarbohydrate,
        userId: newUserId
      }]);
    }
  }

  function deleteGlycemicData(theGlycemicData: number){
    setNewGlycemicDataList(glycemicDataList.filter(e => e.id != theGlycemicData));
  }

  const Item = (itemProps: ItemProps) => (
    <View>
      <Text >id: {itemProps.id}</Text>
      <Text >insulinType: {itemProps.insulineType}</Text>
      <Text >glycemia: {itemProps.glycemia}</Text>
      <Text >carbohydrate: {itemProps.carbohydrate}</Text>
      <Text >dose: {itemProps.dose}</Text>
      <Text >userId: {itemProps.userId}</Text>
      <Button
          title="delete"
          onPress={() => deleteGlycemicData(itemProps.id)}
        />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text>insert glycemic data</Text>
      <TextInput placeholder="insert id" 
        onChangeText={(id: string) => setNewGlycemicDataId(parseInt(id))}/>
        <TextInput placeholder="insert insulin type" 
        onChangeText={(insulinType: string) => setNewInsulinType(insulinType)}/>
        <TextInput placeholder="insert glycemia" 
        onChangeText={(glycemia: string) => setNewGlycemia(glycemia)}/>
        <TextInput placeholder="insert carbohydrate" 
        onChangeText={(carbohydrate: string) => setNewCarboidrate(carbohydrate)}/>
        <TextInput placeholder="insert dose" 
        onChangeText={(dose: string) => setNewDose(dose)}/>
        <TextInput placeholder="insert user id" 
        onChangeText={(userId: string) => setnewUserId(userId)}/>
      <Button
        title="insert glycemic data"
        onPress={(addTheNewGlycemicData)}
      />
      
      {/* todo insert a proper line */}
      <Text>------------------------------------</Text>

      <View style={styles.container}>
        <FlatList
          data={glycemicDataList}
          renderItem={(itemProps) => 
            <Item id={itemProps.item.id}
            dose={itemProps.item.dose} 
            insulineType={itemProps.item.insulineType} 
            glycemia={itemProps.item.glycemia} 
            carbohydrate={itemProps.item.carbohydrate} 
            userId={itemProps.item.userId}/>}
        />
      </View>

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
