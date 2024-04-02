import { Alert, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import AppImages from '../components/AppImages'
import DropDownList from '../components/DropDownList'
import AppColors from '../components/AppColors'
import { Keyboard } from 'react-native'
import AppStyle from '../components/AppStyle'

const CurrencyConverter = ({ route }) => {
    const basePrice = route?.params?.currency;
    const selectedFrom = route?.params?.fromData;

    const [infoVisible, setInfoVisible] = useState(false);
    const [selectedTo, setSelectedTo] = useState('');
    const [amount, setAmount] = useState('');
    const [calculatedPrice, setCalculatedPrice] = useState(null);

    const handleSelectedTo = (value) => {
        setSelectedTo(value);
    }

    const handleTextInputChange = (text) => {
        setAmount(text);
    };

    const onPressButton = async () => {
        if (!amount || !selectedTo) {
            Alert.alert('Error', 'Please input valid details.');
                        return;
        }

        try {
            const apiUrl = `https://api.getgeoapi.com/v2/currency/convert`;
            const queryParams = `amount=${amount}&from=${selectedFrom}&to=${selectedTo}&api_key=60e95e436fefbae11993e08156aaee0d307f8894`;
            const response = await fetch(`${apiUrl}?${queryParams}`);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            const result = basePrice * data.rates[selectedTo].rate_for_amount;

            setCalculatedPrice(result);
        } catch (error) {
            console.error('Error:', error);
        }
        Keyboard.dismiss();
    }
   

    const toggleVisibility = () => {
        setInfoVisible(!infoVisible);
        Keyboard.dismiss();
    };

    return (
        <SafeAreaView style={AppStyle.container} >
            <View style={styles.mainContainer} >
                <View style={[AppStyle.inContainer, styles.header]}>
                    <View style={AppStyle.logoPosition2}>
                    <Image source={AppImages.logo1} style={AppStyle.logo} />
                    </View>
                </View>

                <View style={[AppStyle.inContainer, styles.box2]}>
                    <View style={styles.dropDownListContainer}>
                        <DropDownList placeholder="Select your currency" onSelect={handleSelectedTo} />
                    </View>
                    <View style={styles.containerTwo}>
                        <TextInput
                            placeholder='Amount'
                            value={amount}
                            placeholderTextColor={AppColors.secondaryColor}
                            style={styles.textInput}
                            onChangeText={handleTextInputChange}
                            keyboardType="numeric"
                        />
                        <Text style={styles.text}>Bitcoin(s)</Text>
                    </View>
                </View>

                <View style={[AppStyle.inContainer, AppStyle.buttonContainer]}>
                    <TouchableOpacity onPress={toggleVisibility} style={styles.infoContainer}>
                        <Text style={styles.infoText}>ⓘ</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[AppStyle.button, ]} onPress={onPressButton}>
                        <Text style={[AppStyle.heading, { color: AppColors.secondaryColor }]}>Check Price</Text>
                    </TouchableOpacity>
                </View>

                <View style={[AppStyle.inContainer, styles.result]}>
                    {calculatedPrice !== null &&
                        <>
                            <Text style={styles.text}>Total amount of {amount} BitCoin(s) is  </Text>
                            <Text style={[styles.text, styles.text2]}>{calculatedPrice.toFixed(3)} {selectedTo}</Text>
                            </>
                    }
                </View>

                <View style={[AppStyle.inContainer, AppStyle.noteContainer]}>
                    {infoVisible && <Text style={AppStyle.note}>Instruction: Please enter the amount of Bitcoin and select the
                        currency from dropdown list to see the BitCoin prices in the selected currency.</Text>}
                </View>
            </View>
        </SafeAreaView>
    )
}

export default CurrencyConverter;

const styles = StyleSheet.create({
   
    mainContainer: {
        flex: 1,
        backgroundColor: AppColors.secondaryColor,
        padding: 10,
        paddingHorizontal: 10
    },
    dropDownListContainer: {
        position: 'absolute',
        top: 60,
        left: 0,
        right: 0,
        zIndex: 10,
    },
    
    header: {
        justifyContent: 'center',
    },
    
    box2: {
        justifyContent: 'flex-start',
        flex: 1.5,
    },
    textInput: {
        color: AppColors.secondaryColor,
        fontSize: 14,
        borderColor: AppColors.white,
        borderWidth: 1,
        backgroundColor: AppColors.white,
        borderRadius: 25,
        paddingLeft: 20,
        height: 45,
        marginRight: 10,
        width: '74%'
    },
    text: {
        color: AppColors.white,
        fontSize: 20
    },
    text2: {
        color: AppColors.primaryColor,
        fontFamily: 'interBold2',
        fontSize:25
    },
    infoContainer:{
        margin: 5, 
        alignSelf: 'flex-end'
    },
    infoText:{
        color: AppColors.white, 
        fontSize: 20, 
        color: AppColors.primaryColor, 
        alignSelf: 'flex-end'
    },
    result:{
        alignItems: 'center', 
        flex: .5,
    },
    containerTwo: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 2,
        position: 'absolute',
        top: 125,
        left: 0,
        right: 0,
    },
    button: {
        backgroundColor: AppColors.primaryColor,
        padding: 10,
        borderRadius: 23,
        width: '100%',
        alignItems: 'center',
        height: 50,
    },
  
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    noteContainer: {
        justifyContent: 'flex-end',
        flex: .8
    },
});
