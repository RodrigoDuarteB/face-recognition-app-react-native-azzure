import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import Center from '../components/Center'
import Content from '../components/Content'
import EventBadge from '../components/events/EventBadge'
import FutureRender from '../components/FutureRender'
import Loading from '../components/Loading'
import { colors, container } from '../global.styles'
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'
import PopUpMessage from '../components/PopUpMessage'
import RoundedButton from '../components/RoundedButton'

const Events = ({ navigation }: any) => {
    const [data, setData] = useState<any>()
    const [direction, setDirection] = useState('asc')
    const [filter, setFilter] = useState({name: 'Fecha', ref: 'date'})

    useEffect(() => {
    }, [data])

    const switchDirection = () => {
        if(direction === 'asc'){
            setDirection('desc')
        }else{
            setDirection('asc')
        }
    }

    const switchFilter = () => {
        setFilter({name: 'Fecha', ref: 'date'})
    }

    const event = {
        title: 'Egreso 2020',
        date: '15/12/2021',
        photos: 53,
        appears: 6,
        description: 'Fiesta de Egresados 2020'
    }

    return (
        <Content styles={container} cart auth>
            {/* <FutureRender
                loading={<Loading />}
                promise={fetch('https://jsonplaceholder.typicode.com/posts')}
                receive={(data: any) => setData(data)}
            >
                <ScrollView
                    bounces={false}
                >
                    {
                        data && data.map((e: any) => <Text key={e.id} style={{color: 'white'}}> - {e.title}</Text>)
                    }
                </ScrollView>
            </FutureRender> */}
            <Text style={styles.title}>Eventos en los que apareces</Text>

            {/* options */}
            <View style={styles.optionsContainer}>
                {/* filters */}
                <View>
                    <Text style={[styles.title, {fontSize: 15}]}>Filtos</Text>
                    <View style={styles.optionsContainer}>
                        <TouchableOpacity style={[styles.filterOptionContainer, {alignItems: 'center'}]}
                            onPress={switchFilter}
                        >
                            <Text style={[styles.title, {fontSize: 13, color: 'black'}]}>
                                {filter.name}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.filterOptionContainer, {marginLeft: 10}]}
                            onPress={switchDirection}
                        >
                            <Center>
                            {
                                direction === 'asc' ? 
                                <FontAwesome name="sort-asc" size={20}/> :
                                <FontAwesome name="sort-desc" size={20}/> 
                            }
                            </Center>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* add button */}
                <RoundedButton 
                    onPress={() => navigation.navigate('CreateEvent')}
                    icon={<MaterialIcons name='add' size={30}/>}
                />            
            </View>

            {/* events cards */}
            <ScrollView>
                <EventBadge data={event} />
            </ScrollView>
        </Content>
    )
}

export default Events

const styles = StyleSheet.create({
    optionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    eventCard: {
        backgroundColor: colors.secondaryLight,
        height: 100,
        borderRadius: 20
    },
    title: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold', 
        marginBottom: 10
    },
    filterOptionContainer: {
        width: 60,
        backgroundColor: colors.secondaryLight,
        borderRadius: 15
    }
})
