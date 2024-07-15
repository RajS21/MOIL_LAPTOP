import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

export default function InfoReport({ route, navigation }) {
    const { employeeData } = route.params;

    const handleDelete = () => {
        Alert.alert(
            "Delete Employee",
            "Are you sure you want to delete this employee's information?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "OK",
                    onPress: () => {
                        axios.delete(`http://10.0.2.2:3000/api/employee/${employeeData.EMPNO}`)
                            .then(response => {
                                Alert.alert('Success', 'Employee information deleted successfully');
                                navigation.navigate('Home');
                            })
                            .catch(error => {
                                console.error('Error deleting data:', error);
                                Alert.alert('Error', 'Failed to delete employee information');
                            });
                    }
                }
            ]
        );
    };

    const renderTableRow = (label, value) => (
        <View style={styles.tableRow}>
            <Text style={styles.tableCell}>{label}</Text>
            <Text style={styles.tableCell}>{value}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Info Report of Employee</Text>
            {employeeData && (
                <View style={styles.tableContainer}>
                    {renderTableRow('Employee Id', employeeData.EMPNO)}
                    {renderTableRow('Employee Name', employeeData.EMPNAME)}
                    {renderTableRow('Department', employeeData.DEPARTMENT)}
                    {renderTableRow('Mine Name', employeeData["MINE NAME"])}
                    {renderTableRow('E or NE', employeeData["E or NE"])}
                    {renderTableRow('Laptop Company', employeeData["LAPTOP MAKE"])}
                    {renderTableRow('Invoice Date', employeeData["INVOICE DATE"])}
                    {renderTableRow('Last Laptop Purchase Date', employeeData["LAST LAPTOP PURCHASE DATE"])}
                    {renderTableRow('Amount', employeeData["AMOUNT (EXCTAXES)"])}
                    {renderTableRow('Total Amount', employeeData["TOTAL AMOUNT"])}
                    {renderTableRow('Return/Retained/FirstTime', employeeData["RETURNED / RETAINED OLD LAPTOP"])}
                    <Button
                        title="Update Info"
                        color="#165da2"
                        onPress={() => navigation.navigate('UpdateInfo', { employeeData })}
                    />
                    <Button
                        title="Delete Info"
                        color="#E74C3C"
                        onPress={handleDelete}
                    />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
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
    tableContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        overflow: 'hidden',
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
    tableCell: {
        flex: 1,
        padding: 10,
        borderRightWidth: 1,
        borderColor: '#ccc',
        textAlign: 'left',
    },
    tableCellLast: {
        borderRightWidth: 0,
    },
    buttonContainer: {
        marginTop: 20
    },
    errorText: {
        color: 'red',
        textAlign: 'center'
    }
});