import React, { View, TextInput, FlatList, Text, SafeAreaView, Image, Alert, Pressable } from "react-native";
import { styles } from "./style";
import { color } from "../../shared/global/styles";
import { Button } from "../button";
import { useEffect, useState } from "react";
import { RenderTask } from "../renderTasks";
import { ITasks } from "../../shared/global/interfaces";
import { EmptyComponent } from "../emptyComponent";
import { CounterTask } from "../counter";
import { METHOD, callService } from "../../service/api";
import { Toast } from "react-native-toast-message/lib/src/Toast";

export interface IPropsTasks {
    id?: string;
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

    const [tasks, setTasks] = useState<ITasks[]>([]);

    useEffect(() => {
        getTasks()
    }, [])

    async function getTasks() {
        setTasks([]);
        // como era antes
        // await api.get("").then(res => {
        //     setTasks([]);
        //     res.data.tarefas.map((item: any) => {
        //         setTasks(prevState =>[...prevState.concat({
        //             id: item.id,
        //             title: item.titulo,
        //             description: item.descricao,
        //             complete: item.complete
        //         })]);
        //     });
        // });
        
        const data = await callService({ method: METHOD.GET }).then((res)=> res.tarefas);
        data.map((item: ITasks) => {
            setTasks(prevState => [...prevState, {
                id: item.id,
                title: item.title,
                description: item.description,
                complete: item.complete
            }]);
        });
    }

    function handleAddList() {
        setTitleComplete(titleTask);
        setDescriptionComplete(descriptionTask);
    }

    async function handleAddTasks() {
        setDescriptionComplete(descriptionTask);
        
        callService({ method: METHOD.POST, body: {
            title: titleTask,
            description: descriptionTask
        }}).then((res)=> {
            setTasks(prevState => [...prevState, {
                id: res.tarefa.id,
                title: res.tarefa.title,
                description: res.tarefa.description,
                complete: false
           }]);
           showToast()
        //    Toast.show({
        //     type: "success",
        //     text1: "Cadastrado com sucesso!"
        //    })
        });
        cleanCache();
    }

    const showToast = () => {
        Toast.show({
          type: 'success',
          text1: 'Hello',
          text2: 'This is some something 👋'
        });
      }

    function changeTitleTask() {
        setTitleComplete(titleTask);
    }

  async function changeStateComplete(title: string) {
        let taskChange = tasks.find((item) => item.title === title);
        let taskIndex = tasks.findIndex((item) => item.title === title);

        if(!taskChange){
            return null
        }
        await callService({ method: METHOD.PUT, url: `status/${taskChange.id}`, body: {
            complete: taskChange.complete === true ? false : true  
        }}).then((res)=> {
            console.log("res: ",res);
            console.log("tasks",tasks[taskIndex]);
            Object.assign(tasks[taskIndex], {
                complete: res.tarefa_atualizada.complete
            });
            //setTasks(prevState => prevState.find(task => task.id === res.tarefa_atualizada.id))
        });
        getTasks(); 
    }

    async function remove(id: string){
       await callService({ method: METHOD.DELETE, url: id}).then(res =>{
        setTasks(prevState => prevState.filter((item) => item.id != res.tarefaDeletada.id));
        });
    }

  async function removeTask(titleRemove: string, id: string) {
        Alert.alert("Remover Tarefa", `Deseja remover "${titleRemove}" da lista de tarefas?`, [
            {
                text: "Sim",
                style: "destructive",
            onPress: () => {remove(id)}
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
                        keyExtractor={(item) => item.id}
                        renderItem={(item) => (
                            <RenderTask
                                key={item.item.id}
                                id={item.item.id}
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