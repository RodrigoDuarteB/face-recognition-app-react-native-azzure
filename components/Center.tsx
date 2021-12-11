import React from 'react'
import { View } from 'react-native'

const Center = ({ children, horizontal, vertical, styles }: any) => {

    return (
        <View style={
            horizontal && !vertical ? { alignItems: 'center', ...styles } : 
            !horizontal && vertical ? { flex: 1, justifyContent: 'center', ...styles } : { flex: 1, justifyContent: 'center', alignItems: 'center', ...styles }
        }>
            {children}
        </View>
    )
}

export default Center

