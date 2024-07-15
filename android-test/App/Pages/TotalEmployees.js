import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, ScrollView, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native';
import axios from 'axios';

const TotalEmployees = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [category, setCategory] = useState(null); // Track selected category
    const [subcategory, setSubcategory] = useState(null); // Track selected subcategory
    const [employeeData, setEmployeeData] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const fetchEmployeesByCategory = async () => {
        setLoading(true);
        setError(null);

        try {
            let url = `http://10.0.2.2:3000/api/employees/${category}/${subcategory}`;

            // Append date range for date-wise fetch
            if (category === 'datewise') {
                const formattedStartDate = startDate.split('-').reverse().join('-');
                const formattedEndDate = endDate.split('-').reverse().join('-');

                url = `http://10.0.2.2:3000/api/employees/datewise?dateFrom=${formattedStartDate}&dateTo=${formattedEndDate}`;
            }

            const response = await axios.get(url);
            // Add SL.NO to each employee object
            const dataWithSLNO = response.data.map((emp, index) => ({ ...emp, 'SL.NO': index + 1 }));
            setEmployeeData(dataWithSLNO);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Error fetching data. Please try again.');
            setLoading(false);
        }
    };

    const fetchAllEmployees = async () => {
        setLoading(true);
        setError(null);
    
        try {
            const response = await axios.get('http://10.0.2.2:3000/api/employees/all');
            
            // Add SL.NO to each employee object
            const dataWithSLNO = response.data.map((emp, index) => ({ ...emp, 'SL.NO': index + 1 }));
            
            setEmployeeData(dataWithSLNO);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Error fetching data. Please try again.');
            setLoading(false);
        }
    };
    

    const handleCategorySelect = (selectedCategory) => {
        setCategory(selectedCategory);
        setSubcategory(null);
        setStartDate('');
        setEndDate('');
        setEmployeeData([]);
    };

    const handleSubcategorySelect = (selectedSubcategory) => {
        setSubcategory(selectedSubcategory);
        fetchEmployeesByCategory();
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
             {/* Fetch All Employees Button */}
             <Button title="All Employees"
             color="#165da2" onPress={fetchAllEmployees} />

            {/* Category Buttons */}
            <View style={styles.categoryContainer}>
                <Button title="Year-wise" color="#165da2" onPress={() => handleCategorySelect('year')} />
                <Button title="Department-wise" color="#165da2" onPress={() => handleCategorySelect('department')} />
                <Button title="Mine-wise" color="#165da2" onPress={() => handleCategorySelect('mine')} />
                <Button title="Laptop-wise" color="#165da2" onPress={() => handleCategorySelect('laptop')} />
                <Button title="Date-wise" color="#165da2" onPress={() => handleCategorySelect('datewise')} />
            </View>

            {/* Subcategory Buttons */}
            {category === 'year' && (
                <ScrollView horizontal>
                    <TouchableOpacity style={styles.smallSubcategoryButton} onPress={() => handleSubcategorySelect('2023')}>
                        <Text>2023</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.smallSubcategoryButton} onPress={() => handleSubcategorySelect('2024')}>
                        <Text>2024</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.smallSubcategoryButton} onPress={() => handleSubcategorySelect('2025')}>
                        <Text>2025</Text>
                    </TouchableOpacity>
                </ScrollView>
            )}

            {category === 'department' && (
                <ScrollView horizontal>
                    <TouchableOpacity style={styles.smallSubcategoryButton} onPress={() => handleSubcategorySelect('CIVIL')}>
                        <Text>CIVIL</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.smallSubcategoryButton} onPress={() => handleSubcategorySelect('CMC')}>
                        <Text>CMC</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.smallSubcategoryButton} onPress={() => handleSubcategorySelect('CS OFFICE')}>
                        <Text>CS OFFICE</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.smallSubcategoryButton} onPress={() => handleSubcategorySelect('ELECTRICAL')}>
                        <Text>ELECTRICAL</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.smallSubcategoryButton} onPress={() => handleSubcategorySelect('FINANCE')}>
                        <Text>FINANCE</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.smallSubcategoryButton} onPress={() => handleSubcategorySelect('GEOLOGY')}>
                        <Text>GEOLOGY</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.smallSubcategoryButton} onPress={() => handleSubcategorySelect('MARKETING')}>
                        <Text>MARKETING</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.smallSubcategoryButton} onPress={() => handleSubcategorySelect('MATERIALS')}>
                        <Text>MATERIALS</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.smallSubcategoryButton} onPress={() => handleSubcategorySelect('MECHANICAL')}>
                        <Text>MECHANICAL</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.smallSubcategoryButton} onPress={() => handleSubcategorySelect('MEDICAL')}>
                        <Text>MEDICAL</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.smallSubcategoryButton} onPress={() => handleSubcategorySelect('MINES')}>
                        <Text>MINES</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.smallSubcategoryButton} onPress={() => handleSubcategorySelect('MINING')}>
                        <Text>MINING</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.smallSubcategoryButton} onPress={() => handleSubcategorySelect('PERSONNEL')}>
                        <Text>PERSONNEL</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.smallSubcategoryButton} onPress={() => handleSubcategorySelect('PROCESS')}>
                        <Text>PROCESS</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.smallSubcategoryButton} onPress={() => handleSubcategorySelect('SAFETY')}>
                        <Text>SAFETY</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.smallSubcategoryButton} onPress={() => handleSubcategorySelect('SURVEY')}>
                        <Text>SURVEY</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.smallSubcategoryButton} onPress={() => handleSubcategorySelect('SYSTEMS')}>
                        <Text>SYSTEMS</Text>
                    </TouchableOpacity>
                </ScrollView>
            )}

            {category === 'mine' && (
                <ScrollView horizontal>
                    <TouchableOpacity style={styles.smallSubcategoryButton} onPress={() => handleSubcategorySelect('BG')}>
                        <Text>BALAGHAT</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.smallSubcategoryButton} onPress={() => handleSubcategorySelect('BL')}>
                        <Text>BELDONGRI</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.smallSubcategoryButton} onPress={() => handleSubcategorySelect('CH')}>
                        <Text>CHIKLA</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.smallSubcategoryButton} onPress={() => handleSubcategorySelect('DB')}>
                        <Text>DONGRI BUZURG</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.smallSubcategoryButton} onPress={() => handleSubcategorySelect('GM')}>
                        <Text>GUMGAON</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.smallSubcategoryButton} onPress={() => handleSubcategorySelect('HO')}>
                        <Text>HEAD OFFICE</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.smallSubcategoryButton} onPress={() => handleSubcategorySelect('KD')}>
                        <Text>KANDRI</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.smallSubcategoryButton} onPress={() => handleSubcategorySelect('MS')}>
                        <Text>MUNSAR</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.smallSubcategoryButton} onPress={() => handleSubcategorySelect('SP')}>
                        <Text>SITAPATORE</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.smallSubcategoryButton} onPress={() => handleSubcategorySelect('TD')}>
                        <Text>TIROD</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.smallSubcategoryButton} onPress={() => handleSubcategorySelect('UK')}>
                        <Text>UKWA</Text>
                    </TouchableOpacity>
                </ScrollView>
            )}

            {category === 'laptop' && (
                <ScrollView horizontal>
                    <TouchableOpacity style={styles.smallSubcategoryButton} onPress={() => handleSubcategorySelect('ACER')}>
                        <Text>ACER</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.smallSubcategoryButton} onPress={() => handleSubcategorySelect('ASUS')}>
                        <Text>ASUS</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.smallSubcategoryButton} onPress={() => handleSubcategorySelect('DELL')}>
                        <Text>DELL</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.smallSubcategoryButton} onPress={() => handleSubcategorySelect('HP')}>
                        <Text>HP</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.smallSubcategoryButton} onPress={() => handleSubcategorySelect('LENOVO')}>
                        <Text>LENOVO</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.smallSubcategoryButton} onPress={() => handleSubcategorySelect('SAMSUNG')}>
                        <Text>SAMSUNG</Text>
                    </TouchableOpacity>
                </ScrollView>
            )}
            {category === 'datewise' && (
                <View>
                    <TextInput
                        style={styles.input}
                        placeholder="Start Date (DD-MM-YYYY)"
                        value={startDate}
                        onChangeText={setStartDate}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="End Date (DD-MM-YYYY)"
                        value={endDate}
                        onChangeText={setEndDate}
                    />
                    <Button title="Fetch Data" color="#165da2" onPress={fetchEmployeesByCategory} />
                </View>
            )}

            {/* Loading and Error Handling */}
            {loading && <ActivityIndicator size="large" color="#0000ff" />}
            {error && <Text style={styles.errorText}>{error}</Text>}

            {/* Employee Data Table */}
            {!loading && employeeData.length > 0 && (
                <ScrollView horizontal>
                    <View style={styles.tableContainer}>
                        <View style={[styles.tableHeader, styles.tableRow]}>
                            <View style={[styles.tableHeaderCellContainer, { width: 60 }]}>
                                <Text style={styles.tableHeaderCell}>SL.NO</Text>
                            </View>
                            {/* Render other headers dynamically */}
                            {Object.keys(employeeData[0]).map((key) => (
                                key !== 'SLNO' && key !== 'SL.NO' && (
                                    <View key={key} style={styles.tableHeaderCellContainer}>
                                        <Text style={styles.tableHeaderCell}>{key}</Text>
                                    </View>
                                )
                            ))}
                        </View>
                        {employeeData.map((employee, index) => (
                            <View key={index} style={[styles.tableRow]}>
                                <View style={[styles.tableCellContainer, { width: 60 }]}>
                                    <Text style={styles.tableCell}>{employee['SL.NO']}</Text>
                                </View>
                                {/* Render other data dynamically */}
                                {Object.keys(employee).map((key) => (
                                    key !== 'SLNO' && key !== 'SL.NO' && (
                                        <View key={key} style={styles.tableCellContainer}>
                                            <Text style={styles.tableCell}>{employee[key]}</Text>
                                        </View>
                                    )
                                ))}
                            </View>
                        ))}
                    </View>
                </ScrollView>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    categoryContainer: {
        marginBottom: 20,
    },
    smallSubcategoryButton: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginHorizontal: 6,
        backgroundColor: '#ddd',
        borderRadius: 5,
        marginBottom: 15,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 10,
    },
    errorText: {
        color: 'red',
        marginBottom: 12,
    },
    tableContainer: {
        borderWidth: 1,
        borderColor: '#000',
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#f1f1f1',
        borderBottomWidth: 1,
        borderBottomColor: '#000',
    },
    tableHeaderCellContainer: {
        width: 120, // Fixed width for header cells
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#000',
    },
    tableHeaderCell: {
        padding: 8,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    tableRow: {
        flexDirection: 'row',
    },
    tableCellContainer: {
        width: 120, // Fixed width for table cells
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#000',
    },
    tableCell: {
        padding: 8,
        textAlign: 'center',
    },
});

export default TotalEmployees;