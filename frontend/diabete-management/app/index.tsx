import React, { useEffect, useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
} from 'react-native';

export default function HomeScreen() {
  // const [glycemicDataList, setNewGlycemicDataList] = useState([
  //   {
  //     id: 1,
  //     insulineType: 'fiasp',
  //     glycemia: '120',
  //     carbohydrate: '12',
  //     dose: '2',
  //     userId: '1',
  //   },
  // ]);
  const [newGlycemicDataID, setNewGlycemicDataId] = useState(1);
  const [newInsulinType, setNewInsulinType] = useState('');
  const [newGlycemia, setNewGlycemia] = useState('');
  const [newCarbohydrate, setNewCarboidrate] = useState('');
  const [newDose, setNewDose] = useState('');
  const [newUserId, setnewUserId] = useState('');
  const [newDateTime, setnewDateTime] = useState('');

  const [glycemicDataList, setNewGlycemicDataList] = useState<ItemProps[]>([]);

  type ItemProps = {
    id: number;
    dateTime: string;  // Ensure this matches the actual response
    insulineType: string;
    glycemia: string;
    carbohydrate: string;
    dose: string;
    userId: string;
  };

  function addTheNewGlycemicData() {
    if (newGlycemicDataID === undefined) return;

    const filteredList = glycemicDataList.filter(
      (e) => e.id === newGlycemicDataID
    );

    if (filteredList.length === 0) {
      setNewGlycemicDataList((prevData) => [
        ...prevData,
        {
          id: newGlycemicDataID,
          dateTime: newDateTime,
          dose: newDose,
          insulineType: newInsulinType,
          glycemia: newGlycemia,
          carbohydrate: newCarbohydrate,
          userId: newUserId,
        },
      ]);
    }
  }

  function deleteGlycemicData(theGlycemicData: number) {
    setNewGlycemicDataList(
      glycemicDataList.filter((e) => e.id !== theGlycemicData)
    );
  }

  const getNewGlycemicData = async () => {
    try {
      const response = await fetch('http://localhost:8089/glycemia/glycemia');
      const json = await response.json();
      console.log(json); // Log the response to inspect the data structure
      setNewGlycemicDataList(json);  // Ensure json structure matches the ItemProps type
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getNewGlycemicData();
  }, []);

  const Item = (itemProps: ItemProps) => (
    <View style={styles.card}>
      <Text style={styles.cardText}>ID: {itemProps.id}</Text>
      <Text style={styles.cardText}>Insulin Type: {itemProps.insulineType}</Text>
      <Text style={styles.cardText}>Glycemia: {itemProps.glycemia}</Text>
      <Text style={styles.cardText}>Carbohydrate: {itemProps.carbohydrate}</Text>
      <Text style={styles.cardText}>Dose: {itemProps.dose}</Text>
      <Text style={styles.cardText}>User ID: {itemProps.userId}</Text>
      <Text style={styles.cardText}>date time: {itemProps.dateTime}</Text>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteGlycemicData(itemProps.id)}
      >
        <Text style={styles.buttonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Glycemic Data</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Insert ID"
          keyboardType="numeric"
          onChangeText={(id: string) => setNewGlycemicDataId(parseInt(id))}
        />
        <TextInput
          style={styles.input}
          placeholder="Insert Insulin Type"
          onChangeText={(insulinType: string) => setNewInsulinType(insulinType)}
        />
        <TextInput
          style={styles.input}
          placeholder="Insert Glycemia"
          onChangeText={(glycemia: string) => setNewGlycemia(glycemia)}
        />
        <TextInput
          style={styles.input}
          placeholder="Insert Carbohydrate"
          onChangeText={(carbohydrate: string) =>
            setNewCarboidrate(carbohydrate)
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Insert Dose"
          onChangeText={(dose: string) => setNewDose(dose)}
        />
        <TextInput
          style={styles.input}
          placeholder="Insert User ID"
          onChangeText={(userId: string) => setnewUserId(userId)}
        />
      </View>
      <TouchableOpacity style={styles.addButton} onPress={addTheNewGlycemicData}>
        <Text style={styles.buttonText}>Add Glycemic Data</Text>
      </TouchableOpacity>
      <Text style={styles.separator}>Glycemic Data Records</Text>
      <FlatList
        data={glycemicDataList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Item
            id={item.id}
            dose={item.dose}
            insulineType={item.insulineType}
            glycemia={item.glycemia}
            carbohydrate={item.carbohydrate}
            userId={item.userId} 
            dateTime={item.dateTime}          />
        )}
        contentContainerStyle={styles.cardList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  deleteButton: {
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  separator: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: '#555',
  },
  cardList: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  cardText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
});
