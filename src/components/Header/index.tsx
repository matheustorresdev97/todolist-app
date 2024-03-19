import { Image, TextInput, TouchableOpacity, View } from "react-native"
import { styles } from "./styles"
import logoImage from "../../assets/logo.png"
import { theme } from "../../theme"
import { MaterialCommunityIcons } from "@expo/vector-icons"

type HeaderProps = {
  task: string,
  inpuRef: React.RefObject<TextInput>,
  onChangeText: (task: string) => void
  onPress: () => void
}

export const Header = ({ task, inpuRef, onChangeText, onPress }: HeaderProps) => {
  return (
    <View style={styles.headerContainer}>
      <Image source={logoImage} />
      <View style={styles.form}>
        <TextInput
          style={[styles.input, inpuRef.current?.isFocused() && task
            ? styles.inputBorder : null]}
          placeholder="Adicione uma nova Tarefa"
          placeholderTextColor={theme.colors.base.gray300}
          value={task}
          onChangeText={onChangeText}
          ref={inpuRef}
          autoCorrect={false}
          onSubmitEditing={onPress}
          returnKeyType="done"
        />
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <MaterialCommunityIcons name="plus-circle-outline" size={24} color={theme.colors.base.gray100} />
        </TouchableOpacity>
      </View>
    </View>
  )
}