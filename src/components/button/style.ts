import { StyleSheet } from "react-native";
import { responsiveScreenHeight, responsiveScreenWidth } from "react-native-responsive-dimensions";

interface IProps{
    backgroundColor?: string;
}

export const styles = (props: any) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: props,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        height: responsiveScreenHeight(5.5),
        maxWidth: responsiveScreenWidth(12),
        marginLeft: responsiveScreenWidth(1.3)
    },
    iconAdd: {
        height: 20,
        width: 20
    }
})