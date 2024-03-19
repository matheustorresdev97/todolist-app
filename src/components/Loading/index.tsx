import { ActivityIndicator, View } from 'react-native'
import { theme } from '../../theme'
import { styles } from './styles'

const Loading = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size={50} color={theme.colors.brand.blue} />
        </View>
    )
}

export default Loading