import React, { useEffect, useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';

export default function HomeScreen() {
  // State management
  const [newGlycemicData, setNewGlycemicData] = useState({
    id: 0,
    dateTime: '',
    insulinType: '',
    glycemia: '',
    carbohydrate: '',
    dose: ''
  });
  const [currentUser, setCurrentUser] = useState({
    "id": 1,
    "name": "John",
    "surname": "Snow"
});
  const [glycemicDataList, setGlycemicDataList] = useState<ItemProps[]>([]);

  useEffect(() => {
    fetchCurrentUserData();
    fetchGlycemicData();
  }, []);

  // Types
  type ItemProps = {
    id: number;
    dateTime: string;
    insulinType: string;
    glycemia: string;
    carbohydrate: string;
    dose: string;
    userName: string;
  };

  // Helper functions
  const handleInputChange = (field: string, value: string) => {
    setNewGlycemicData((prev) => ({ ...prev, [field]: value }));
  };

  const addGlycemicData = async () => {

    try {
      const response = await fetch('http://localhost:8089/glycemia/Glycemia', {
        method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify({
                insulinType: newGlycemicData.insulinType,
                glycemia: newGlycemicData.glycemia,
                carbohydrate: newGlycemicData.carbohydrate,
                dose: newGlycemicData.dose,
                userId: currentUser.id,
            }),
      });
      const json = await response.json();
      console.log(json);
      fetchGlycemicData();
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
    
  };

  const deleteGlycemicData = async (id: number) => {

    try {
      const response = await fetch('http://localhost:8089/glycemia/Glycemia/' + id, {
        method: 'DELETE',
      });
      const json = await response.json();
      console.log(json);
      fetchGlycemicData();
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }

  };

  const fetchGlycemicData = async () => {
    try {
      const response = await fetch('http://localhost:8089/glycemia/Glycemia');
      const json = await response.json();
      setGlycemicDataList(json);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  const fetchCurrentUserData = async () => {
    try {
      const response = await fetch('http://localhost:8089/user/users');
      const json = await response.json();
      setCurrentUser(json[0]);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  // Components
  const GlycemicDataItem = ({
    id,
    dateTime,
    insulinType,
    glycemia,
    carbohydrate,
    dose
  }: ItemProps) => (
    <View style={styles.card}>
      <Text style={styles.cardText}>Date Time: {dateTime}</Text>
      <Text style={styles.cardText}>Insulin Type: {insulinType}</Text>
      <Text style={styles.cardText}>Glycemia: {glycemia}</Text>
      <Text style={styles.cardText}>Carbohydrate: {carbohydrate}</Text>
      <Text style={styles.cardText}>Dose: {dose}</Text>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteGlycemicData(id)}
      >
        <Text style={styles.buttonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text>User name and Surname: {currentUser.name} {currentUser.surname}</Text>
      <Text style={styles.title}>Add Glycemic Data</Text>
      <View style={styles.inputContainer}>
        {['insulinType', 'glycemia', 'carbohydrate', 'dose'].map(
          (field) => (
            <TextInput
              key={field}
              style={styles.input}
              placeholder={`Insert ${field}`}
              keyboardType={field === 'id' ? 'numeric' : 'default'}
              onChangeText={(value) => handleInputChange(field, value)}
            />
          )
        )}
      </View>
      <TouchableOpacity style={styles.addButton} onPress={addGlycemicData}>
        <Text style={styles.buttonText}>Add Glycemic Data</Text>
      </TouchableOpacity>
      <Text style={styles.separator}>Glycemic Data Records</Text>
      <FlatList
        data={glycemicDataList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <GlycemicDataItem {...item} />}
        contentContainerStyle={styles.cardList}
      />
    </View>
  );
}

// Styles
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
