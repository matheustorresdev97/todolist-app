import { FlatList, Text, TextInput, View } from "react-native";
import { useRef, useState } from "react";
import { styles } from "./styles";

import { Header } from "../../components/Header";

import { TaskDTO } from "../../dtos/TaskDTO";

export function HomeScreen() {
  const [tasks, setTasks] = useState<TaskDTO[]>([]);
  const [newTask, setNewTask] = useState("");
  const newTaskInputRef = useRef<TextInput>(null);

  const handleTaskAdd = () => {
    console.log("Adicionou");
  };

  return (
    <View style={styles.container}>
      <Header
        task={newTask}
        inpuRef={newTaskInputRef}
        onChangeText={setNewTask}
        onPress={handleTaskAdd}
      />
      <View style={styles.tasksContainer}>
        <View style={styles.info}>
          <View style={styles.row}>
            <Text style={styles.tasksCreated}>Criadas</Text>
            <View style={styles.counterContainer}>
              <Text style={styles.counterText}>10</Text>
            </View>
          </View>
          <View style={styles.row}>
            <Text style={styles.tasksDone}>Concluídas</Text>
            <View style={styles.counterContainer}>
              <Text style={styles.counterText}>5</Text>
            </View>
          </View>
        </View>
        <FlatList
            data={tasks}
            keyExtractor={(tasks) => tasks.id}
            
        />
      </View>
    </View>
  );
}
