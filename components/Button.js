import React from "react";
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';

const Button = ({title, varient}) => {
    return (
        <TouchableOpacity style={[
    styles.buttonContainer,
    {backgroundColor: varient === 'primary' ? 'black': 'transparent', paddingHorizontal: varient === 'primary' ? 16 : 0, }]}>
        <Text style={[
            styles.buttonLabel,
            {color: varient === 'primary' ? 'white': 'black' } ]}>{title}</Text>
    </TouchableOpacity>
    )
}

const styles = StyleSheet.create ({
    buttonContainer: {
        
        paddingVertical: 12,
        borderRadius: 16,
    },
    buttonLabel: {
        fontSize: 18,
    },
})

export default Button;