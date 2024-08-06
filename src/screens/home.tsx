import { Alert, FlatList, Text, TextInput, View } from "react-native";
import { Header } from "../components/header";
import { useEffect, useRef, useState } from "react";
import { Empty } from "../components/empty";
import { Task } from "../components/task";
import { api } from "../lib/axios";

export type TaskProps = {
  id: string;
  task_description: string;
  created_at?: Date;
  update_at?: Date;
  is_completed: boolean;
};

export function Home() {
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [newTask, setNewTask] = useState("");
  const newTaskInputRef = useRef<TextInput>(null);


  const handleTaskAdd = async () => {
    if (newTask !== "" && newTask.length >= 5) {
      try {
        const { data } = await api.post("/task", {
          task_description: newTask,
          is_completed: false,
        });

        setTasks((state) => [...state, data]);

        setNewTask('')
        newTaskInputRef.current?.blur()

      } catch (error) {
        console.log(error)
      }

    } else {
      Alert.alert(
        "Tarefa não cadastrada",
        "A tarefa deve ter mais de 5 caracteres"
      );
    }
  };

  const handleTaskDone = async (id: string) => {
    await api.patch(`/task/${id}`, { is_completed: true });

    setTasks((tasks) =>
      tasks.map((task) =>
        task.id === id ? { ...task, is_completed: !task.is_completed } : task
      )
    );
  }

  const handleTaskDeleted = (id: string) => {
    const deleteTask = async () => {
      setTasks((tasks) => tasks.filter((task) => task.id !== id));
      await api.delete(`/task/${id}`);
    };

    Alert.alert('Excluir tarefa', 'Deseja excluir tarefa?', [
      {
        text: 'Sim',
        style: 'default',
        onPress: deleteTask
      },
      {
        text: 'Não',
        style: 'cancel'
      }
    ]);
  };

  const totalTasksCreated = tasks.length
  const totalTasksCompleted = tasks.filter(({ is_completed }) => is_completed).length

  async function getTasks() {
    try {
      const { data } = await api.get("/tasks");
      setTasks(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getTasks();
  }, []);

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
              <Text className="text-gray200 text-sm font-bold">{totalTasksCreated}</Text>
            </View>
          </View>
          <View className="flex-row items-center">
            <Text className="text-purple text-sm font-bold">Concluídas</Text>
            <View className="bg-gray400 w-[25px] h-[19px] rounded-full items-center justify-center ml-2">
              <Text className="text-gray200 text-sm font-bold">{totalTasksCompleted}</Text>
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
