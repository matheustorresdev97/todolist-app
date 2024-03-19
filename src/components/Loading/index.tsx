import { ActivityIndicator, View } from 'react-native'
import { theme } from '../../theme'
import { styles } from './styles'

export const Loading = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size={50} color={theme.colors.brand.blue} />
        </View>
    )
}

