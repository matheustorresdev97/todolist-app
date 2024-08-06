import { RefObject } from "react"
import { Image, TextInput, TouchableOpacity, View } from "react-native"
import  logoImage  from "../assets/logo.png"
import { colors } from "../styles/color"
import { MaterialCommunityIcons } from "@expo/vector-icons"


type HeaderProps = {
  task: string,
  inpuRef: RefObject<TextInput>,
  onChangeText: (task: string) => void
  onPress: () => void
}

export const Header = ({ task, inpuRef, onChangeText, onPress }: HeaderProps) => {
  return (
    <View className="bg-gray700 items-center justify-center w-full h-[173] relative">
      <Image source={logoImage} />
      <View className="absolute bottom-[-27] h-14 w-full flex-row items-center justify-center">
        <TextInput
        className={`h-14 w-3/4 bg-gray500 rounded p-4 text-gray100 mr-1 text-sm border border-gray700 ${inpuRef.current?.isFocused() && task ? `border-purple` : null}`}
          placeholder="Adicione uma nova Tarefa"
          placeholderTextColor={colors.gray300}
          value={task}
          onChangeText={onChangeText}
          ref={inpuRef}
          autoCorrect={false}
          onSubmitEditing={onPress}
          returnKeyType="done"
        />
        <TouchableOpacity className="h-14 w-14 rounded bg-blue_dark items-center justify-center" onPress={onPress}>
          <MaterialCommunityIcons name="plus-circle-outline" size={24} color={colors.gray100} />
        </TouchableOpacity>
      </View>
    </View>
  )
}