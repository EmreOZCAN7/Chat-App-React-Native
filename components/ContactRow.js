import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import { BorderlessButton } from 'react-native-gesture-handler';
import {colors} from '../config/constants'

const ContactRow = ({name, subtitle, onPress, style}) => {
    return (
        <TouchableOpacity style={[styles.row, style]} onPress={onPress}>
            <View style={styles.avatar}>
                <Text style={styles.avatarLabel}>
                    {name.split(' ').reduce((prev, current) => `${prev}${current[0]}`,'')}
                </Text>
            </View>

            <View style={styles.textsContainer}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
            </View>
            <Ionicons id="icon" name="chevron-forward-outline" size={25}/>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    avatar: {
        width: 42,
        height: 42,
        backgroundColor: colors.primary,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarLabel: {
        fontSize: 20,
        color: 'white',

    },
    textsContainer: {
        flex: 1,
        marginStart: 16,
    },
    name: {
        fontSize: 16,
        marginStart: 10,
    },
    subtitle: {
        marginTop: 4,
        marginStart: 10,
        marginBottom: 4,
        color: '#565656'
    },
})
export default ContactRow;