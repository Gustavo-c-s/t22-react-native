import axios from "axios";
import { useEffect, useState } from "react";
import { View, Text, Button, FlatList,  } from "react-native";

const URL = "https://673bc1f496b8dcd5f3f75c59.mockapi.io/tarefas";

export default function RequestScreen() {
  const [tarefa,setTarefa] = useState<any>([]);
 
  useEffect(()=>{
    const obterDados = async () => {
      try{
        
        const { data } = await axios.get(URL);
        console.log("DADOS: ", data);
        setTarefa(data)
      }catch(error){
        console.log("error no get.", error)
      }
    };
    obterDados();

  },[])

  useEffect(() => {
    obterDados();
  }, []);

  //   useEffect(() => {
  //     const obterDados = async () => {
  //       try {
  //         const { data } = await axios.get(URL);
  //         setListaTarefas(data);
  //         console.log("DADOS: ", data);
  //       } catch (err) {
  //         console.log("Erro ao carregar Tarefas. ", err);
  //       }
  //     };
  //     obterDados();
  //   }, []);

  return (
    <View>
      <Text>RequestScreen</Text>
      <FlatList
      data={tarefa}
      keyExtractor={item=>item.id}
      renderItem={({item})=>(
        <Text>{item.name}</Text>
      )}
      />

      {/* <Button title="Obter Dados" onPress={obterDados} /> */}
    </View>
  );
}
