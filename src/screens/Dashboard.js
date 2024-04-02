import { Image, StyleSheet, Text, View, FlatList, TouchableOpacity, RefreshControl, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import AppColors from '../components/AppColors'
import AppImages from '../components/AppImages'
import Constants from '../components/Constants'
import { SafeAreaView } from 'react-native-safe-area-context';
import AppStyle from '../components/AppStyle'


const Dashboard = ({ navigation }) => {
    const [refreshing, setRefreshing] = useState(false);
    const [priceData, setPriceData] = useState();
    const [bpiData, setBpiData] = useState();
    const [loading, setLoading] = useState(true);
    const [selectedCurrency, setSelectedCurrency] = useState(null);

    const getCurrentPrice = async () => {
        try {
            const response = await fetch(
                "https://api.coindesk.com/v1/bpi/currentprice.json"
            );

            const realData = await response.json();
            setPriceData(realData);
            setBpiData(realData.bpi);

            const bpiDataArray = Object?.entries(realData.bpi)[2]
            setSelectedCurrency(bpiDataArray)

            setLoading(false);

        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        getCurrentPrice();
    }, []);



    const onRefresh = async () => {
        setRefreshing(true);
        await getCurrentPrice();
        setRefreshing(false);

    };

    const handleCurrencyPress = (currency) => {
        setSelectedCurrency(currency);
    }

    const onPressButton = () => {
        navigation.navigate('CurrencyConverter', { fromData: selectedCurrency[1].code, currency: selectedCurrency[1].rate_float });
    }

    return (
        <ScrollView style={AppStyle.container} contentContainerStyle={styles.scrollViewContainer}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            <SafeAreaView style={styles.container1}>

            <View style={[AppStyle.inContainer, styles.header]}>
                    <View style={AppStyle.logoPosition}>
                    <Image source={AppImages.logo1} style={AppStyle.logo} />
                    </View>
                </View>
                {selectedCurrency === null ?
                    <Text style={AppStyle.text}>Loading...</Text> :
                    <View style={[AppStyle.inContainer, styles.priceContainer]}>
                        <View style={[styles.priceContainer2]}>
                            <Text style={AppStyle.heading}>Current Bitcoin Price</Text>

                            <><View style={styles.btcContainer}>
                                <Text style={styles.price}>
                                    {selectedCurrency[1]?.code === 'USD' ? '$' :
                                        selectedCurrency[1]?.code === 'EUR' ? '€' :
                                            selectedCurrency[1]?.code === 'GBP' ? '£' : ''}
                                </Text>                                    
                                <Text style={styles.price}> {selectedCurrency[1]?.rate}
                                </Text>
                                </View>
                                <Text style={styles.dateText}>Last updated by {priceData?.time?.updated}</Text>
                            </>


                        </View>
                        <View style={[styles.codeContainer]}>

                            <ScrollView horizontal>
                                <View style={{ minHeight: 200, zIndex: 1 }}>
                                    <FlatList
                                        data={Object.entries(bpiData)}
                                        keyExtractor={(item) => item[0]}
                                        renderItem={({ item }) => (
                                            <TouchableOpacity
                                                style={styles.itemContainer}
                                                onPress={() => handleCurrencyPress(item)}
                                            >

                                                <TouchableOpacity
                                                    style={styles.radioButton}
                                                    onPress={() => handleCurrencyPress(item)}
                                                >
                                                    {selectedCurrency && selectedCurrency[0] === item[0] && (
                                                        <View style={styles.radioButtonInner} />
                                                    )}
                                                </TouchableOpacity>
                                                <Text style={styles.currency}>{item[0]}</Text>
                                            </TouchableOpacity>
                                        )}
                                        numColumns={3}
                                    />

                                </View>
                            </ScrollView>

                        </View>
                    </View>
                }

                <View style={[AppStyle.inContainer, AppStyle.buttonContainer]}>
                    <TouchableOpacity style={AppStyle.button}
                        onPress={onPressButton}
                    >
                        <Text style={[AppStyle.heading, { color: AppColors.secondaryColor }]}>Calculate Bitcoin Price</Text>
                    </TouchableOpacity>
                </View>

                <View style={[AppStyle.inContainer, AppStyle.noteContainer]}>
                    <Text style={AppStyle.note}>Note:{priceData?.disclaimer}</Text>
                </View>
            </SafeAreaView>
        </ScrollView>

    )
}

export default Dashboard

const styles = StyleSheet.create({
    
    container1: {
        flex: 1,
        backgroundColor: '#000',
        padding: 10,
        paddingHorizontal: 10,

        height: Constants.screenHeight
    },
    scrollViewContainer: {
        flexGrow: 1,
    },
    
    header: {
        justifyContent: 'center',
        height: Constants.screenHeight / 7,
    },
    
    priceContainer: {
        paddingTop: 30,
        flex: 2,

    },
    priceContainer2: {
        flex: 1.5,

        justifyContent: 'center'
    },
    btcContainer:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    price: {
        color: AppColors.primaryColor,
        fontFamily: 'interBold2',
        fontSize: 53,
    },
    dateText: {
        color: AppColors.white,
        alignSelf: 'flex-end',
        fontFamily: 'interItalic'
    },
    codeContainer: {
        alignItems: 'center',

        flex: 1
    },
    itemContainer: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 13,
        alignItems: 'center'
    },
    currency: {
        color: AppColors.white,
        fontSize: 22,
        marginLeft: 10
    },
    radioButton: {
        width: 22,
        height: 22,
        borderRadius: 11,
        borderWidth: 2,
        borderColor: AppColors.white,
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioButtonInner: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: AppColors.primaryColor,
    },
    
})
