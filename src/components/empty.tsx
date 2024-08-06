import { Image, Text, View } from "react-native";
import clipboard from "../../assets/clipboard.png";

export const Empty = () => {
  return (
    <View className="flex-1 items-center w-full py-12 px-5 border border-t-gray400 border-b-600 b-s-gray600 b-e-600">
      <Image source={clipboard} className="mb-4" />
      <Text className="text-sm font-bold text-gray300">
        Você ainda não tem tarefas cadastradas
      </Text>
      <Text className="text-sm font-regular text-gray300">
        Crie tarefas e organize seus itens a fazer
      </Text>
    </View>
  );
};
