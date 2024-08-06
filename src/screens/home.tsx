import { Alert, FlatList, Text, TextInput, View } from "react-native";
import { Header } from "../components/header";
import { useRef, useState } from "react";
import { Empty } from "../components/empty";
import { Task } from "../components/task";

export type TaskProps = {
  id: string;
  title: string;
  isCompleted: boolean;
};

export function Home() {
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [newTask, setNewTask] = useState("");
  const newTaskInputRef = useRef<TextInput>(null);

  const handleTaskAdd = () => {
    if (newTask !== "" && newTask.length >= 5) {
      setTasks((tasks) => [
        ...tasks,
        { id: "", isCompleted: false, title: newTask.trim() },
      ]);

      setNewTask('')
      newTaskInputRef.current?.blur()
    } else {
      Alert.alert(
        "Tarefa não cadastrada",
        "A tarefa deve ter mais de 5 caracteres"
      );
    }
  };

  const handleTaskDone = (id: string) => {
    setTasks((task) =>
      task.map((task) => {
        task.id === id ? (task.isCompleted = !task.isCompleted) : null;
        return task;
      })
    );
  };

  const handleTaskDeleted = (id: string) => {
    Alert.alert('Excluir tarefa', 'Deseja excluir tarefa?', [
      {
        text: 'Sim',
        style: 'default',
        onPress: () =>
          setTasks((tasks) => tasks.filter((task) => task.id !== id))
      },
      {
        text: 'Não',
        style: 'cancel'
      }
    ])
  };

  const totalTasksCreated = tasks.length
  const totalTasksCompleted = tasks.filter(({ isCompleted }) => isCompleted).length

  return (
    <View className="flex-1 bg-gray600">
      <Header
        task={newTask}
        inpuRef={newTaskInputRef}
        onChangeText={setNewTask}
        onPress={handleTaskAdd}
      />
      <View className="flex-1 mt-14 mx-6">
        <View className="flex-row items-center justify-between mb-5">
          <View className="flex-row items-center">
            <Text className="text-blue text-sm font-bold">Criadas</Text>
            <View className="bg-gray400 w-[25px] h-[19px] rounded-full items-center justify-center ml-2">
              <Text className="bg-gray200 text-sm font-bold">0</Text>
            </View>
          </View>
          <View className="flex-row items-center">
            <Text className="text-purple text-sm font-bold">Concluídas</Text>
            <View className="bg-gray400 w-[25px] h-[19px] rounded-full items-center justify-center ml-2">
              <Text className="bg-gray200 text-sm font-bold">1</Text>
            </View>
          </View>
        </View>
        <FlatList
          data={tasks}
          keyExtractor={(tasks) => tasks.id}
          renderItem={({ item }) => (
            <Task
              key={item.id}
              onTaskDone={() => handleTaskDone(item.id)}
              onTaskDeleted={() => handleTaskDeleted(item.id)}
              {...item}
            />
          )}
          ListEmptyComponent={<Empty />}
        />
      </View>
    </View>
  );
}
