import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import Center from '../components/Center'
import Content from '../components/Content'
import EventBadge from '../components/events/EventBadge'
import { colors, container, title } from '../global.styles'
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'
import RoundedButton from '../components/RoundedButton'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuth } from 'firebase/auth'
import { Event } from '../models/Event'
import { getUserAppearEvents, getUserContractedEvents, getUserEvents } from '../services/EventService'
import ConditionalRender from '../components/ConditionalRender'
import Loading from '../components/Loading'
import { userIsPhotographer } from '../services/UserService'
import { Photographer } from '../models/Photographer'
import Fallback from '../components/Fallback'

interface Filter {
    name: string,
    ref: string
}

const Events = ({ navigation }: any) => {
    const filters: Filter[] = [
        {name: 'Fecha', ref: 'date'},
        {name: 'Titulo', ref: 'title'}
    ]

    const [user] = useAuthState(getAuth())
    const [fetching, setFetching] = useState(false)
    const [userEvents, setUserEvents] = useState<Event[]>([])
    const [appearedEvents, setAppearedEvents] = useState<Event[]>([])
    const [contractedEvents, setContractedEvents] = useState<Event[]>([])
    const [isPhotographer, setIsPhotographer] = useState<Photographer | boolean>(false)
    const [direction, setDirection] = useState('asc')
    const [filter, setFilter] = useState<Filter>(filters[0])

    useEffect(() => {
        const fetchData = async () => {
            setUserEvents(await getUserEvents(user!.uid)) 
            setIsPhotographer(await userIsPhotographer(user!.uid))
            setAppearedEvents(await getUserAppearEvents(user!.uid))
            setContractedEvents(await getUserContractedEvents(user!.uid))
        }
        setFetching(true)
        fetchData()
        .then(_ => {
            reFilter()
            setFetching(false)
        })
        .catch(e => setFetching(false))
    }, [])

    const reFilter = () => {
        if(direction == 'asc'){
            if(filter.ref == 'date'){
                setUserEvents(userEvents.sort((a, b) => a.date.getDate() - b.date.getDate()))
                setAppearedEvents(appearedEvents.sort((a, b) => a.date.getDate() - b.date.getDate()))
                setContractedEvents(contractedEvents.sort((a, b) => a.date.getDate() - b.date.getDate()))
            }else{
                setUserEvents(userEvents.sort((a, b) => a.title.localeCompare(b.title)))
                setAppearedEvents(appearedEvents.sort((a, b) => a.title.localeCompare(b.title)))
                setContractedEvents(contractedEvents.sort((a, b) => a.title.localeCompare(b.title)))
            }
        }else{
            if(filter.ref == 'date'){
                setUserEvents(userEvents.sort((a, b) => b.date.getDate() - a.date.getDate()))
                setAppearedEvents(appearedEvents.sort((a, b) => b.date.getDate() - a.date.getDate()))
                setContractedEvents(contractedEvents.sort((a, b) => b.date.getDate() - a.date.getDate()))
            }else{
                setUserEvents(userEvents.sort((a, b) => b.title.localeCompare(a.title)))
                setAppearedEvents(appearedEvents.sort((a, b) => b.title.localeCompare(a.title)))
                setContractedEvents(contractedEvents.sort((a, b) => b.title.localeCompare(a.title)))
            }
        }
    }

    const switchDirection = () => {
        if(direction === 'asc'){
            setDirection('desc')      
        }else{
            setDirection('asc')
        }
        reFilter()
    }

    const switchFilter = () => {
        const currentIndex = filters.findIndex(item => item.name == filter.name)
        if(currentIndex + 1 < filters.length){
            setFilter(filters[currentIndex + 1])
        }else{
            setFilter(filters[0])
        }
        reFilter()
    }

    

    return (
        <ConditionalRender condition={!fetching} fallback={<Loading />}>
            <Content styles={container} cart auth>
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
                            onPress={() => navigation.navigate('Testing')}
                            icon={<MaterialIcons name='add' size={30}/>}
                        />            
                    </View>

                    {/* events cards */}
                    <ScrollView contentContainerStyle={{paddingHorizontal: 10}}>
                        {/* user events */}
                        <Text style={title}>Mis Eventos</Text>
                        <ConditionalRender condition={userEvents.length > 0}
                            fallback={<Fallback message='Aún no tienes Eventos Creados'/>}
                        >
                            {
                                userEvents.map(event => 
                                    <EventBadge key={event.id} data={event} />
                                )
                            }
                        </ConditionalRender>
                        
                        {/* appeared events */}
                        <Text style={title}>Eventos en los que aparezco</Text>
                        <ConditionalRender condition={appearedEvents.length > 0}
                            fallback={<Fallback message='Aún no hay Eventos en los que aparezcas'/>}
                        >
                            {
                                userEvents.map(event => 
                                    <EventBadge key={event.id} data={event} />
                                )
                            }
                        </ConditionalRender>

                        {/* contracted events (only photographers) */}
                        <ConditionalRender condition={isPhotographer}>
                            <Text style={title}>Eventos contratados</Text>
                            <ConditionalRender condition={contractedEvents.length > 0}
                                fallback={<Fallback message='Aún no hay Eventos en los que estes contratado'/>}
                            >
                                {
                                    userEvents.map(event => 
                                        <EventBadge key={event.id} data={event} />
                                    )
                                }
                            </ConditionalRender>
                        </ConditionalRender>
                        
                    </ScrollView>
            </Content>
        </ConditionalRender>
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
