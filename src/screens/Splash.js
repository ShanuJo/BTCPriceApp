import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import AppImages from '../components/AppImages'

const Splash = ({navigation}) => {
      useEffect(() => {
    
            setTimeout(() => {
            navigation.replace('Dashboard');
            
        }, 1000); 
     
    
}, []);
  return (
    <View style={styles.container}>
      <Image source={AppImages.logo1} style={styles.logo}/>
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#000',
    justifyContent:'center',
    alignItems:'center',
    paddingHorizontal:20,
},
    logo:{
        resizeMode:'contain',
        width: '50%'
    }
})