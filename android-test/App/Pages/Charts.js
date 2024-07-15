import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import axios from 'axios';

// Define short forms for departments
const departmentShortForms = {
    'CIVIL': 'CV',
    'CMC': 'CMC',
    'CS OFFICE': 'CS',
    'ELECTRICAL': 'EC',
    'FINANCE': 'FN',
    'GEOLOGY': 'GG',
    'MARKETING': 'MK',
    'MATERIALS': 'MA',
    'MECHANICAL': 'ME',
    'MEDICAL': 'MD',
    'MINES': 'MI',
    'MINING': 'MIG',
    'PERSONNEL': 'PR',
    'PROCESS': 'PRS',
    'SAFETY': 'SF',
    'SURVEY': 'SR',
    'SYSTEMS': 'SY'
};

export default function Charts() {
    const [loading, setLoading] = useState(true);
    const [yearData, setYearData] = useState([]);
    const [departmentData, setDepartmentData] = useState([]);
    const [mineData, setMineData] = useState([]);
    const [laptopData, setLaptopData] = useState([]);
    const [error, setError] = useState(null);
    const [refreshing, setRefreshing] = useState(false); // State for refreshing

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const yearResponse = await axios.get('http://10.0.2.2:3000/api/employees/year-wise');
            setYearData(yearResponse.data);

            const departmentResponse = await axios.get('http://10.0.2.2:3000/api/employees/department-wise');
            setDepartmentData(departmentResponse.data);

            const mineResponse = await axios.get('http://10.0.2.2:3000/api/employees/mine-wise');
            setMineData(mineResponse.data);

            const laptopResponse = await axios.get('http://10.0.2.2:3000/api/employees/laptop-wise');
            setLaptopData(laptopResponse.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Error fetching data');
        } finally {
            setLoading(false);
            setRefreshing(false); // Set refreshing to false after data fetch completes
        }
    };

    const handleRefresh = () => {
        setRefreshing(true); // Set refreshing to true to indicate refresh in progress
        fetchData();
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        return <Text style={styles.errorText}>{error}</Text>;
    }

    const renderLineChart = (data, title) => {
        if (!data || data.length === 0) {
            return null;
        }

        const chartData = {
            labels: data.map(item => departmentShortForms[item.label] || item.label), // Use short form if available
            datasets: [
                {
                    data: data.map(item => item.count),
                    strokeWidth: 2,
                }
            ]
        };

        return (
            <ScrollView horizontal={true}>
                <View style={styles.chartContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <LineChart
                        data={chartData}
                        width={Dimensions.get('window').width * 1.5} // Adjust width as needed
                        height={220}
                        chartConfig={{
                            backgroundColor: '#e26a00',
                            backgroundGradientFrom: '#fb8c00',
                            backgroundGradientTo: '#ffa726',
                            decimalPlaces: 0,
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 16,
                            },
                            propsForDots: {
                                r: '6',
                                strokeWidth: '2',
                                stroke: '#ffa726',
                            },
                        }}
                        bezier
                        style={{
                            marginVertical: 8,
                            borderRadius: 16,
                        }}
                    />
                </View>
            </ScrollView>
        );
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.container}>
                {renderLineChart(yearData, 'Year-wise Employee Data')}
                {renderLineChart(departmentData, 'Department-wise Employee Data')}
                {renderLineChart(mineData, 'Mine-wise Employee Data')}
                {renderLineChart(laptopData, 'Laptop-wise Employee Data')}
                <TouchableOpacity onPress={handleRefresh} style={styles.refreshButton}>
                    <Text style={styles.refreshButtonText}>Refresh Data</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    chartContainer: {
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
    },
    refreshButton: {
        marginTop: 20,
        backgroundColor: '#165da2',
        padding: 10,
        borderRadius: 8,
    },
    refreshButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});