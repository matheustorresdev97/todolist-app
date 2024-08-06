import { ActivityIndicator, View } from "react-native"

export const Loading = () => {
    return (
        <View className="flex-1 items-center justify-center bg-gray600">
            <ActivityIndicator size={50} color={"#4EA8DE"} />
        </View>
    )
}