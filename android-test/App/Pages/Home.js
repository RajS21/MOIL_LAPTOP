import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput, ActivityIndicator, Image, ScrollView } from 'react-native';
import axios from 'axios';

export default function Home({ navigation }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [employeeId, setEmployeeId] = useState('');

    const fetchEmployeeData = (id) => {
        setLoading(true);
        axios.get(`http://10.0.2.2:3000/api/employee/${id}`)
            .then(response => {
                setLoading(false);
                navigation.navigate('InfoReport', { employeeData: response.data });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                if (error.response) {
                    setError(`Error: ${error.response.data.error}`);
                } else if (error.request) {
                    setError('No response received from the server');
                } else {
                    setError('Error fetching data');
                }
                setLoading(false);
            });
    };

    const handleGetInfo = () => {
        if (employeeId) {
            fetchEmployeeData(employeeId);
        } else {
            setError('Please enter a valid employee ID');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View>
        <View style={styles.imageContainer}>
        <Image source={require('./../Assets/Images/logo.jpg')} style = {styles.image} />
        </View>
            <View style={styles.container}>
                <Text style={styles.helloText}>Hello, Employee</Text>
                <Text style={styles.getData}>Employee Id: </Text>
                <TextInput
                    placeholder="Enter EMPNO."
                    style={{ width: 200, backgroundColor: 'white', height: 50, margin: 20, padding: 10, marginBottom: 10}}
                    value={employeeId}
                    onChangeText={setEmployeeId}
                />
                <View style={styles.button}>
                    <Button title='Get Info' onPress={handleGetInfo} color="#165da2" />
                    {loading && <ActivityIndicator size="large" color="#007bff" />}
                    {error && <Text style={styles.errorText}>{error}</Text>}
                </View>
                <View style={styles.button}>
                    <Button
                        title="Add New Information"
                        onPress={() => navigation.navigate('AddNewInfo')}
                        color="#165da2"
                    />
                </View>
                <View style={styles.button}>
                    <Button
                        title="Total Employees"
                        onPress={() => navigation.navigate('TotalEmployees')}
                        color="#165da2"
                    />
                </View>
                <View style={styles.button}>
                    <Button
                        title="Total Amount"
                        onPress={() => navigation.navigate('TotalAmount')}
                        color="#165da2"
                    />
                </View>
                <View style={styles.button}>
                    <Button
                        title="Charts"
                        onPress={() => navigation.navigate('Charts')}
                        color="#165da2"
                    />
                </View>
                <View style={styles.button}>
                    <Button
                    title="Laptop Policy"
                    color="#165da2"
                    /* color="#17a2b8" */
                    />
                </View>
            </View>
        </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
    },
    container: {
        paddingTop: 60,
        marginTop: -15,
        backgroundColor: '#fff',
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25
    },
    imageContainer: {
        alignItems: 'center',
        marginTop: 3,
        backgroundColor: '#fff',
      },
      image: {
        width: '22%', // Adjust as per your layout needs
        height: 90, // Adjust as per your image aspect ratio
        marginBottom: 15,
        marginTop: 20,
        alignItems: 'center',
      },
    helloText: {
        fontSize: 20,
        textAlign: 'right',
        fontWeight: 'bold',
        marginTop: -35,
    },
    getData: {
        padding: 20,
        fontSize: 30,
        textAlign: 'left',
        fontWeight: 'bold',
        fontStyle:'italic',
        marginBottom: -30,
        marginTop: -20,
    },
    button: {
        padding: 10,
        marginHorizontal: 30,
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',  // Light border color
        backgroundColor: '#f8f9fa',  // Light background color
    },
    errorText: {
        color: 'red',
        textAlign: 'center'
    }
});













