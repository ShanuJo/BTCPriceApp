import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SelectList } from 'react-native-dropdown-select-list'
import AppColors from './AppColors';
import AppStyle from './AppStyle';


const DropDownList = ({ placeholder, onSelect }) => {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState('');
const [loading, setLoading] = useState(true)

  const fecthCountryData = async () => {
    try {
      const response = await fetch(
        "https://api.getgeoapi.com/v2/currency/convert?api_key=60e95e436fefbae11993e08156aaee0d307f8894&format=json"
      );
      const realData = await response.json();

      const options = Object.keys(realData.rates).map(currency => ({
        value: currency,
        label: realData?.rates[currency]?.currency_name,
        rate: realData?.rates[currency]?.rate,
      }));
      setCurrencyOptions(options)
      setSelectedCurrency(options[0]?.value || '');
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fecthCountryData();
  }, []);

  return (
    <View >
      <SelectList
        setSelected={(val) => onSelect(val)}
        data={currencyOptions}
        search
        placeholder={placeholder}
        boxStyles={styles.boxStyles}
        inputStyles={styles.inputStyles}
        dropdownStyles={styles.dropdownStyles}
        dropdownTextStyles={AppStyle.text}
        dropdownItemStyles={AppStyle.text}
       
      />
    </View>
  )
}

export default DropDownList

const styles = StyleSheet.create({
  boxStyles:{
    width: '100%', 
    backgroundColor: '#f5f5f5', 
    height: 45, 
    borderColor: AppColors.white, 
    borderWidth: 1, 
    borderRadius:25 
  },
  inputStyles:{
    color: AppColors.secondaryColor, 
    padding:2
  },
  dropdownStyles:{
    width: '100%', 
    height: 130, 
    zIndex:1, 
    backgroundColor: AppColors.secondaryColor, 
    color: AppColors.white
  },
 
})