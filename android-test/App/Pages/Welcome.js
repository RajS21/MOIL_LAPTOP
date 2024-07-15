import { StyleSheet, View, Text, Image, Button} from 'react-native';
import React from 'react';
/* import Colors from '../Shared/Colors'; */
import { useNavigation } from '@react-navigation/native';

export default function Welcome() {
  const navigation = useNavigation()
  
  return (
    <View>     
      <Image source={require('./../Assets/Images/laptop.jpg')}/>
      <View style={styles.imageContainer}>
      <Image source={require('./../Assets/Images/MOIL.jpg')} style = {styles.image} />
      </View>
          <View style={styles.container}>
          <Text style={styles.welcomeText}>Welcome to MOIL Laptop Management</Text>
          <View style={styles.button}>
            <Button 
            title='Click' 
            color="#165da2"
            onPress={() => navigation.navigate('Home')}></Button>  
          </View>
          </View> 
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    paddingTop:30,
    marginTop: -15,
    backgroundColor: '#fff',
    borderTopRightRadius: 25,
    borderTopLeftRadius:25

  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 3,
    backgroundColor: '#fff',
  },
  image: {
    width: '50%', // Adjust as per your layout needs
    height: 120, // Adjust as per your image aspect ratio
    marginBottom: 15,
    marginTop: 20,
    alignItems: 'center',
  },
  welcomeText:{
    fontSize:35, 
    textAlign:'center', 
    fontWeight:'bold',
    fontStyle: 'italic'
  },
  button:{
    padding:10,
    margin:10,
    justifyContent: 'center',
    alignItems: 'center', 
    borderRadius: 30,
  }
})



