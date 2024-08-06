import { Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TaskProps } from "../screens/home";
import { colors } from "../styles/color";

type TasksProps = TaskProps & {
  onTaskDone: (id: string) => void;
  onTaskDeleted: (id: string) => void;
};

export const Task = ({
  id,
  task_description,
  is_completed,
  onTaskDone,
  onTaskDeleted,
}: TasksProps) => {
  return (
    <View className="w-full h-16 bg-gray500 flex-row items-center justify-between my-1 px-3 py-5 rounded-lg border border-gray400">
      <TouchableOpacity onPress={() => onTaskDone(id)}>
        <MaterialCommunityIcons
          name={
            is_completed
              ? "checkbox-marked-circle-outline"
              : "checkbox-blank-circle-outline"
          }
          size={20}
          color={is_completed ? colors.purple : colors.blue}
        />
      </TouchableOpacity>
      <View className="w-4/5 h-10 items-center justify-center mx-2">
        <Text
          className={
            is_completed
              ? `text-sm text-gray300 line-through`
              : `text-sm text-gray-100`
          }
        >
          {task_description}
        </Text>
      </View>
      <TouchableOpacity onPress={() => onTaskDeleted(id)}>
        <MaterialCommunityIcons
          name="trash-can-outline"
          size={20}
          color={colors.gray300}
        />
      </TouchableOpacity>
    </View>
  );
};
