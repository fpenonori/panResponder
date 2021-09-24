import React, {useRef} from 'react';
import { StyleSheet,
        View,
        Animated,
        PanResponder,
        Button
         } from 'react-native';

export default function PanResponderr(){
        const pan = useRef(new Animated.ValueXY()).current;
        const boxOpacity = useRef(new Animated.Value(1)).current;
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
                        onPanResponderRelease: (event, gesture) => {
                                if(gesture.moveY<200){
                                        pan.flattenOffset();
                                        Animated.timing(boxOpacity, {
                                                toValue: 0,
                                                duration: 1000,
                                                useNativeDriver: false

                                        }).start()
                                }
                                else{
                                        Animated.spring(pan, {
                                                toValue: {x:0, y:0},
                                                friction: 5,
                                                useNativeDriver: false
                                        }).start()
                                }
                        },
                        onPanResponderMove:
                                Animated.event([null, {dx: pan.x, dy: pan.y},], { useNativeDriver: false }),
                })
        ).current

        const init = () => {
                boxOpacity.setValue(1);
                pan.setValue({x:0, y:0})
        }

        return (
                <View style={styles.container}>
                        <View style={styles.dropZone}/>
                        <Animated.View style={{transform: [{translateX: pan.x}, {translateY: pan.y}], opacity: boxOpacity}} 
                        {...panResponder.panHandlers}>
                                <View style={styles.box}/>
                        </Animated.View>
                        <Button title='Reset' onPress={init}></Button>
                </View>
        )
}

const styles = StyleSheet.create({
        container: {
                flex: 1,
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: 'grey'
        },
        box: {
                width: 150,
                height: 150,
                borderRadius: 100,
                backgroundColor: 'blue',
        },
        dropZone: {
                backgroundColor: 'black',
                height: 200,
                width: '100%',
        }
})