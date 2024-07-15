import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import axios from 'axios';

export default function AddNewInfo({ navigation }) {
    const [newEmployeeData, setNewEmployeeData] = useState({
        EMPNO: '',
        EMPNAME: '',
        DEPARTMENT: '',
        "MINE NAME": '',
        "E or NE": '',
        "LAPTOP MAKE": '',
        "INVOICE DATE": '',
        "LAST LAPTOP PURCHASE DATE": '',
        "AMOUNT (EXCTAXES)": '',
        "TOTAL AMOUNT": '',
        "RETURNED / RETAINED OLD LAPTOP": '',
        "pdf_path": '',
    });

    const handleInputChange = (name, value) => {
        setNewEmployeeData({ ...newEmployeeData, [name]: value });

        // Fetch EMPNAME and MINE NAME if EMPNO is entered
        if (name === 'EMPNO' && value) {
            axios.get(`http://10.0.2.2:3000/api/list/employee/${value}`)
                .then(response => {
                    const { EMPNAME, 'MINE NAME': mineName } = response.data;
                    setNewEmployeeData(prevData => ({
                        ...prevData,
                        EMPNAME,
                        "MINE NAME": mineName
                    }));
                })
                .catch(error => {
                    console.error('Error fetching employee data:', error);
                    Alert.alert('Error', 'Failed to fetch employee data');
                });
        }
    };

    const handleSave = () => {
        console.log('Sending data to backend:', newEmployeeData);
        axios.post('http://10.0.2.2:3000/api/employee', newEmployeeData)
            .then(response => {
                Alert.alert('Success', 'Employee information saved successfully');
                navigation.navigate('Home');
            })
            .catch(error => {
                console.error('Error saving data:', error);
                Alert.alert('Error', 'Failed to save employee information');
            });
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <Text style={styles.heading}>Add New Employee Information</Text>
                <View style={styles.employeeContainer}>
                    {Object.keys(newEmployeeData).map((key) => (
                        <TextInput
                            key={key}
                            placeholder={key}
                            value={newEmployeeData[key]}
                            onChangeText={(value) => handleInputChange(key, value)}
                            style={styles.input}
                        />
                    ))}
                </View>
                <Button 
                title="Save"
                color="#165da2"
                onPress={handleSave} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20
    },
    employeeContainer: {
        marginBottom: 20
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginVertical: 10,
        borderRadius: 5
    }
});
