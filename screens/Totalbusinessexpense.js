import React from "react";
import { StyleSheet, Dimensions, ScrollView, CheckBox, TextInput, AsyncStorage, Picker } from "react-native";
import { Block, theme, Text } from "galio-framework";
var FloatingLabel = require('react-native-floating-labels');
import { nowTheme } from '../constants';
// import { Button } from "../components";
import Spinner from 'react-native-loading-spinner-overlay';

class Totalbudgetexpense extends React.Component {

    constructor(props) {
        super(props);
        //Initial State
        this.state = {
            Totalbusinessexpense:""
        };
    }

    

    render() {
        return (
            <Block style={{ opacity: this.state.opacityNumber }}>


                <Block flex style={styles.group}>
                    <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>

                        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                            <Block style={{ flexDirection: 'column' }}>
                                <Text
                                    p
                                    style={{
                                        fontFamily: 'montserrat-regular',
                                        // marginBottom: theme.SIZES.BASE / 2,
                                        marginTop: '2.5%'
                                    }}
                                    color={nowTheme.COLORS.HEADER}
                                >
                                    Total Buisness Expense: *
                                </Text>

                                <Block style={{ flexDirection: 'column' }}>
                                    <FloatingLabel
                                        inputStyle={styles.input1}
                                        style={styles.formInput}
                                        keyboardType='number-pad'
                                        // onChangeText={(Totalincome) => this.setState({ Totalincome })}
                                        onChangeText={(Totalbusinessexpense) => AsyncStorage.setItem('Totalbusinessexpense',Totalbusinessexpense)}
                                        placeholder="Total business expense"
                                    >
                                    </FloatingLabel>
                                </Block>
                            </Block>
                        </Block>
                    </Block>
                </Block>
            </Block>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "orange",
        color: "white"
    },
    group: {
        paddingTop: theme.SIZES.BASE * 2
    },
    input: {
        paddingTop: 10,
        paddingRight: 15,
        fontSize: 15,
        color: 'black',
        fontWeight: '500',

    },
    container: {
        fontSize: 16,
        backgroundColor: 'white',
    },

    formInput: {
        borderBottomWidth: 1.5,
    },
    input1: {
        borderWidth: 0,
        fontSize: 16
    }
})

export default Totalbudgetexpense;