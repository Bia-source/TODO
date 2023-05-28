import React, { View, Text, TouchableOpacity, Image } from "react-native"
import { styles } from "./style";
import { ITasks } from "../../shared/global/interfaces";
import { responsiveScreenWidth } from "react-native-responsive-dimensions";

interface IPropsCounter{
    quantityTasks: number; 
    quantityComplete: number;
}

export function CounterTask({quantityTasks, quantityComplete}: IPropsCounter) {
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: "row" }}>
                <Text style={styles.textCreate}> Criadas</Text>

                <View style={styles.quantityTasks}>
                    <Text style={styles.numbers}> {quantityTasks} </Text>
                </View>
            </View>

            <View style={{flexDirection: "row", marginRight: responsiveScreenWidth(1)}}>
                <Text style={styles.textComplete}> Concluídas</Text>
                <View style={styles.quantityTasks}>
                    <Text style={styles.numbers}> {quantityComplete} </Text>
                </View>
            </View>

        </View>
    )
}