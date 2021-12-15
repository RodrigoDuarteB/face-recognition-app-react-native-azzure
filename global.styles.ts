import { StatusBar, TextStyle, ViewStyle } from "react-native"

export const colors = {
    primary: '#ff7043',
    primaryLight: '#ffa270',
    primaryDark: '#c63f17',
    secondary: '#616161',
    secondaryLight: '#8e8e8e',
    secondaryDark: '#373737'
}

export const safeTop: ViewStyle = {
    marginTop: StatusBar.currentHeight
}

export const container: ViewStyle = {
    paddingHorizontal: 25,
    paddingVertical: 15
}

export const label: TextStyle = {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
}

export const input: ViewStyle | TextStyle = {
    backgroundColor: colors.secondaryLight,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 5,
    fontSize: 15,
    fontWeight: '700'
}

export const title: TextStyle = {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold'
}