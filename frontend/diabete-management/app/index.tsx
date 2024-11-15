import React, {useState} from 'react';
import {Text, StyleSheet, View, TextInput, Button, FlatList} from 'react-native';

export default function HomeScreen() {
  const [glycemicDataList, setNewGlycemicDataList] = useState([{title: "date1", dose: "5"}]);
  const [newGlycemicData, setNewGlycemicData] = useState("");

  

  function setTheNewGlycemicData(theGlycemicData : string) {
    setNewGlycemicData(theGlycemicData);
  }

  function addTheNewGlycemicData() {
    if(newGlycemicData == undefined) return;

    let filteredList = glycemicDataList.filter(e => e.title == newGlycemicData);

    if(filteredList.length == 0){
      setNewGlycemicDataList([...glycemicDataList, {title: newGlycemicData, dose: "5"}]);
    }
  }

  function deleteGlycemicData(theGlycemicData: string){
    setNewGlycemicDataList(glycemicDataList.filter(e => e.title != theGlycemicData));
  }

  type ItemProps = {title: string, title2: string};

  const Item = (itemProps: ItemProps) => (
    <View>
      <Text >{itemProps.title}</Text>
      <Text >{itemProps.title2}</Text>
      <Button
          title="delete"
          onPress={() => deleteGlycemicData(itemProps.title)}
        />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text>insert glycemic data</Text>
      <TextInput placeholder="new glycemic data" 
        onChangeText={setTheNewGlycemicData}/>
      <Button
          title="insert glycemic data"
          onPress={(addTheNewGlycemicData)}
        />

<View style={styles.container}>
      <FlatList
        data={glycemicDataList}
        renderItem={(itemProps) => 
          <Item title={itemProps.item.title} 
            title2={itemProps.item.dose} 
          />}
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
