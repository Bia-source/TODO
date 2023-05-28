import { StyleSheet } from "react-native";
import { responsiveScreenHeight, responsiveScreenWidth, responsiveWidth } from 'react-native-responsive-dimensions';
import { color, size } from "../../shared/global/styles";

export const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: responsiveScreenWidth(86),
        marginLeft: responsiveScreenWidth(5.6),
        marginTop: responsiveScreenHeight(2)
    },
    textCreate: {
        color: color.product.blue,
        fontSize: size.mid,
        fontWeight: "700",
        marginLeft: 0,
    },
    textComplete: {
        color: color.product.purple,
        fontSize: size.mid,
        fontWeight: "700",
        marginLeft: 0
    },
    quantityTasks: {
        backgroundColor: "#333333",
        borderRadius: 10,
        padding: 1,
        marginLeft: responsiveScreenWidth(1.3)
    },
    numbers: {
        color: color.base["gray-100"],
        fontWeight: "700"
    }
})

// backgroundColor: "#333333", borderRadius: 10, padding: 1, marginLeft: responsiveWidth(-40)