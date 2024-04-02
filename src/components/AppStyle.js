import { Platform } from "react-native";
import AppColors from "./AppColors";
import Constants from "./Constants";

const AppStyle = {
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    logo: {
        resizeMode: 'contain',
        width: Constants.screenWidth / 4.5,
    },
    inContainer: {
        flex: 1,
    },
    heading: {
        color: AppColors.white,
        fontSize: 22,
        fontFamily: 'interBold'
    },
    logoPosition: {
        position: 'absolute',
        top: -100,
    },
    logoPosition2: {
        position: 'absolute',
        top: Platform.OS === 'ios'? -100 :-70,
    },
    button: {
        backgroundColor: AppColors.primaryColor,
        padding: 10,
        borderRadius: 23,
        width: '95%',
        alignItems: 'center',
        height: 50
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    noteContainer: {
        justifyContent: 'flex-end',
        flex: 1
    },
    note: {
        color: AppColors.white,
        fontStyle: 'italic',
        fontSize: 13
    },
    text: {
        color: AppColors.white
    }
}

export default AppStyle;