import React from 'react';
import {Ionicons} from '@expo/vector-icons';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import { colors } from '../config/constants';

const Cell = ({title, icon, tintColor, onPress, style}) => {
    return (
    <TouchableOpacity 
style={[styles.cell, style]}
onPress={onPress}>
    <View style={[styles.iconContainer, {backgroundColor: tintColor}]}>
    <Ionicons name={icon} 
        size={24}
        color={'white'}
        />
    </View>
    <Text
    style={styles.title}>{title}</Text>
    <Ionicons name="chevron-forward-outline" size={25}/>
</TouchableOpacity>
)}

const styles = StyleSheet.create({
    cell: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignContent: 'center',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: colors.seperator,
        borderTopWidth: StyleSheet.hairlineWidth,  
    },
    title: {
        fontSize: 16,
        marginStart: 12,
        flex: 1,
    },
    iconContainer: {
        width: 40,
        length: 90,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },
})


export default Cell;