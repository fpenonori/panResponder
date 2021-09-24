import React, {useRef} from 'react';
import { StyleSheet,
        View,
        Animated,
        PanResponder
         } from 'react-native';

export default function PanResponderr(){
        const pan = useRef(new Animated.ValueXY()).current;

        const panResponder = useRef(
                PanResponder.create({
                        onMoveShouldSetPanResponder: () => true,
                        onPanResponderGrant: () => {
                                console.log("Grant " + pan.x._value);
                                pan.setOffset({
                                        x: pan.x._value,
                                        y: pan.y._value,
                                });
                        },
                        onPanResponderRelease: () => {
                                pan.flattenOffset();
                        },
                        onPanResponderMove:
                                Animated.event([null, {dx: pan.x, dy: pan.y},], { useNativeDriver: false }),
                })
        ).current

        return (
                <View style={styles.container}>
                        <Animated.View style={{transform: [{translateX: pan.x}, {translateY: pan.y}]}} 
                        {...panResponder.panHandlers}>
                                <View style={styles.box}/>
                        </Animated.View>
                </View>
        )
}

const styles = StyleSheet.create({
        container: {
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'grey'
        },
        box: {
                width: 150,
                height: 150,
                backgroundColor: 'blue',
        },
})