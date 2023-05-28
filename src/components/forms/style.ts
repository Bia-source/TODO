import { StyleSheet } from "react-native";
import { responsiveScreenHeight, responsiveScreenWidth } from "react-native-responsive-dimensions";
import { color, size } from "../../shared/global/styles";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
    },
    containerInput: {
        flex: 1,
        flexDirection: "row"
    },
    inputText: {
        color: "#FFFFFF",
        backgroundColor: color.base["gray-500"],
        padding: 16,
        borderRadius: 6,
        fontSize: size.big,
        width: responsiveScreenWidth(75),
        height: responsiveScreenHeight(5.6),
        marginLeft: responsiveScreenWidth(5)
    }
})