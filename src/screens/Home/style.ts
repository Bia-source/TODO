import { StyleSheet } from "react-native";
import { color } from "../../shared/global/styles";
import { responsiveScreenHeight, responsiveScreenWidth } from "react-native-responsive-dimensions";

export const styles = StyleSheet.create({
    container: {
        flex: 0.2,
        backgroundColor: color.base["gray-700"]
    },
    subContainer: {
       flex: 0.8,
       backgroundColor: color.base["gray-600"]
    },
    logo: {
        marginTop: responsiveScreenHeight(8),
        marginLeft: responsiveScreenWidth(30)     
    },
    input: {
        marginTop: responsiveScreenHeight(-3)
    }
})