import React, { View, TouchableOpacity, Text, Image } from "react-native";
import { styles } from "./style";
import iconAdd from "../../../assets/iconAdd.png";

interface IPropsButton{
    backgroundColor: string;
    handle:(handleAdd?: any, paramsHandle?: any) => void;
}

export function Button(props: IPropsButton){

    function handleButton(){
       props.handle()
    }

   return(
    <>
        <TouchableOpacity onPress={props.handle} style={styles(props.backgroundColor).container}>
            <Image source={iconAdd} style={styles({}).iconAdd}/>
        </TouchableOpacity>
     
    </>
   )
}