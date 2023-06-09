import React, { View, TextInput, FlatList, Text, SafeAreaView, Image, Alert, Pressable } from "react-native";
import { styles } from "./style";
import { color } from "../../shared/global/styles";
import { Button } from "../button";
import { useEffect, useState } from "react";
import { RenderTask } from "../renderTasks";
import { ITasks } from "../../shared/global/interfaces";
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { EmptyComponent } from "../emptyComponent";
import { CounterTask } from "../counter";
import { api } from "../../service/api";

export interface IPropsTasks {
    title?: string;
    description?: string;
    complete?: boolean;
    changeComplete?: (title: string) => void;
    removeTask?: (titleRemove: string) => void;
}

export function Forms(props: any) {
    const [titleTask, setTitleTask] = useState<string>('');
    const [descriptionTask, setDescriptionTask] = useState<string>('');

    const [titleComplete, setTitleComplete] = useState<string>('');
    const [descriptionComplete, setDescriptionComplete] = useState<string>('');

    const [tasks, setTasks] = useState<ITasks[]>([
        { title: "licao de casa", description: "fazer atividade de  matematica", complete: false },
        { title: "limpar casa", description: "lavar banheiro", complete: false },
        { title: "assistir video aula", description: "assistir e fazer resumo da video aula do dia 12/05", complete: true },
    ]);


    useEffect(()=> {
       getTasks();
    },[]);

    async function getTasks(){
        await api.get("").then(res => {
            res.data.tarefas.map((item: any)=> {
                console.log(item.titulo);
                setTasks(prevState => [...prevState, {
                    title: item.titulo,
                    description: item.descricao,
                    complete: item.complete
                }]);
            });
        });
    }

    function handleAddList() {
        setTitleComplete(titleTask);
        setDescriptionComplete(descriptionTask);
    }

    async function handleAddTasks() {
        setDescriptionComplete(descriptionTask);
        setTasks(precState => [...precState,{ title: titleTask, description: descriptionTask, complete: false }]);
        await api.post("", {
            titulo: titleTask,
            descricao: descriptionTask
        });
        cleanCache();
    }

    function changeTitleTask() {
        setTitleComplete(titleTask);
    }
    
    function changeStateComplete(title: string) {
        let taskChange = tasks.find((item) => item.title === title);
        let taskChangeIndex = tasks.findIndex((item) => item.title === title);

        if (tasks[taskChangeIndex].complete === false) {
            Object.assign(tasks[taskChangeIndex], {
                title: taskChange?.title,
                description: taskChange?.description,
                complete: true
            });
            setTasks(prevState => [...prevState]);
        } else {
            Object.assign(tasks[taskChangeIndex], {
                title: taskChange?.title,
                description: taskChange?.description,
                complete: false
            });
            setTasks(prevState => [...prevState]);
        }
    }

    function removeTask(titleRemove: string) {
        Alert.alert("Remover Tarefa", `Deseja remover "${titleRemove}" da lista de tarefas?`, [
            {
                text: "Sim",
                style: "destructive",
                onPress: () => setTasks(prevState => prevState.filter((item) => item.title != titleRemove))
            },
            {
                text: "Não",
                style: "cancel"
            }
        ])

    }

    function cleanCache() {
        setTitleTask('');
        setDescriptionTask('');
        setTitleComplete('');
        setDescriptionComplete('');
    }

    return (
        <>
            <View style={{ flexDirection: "column" }}>
                <View style={styles.containerInput}>
                    {!titleComplete ?
                        <>
                            <TextInput
                                style={styles.inputText}
                                placeholder="Digite uma nova tarefa"
                                placeholderTextColor={color.base["gray-300"]}
                                onChangeText={setTitleTask}
                                value={titleTask}
                            />
                            <Button backgroundColor={color.product.blue} handle={changeTitleTask} />
                        </>
                        : !descriptionComplete ?
                            <>
                                <TextInput
                                    style={styles.inputText}
                                    placeholder="Digite uma descrição"
                                    placeholderTextColor={color.base["gray-300"]}
                                    onChangeText={setDescriptionTask}
                                    value={descriptionTask}
                                />
                                <Button backgroundColor={color.product.blue} handle={handleAddTasks} />
                            </>
                            :
                            <>
                                <TextInput
                                    style={styles.inputText}
                                    placeholder="Digite uma nova tarefa"
                                    placeholderTextColor={color.base["gray-300"]}
                                    onChangeText={setTitleTask}
                                    value={titleTask}
                                />
                                <Button backgroundColor={color.product.blue} handle={handleAddList} />
                            </>

                    }

                </View>




                <View style={{ marginTop: 60 }}>
                    <View>
                        <CounterTask quantityTasks={tasks.length} quantityComplete={tasks.reduce((counter, item) => {
                            if (item.complete === true) counter += 1
                            return counter;
                        }, 0)} />
                    </View>
                    <FlatList
                        data={tasks}
                        keyExtractor={(item) => item.title}
                        renderItem={(item) => (
                            <RenderTask
                                key={item.item.title}
                                title={item.item.title}
                                description={item.item.description}
                                complete={item.item.complete}
                                removeTask={removeTask}
                                changeComplete={changeStateComplete}
                            />
                        )}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={() => (
                            <EmptyComponent />
                        )}
                    />


                </View>



            </View>

        </>
    )
}