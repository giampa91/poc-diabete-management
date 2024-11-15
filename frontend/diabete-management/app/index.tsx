import React, {useState} from 'react';
import {Text, StyleSheet, View, TextInput, Button, FlatList} from 'react-native';

export default function HomeScreen() {
  const [glycemicDataList, setNewGlycemicDataList] = useState(["date1", "date2"]);
  const [newGlycemicData, setNewGlycemicData] = useState('');

  function setTheNewGlycemicData(theGlycemicData : string) {
    setNewGlycemicData(theGlycemicData);
  }

  function addTheNewGlycemicData() {
    if(newGlycemicData == undefined) return;

    let filteredList = glycemicDataList.filter(e => e == newGlycemicData);

    if(filteredList.length == 0){
      setNewGlycemicDataList([...glycemicDataList, newGlycemicData]);
    }
  }

  function deleteGlycemicData(theGlycemicData: string){
    setNewGlycemicDataList(glycemicDataList.filter(e => e != theGlycemicData));
  }

  type ItemProps = {title: string};

  const Item = ({title}: ItemProps) => (
    <View>
      <Text >{title}</Text>
      <Button
          title="delete"
          onPress={() => deleteGlycemicData(title)}
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
        renderItem={({item}) => <Item title={item} />}
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
