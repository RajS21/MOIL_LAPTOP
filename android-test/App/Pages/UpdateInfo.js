import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import axios from 'axios';

export default function UpdateInfo({ route, navigation }) {
    const { employeeData } = route.params;
    const [updatedEmployeeData, setUpdatedEmployeeData] = useState(employeeData);

    const handleInputChange = (name, value) => {
        setUpdatedEmployeeData({ ...updatedEmployeeData, [name]: value });
    };

    const handleSave = () => {
        axios.put(`http://10.0.2.2:3000/api/employee/${updatedEmployeeData.EMPNO}`, updatedEmployeeData)
            .then(response => {
                Alert.alert('Success', 'Employee information updated successfully');
                navigation.navigate('InfoReport', { employeeData: updatedEmployeeData });
            })
            .catch(error => {
                console.error('Error updating data:', error);
                Alert.alert('Error', 'Failed to update employee information');
            });
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <Text style={styles.heading}>Update Employee Information</Text>
                <View style={styles.employeeContainer}>
                    {Object.keys(updatedEmployeeData).map((key) => (
                        <TextInput
                            key={key}
                            placeholder={key}
                            value={updatedEmployeeData[key]}
                            onChangeText={(value) => handleInputChange(key, value)}
                            style={styles.input}
                        />
                    ))}
                </View>
                <Button title="Save" onPress={handleSave} />
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

