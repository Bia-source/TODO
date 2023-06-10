import React, { View, Text, Image, TouchableOpacity } from "react-native";
import { styles } from './styles';
import trash from "../../../assets/trash.png"
import checkComplete from "../../../assets/check2.png";
import checkIncomplete from "../../../assets/cicleIncomplete.png"
interface IPropsTasks {
    id: string;
    title: string;
    description?: string;
    complete?: boolean;
    changeComplete?: (title: string) => void;
    removeTask?: (titleRemove: string, id: string) => void;
}

export function RenderTask({ title, description, complete, id, removeTask, changeComplete }: IPropsTasks) {

    function remove() {
        (removeTask && title && id) ? removeTask(title, id) : null;
    }

    function changeCompleteList() {
        (changeComplete && title) ? changeComplete(title) : null;
    }

    return (
        <>
            <View style={styles.container}>
                {complete === true ?
                    <>
                        <TouchableOpacity onPress={changeCompleteList}>
                            <Image source={checkComplete} />
                        </TouchableOpacity>

                        <View style={styles.viewTexts}>

                            <Text style={styles.titleTaskComplete}> {title} </Text>
                            <Text style={styles.descriptionTaskComplete}> {description} </Text>
                        </View>
                    </>
                    :

                    <>
                    <TouchableOpacity onPress={changeCompleteList}>
                        <Image source={checkIncomplete} />
                    </TouchableOpacity>

                    <View style={styles.viewTexts}>

                        <Text style={styles.titleTask}> {title} </Text>
                        <Text style={styles.descriptionTask}> {description} </Text>
                    </View>
                </>
                }
                
                <TouchableOpacity onPress={remove}>
                    <Image style={styles.iconTrash} source={trash} />
                </TouchableOpacity>

            </View>

        </>
    )
}