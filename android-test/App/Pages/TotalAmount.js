import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Image } from 'react-native';
import axios from 'axios';

const TotalAmountPage = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [totalAmountData, setTotalAmountData] = useState(null);

    useEffect(() => {
        fetchTotalAmounts();
    }, []);

    const fetchTotalAmounts = () => {
        setLoading(true);
        axios.get('http://10.0.2.2:3000/api/employees/totalamounts')
            .then(response => {
                setTotalAmountData(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching total amounts:', error);
                setError('Failed to fetch total amounts');
                setLoading(false);
            });
    };

    return (
        <View style={styles.container}>
            <Image source={require('./../Assets/Images/cash3.jpeg')} style={styles.image} />
            {loading ? (
                <ActivityIndicator size="large" color="#007bff" />
            ) : error ? (
                <Text style={styles.errorText}>Error: {error}</Text>
            ) : totalAmountData ? (
                <View>
                    <Text style={styles.totalText}>Overall Total: ₹{totalAmountData.overallTotal}</Text>
                    <Text style={styles.subtitle}>Year-wise Totals:</Text>
                    {totalAmountData.yearWiseTotal.map(yearTotal => (
                        <Text key={yearTotal.year} style={styles.yearTotalText}>
                            Year {yearTotal.year}: ₹{yearTotal.totalAmount}
                        </Text>
                    ))}
                </View>
            ) : (
                <Text>No data available</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#f1f1f1', // Light background color
    },
    image: {
        width: '100%', // Adjust as per your layout needs
        height: 350, // Adjust as per your image aspect ratio
        marginBottom: 30,
    },
    totalText: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 22,
        marginTop: 20,
        marginBottom: 10,
        fontStyle: 'italic',
        fontWeight: 'bold',
    },
    yearTotalText: {
        fontSize: 16,
        marginBottom: 5,
        fontWeight: 'bold',
    },
    errorText: {
        fontSize: 18,
        color: 'red',
        textAlign: 'center',
    },
});

export default TotalAmountPage;
