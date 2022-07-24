import React from 'react';
import {View, StyleSheet} from 'react-native';
import { colors } from '../config/constants';

const Seperator = () => {
    return (
        <View style={styles.seperator}/>
    )
}

const styles = StyleSheet.create({
    seperator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: colors.seperator,
        marginStart: 88,
        marginEnd: 45,
    },
})

export default Seperator;