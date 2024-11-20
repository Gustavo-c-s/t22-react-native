import {
  FlatList,
  Text,
  TextInput,
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import { tarefa } from "../../types/types";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import axios from "axios";

export const HomeScreen = () => {
  const [tarefa, setTarefa] = useState("");
  const [listaTarefas, setListaTarefas] = useState<any[]>([]);
  const URL = "https://673bc1f496b8dcd5f3f75c59.mockapi.io/tarefas";
  const getTarefas= async()=>{
    try{
      const{data} =await axios.get(URL);
      setListaTarefas(data)
    }catch(erro){
      console.log(erro,'get')
    }
  }
  useEffect(()=>{
    getTarefas();
  },[])
  const deleteTarefa= async(id:number)=>{
    try{
      const{data} = await axios.delete(URL+'/'+id)
      console.log("deleta tafera. id:",id);
      const listaDeleta = listaTarefas.filter((item)=>item.id !== data.id)
      setListaTarefas(listaDeleta)
    }catch(erro){
      console.log('erro delete',erro)
    }
  }
  const adicionarTarefa = () => {
    if (tarefa == "") return;

    const novaTarefa = {
      name: tarefa,
    };

    try {
      const novaTarefaAPi = await createTarefa(novaTarefa);
      console.log("POST: ", novaTarefaAPi);
      setListaTarefas([...listaTarefas, novaTarefaAPi]);
      setTarefa("");
    } catch (err) {
      console.log("Erro ao carregar Tarefas. ", err);
    }
  };

  const deletarTarefa = async (id: number) => {
    try {
      const tarefaDeletadaApi = await deleteTarefa(id);
      console.log("Tarefa Deletada: ", tarefaDeletadaApi);
      const listaFiltrada = listaTarefas.filter(
        (item) => item.id !== tarefaDeletadaApi.id
      );
      setListaTarefas(listaFiltrada);
    } catch (err) {
      console.log("Erro ao deletar tarefa.", err);
    }
  };

  const editarTarefa = (itemTarefa: tarefa) => {
    setEstaEditando({
      item: itemTarefa,
      editando: true,
    });
    console.log("EDITAR TAREFA ", itemTarefa.id);
    setTarefa(itemTarefa.titulo);
  };

  const cancelar = () => {
    setEstaEditando({
      item: undefined,
      editando: false,
    });
    setTarefa("");
  };

  const deletarTarefa = (id: number) => {
    console.log("Deletar Tarefa. Id: ", id);
    const listaFiltrada = listaTarefas.filter(
      (item) =>item.id !== id
    );
    setListaTarefas(listaFiltrada);
  };

  useEffect(() => {
    buscarTarefas();
  }, []);

  return (
    <View style={styles.container}>
      {/* A entrada de tarefas */}
      <View style={styles.containerInput}>
        <TextInput
          style={styles.input}
          value={tarefa}
          onChangeText={setTarefa}
        />
        {estaEditando.editando ? (
          <View style={{ gap: 5 }}>
            <Button title="cancelar" onPress={cancelar} />
            <Button title="SALVAR" onPress={salvar} />
          </View>
        ) : (
          <Button title="Adicionar Tarefa" onPress={adicionarTarefa} />
        )}
      </View>
      {/* Exibição das tarefas */}
      <FlatList
        style={styles.lista}
        data={listaTarefas}
        renderItem={({ item, index }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText} numberOfLines={1}>
              {item.name}
            </Text>
            <View style={styles.iconContainer}>
              <TouchableOpacity>
                <FontAwesome name="pencil" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deletarTarefa(item.id)}>
                <FontAwesome name="trash-o" size={24} color="white" />
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    // alignItems: "center",
    // backgroundColor: "gray",
  },
  containerInput: {
    // alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
    // width: "85%",
    // alignSelf: "center",
    marginBottom: 6,
  },
  lista: {
    marginTop: 8,
  },
  itemContainer: {
    flexDirection: "row",
    backgroundColor: "steelblue",
    justifyContent: "space-between",
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
  },
  itemText: {
    fontWeight: 500,
    fontSize: 18,
    color: "#fff",
  },
  iconContainer: {
    flexDirection: "row",
    gap: 10,
  },
});
