import React from "react";
import { StyleSheet, Dimensions, ScrollView, CheckBox, TextInput, AsyncStorage, Picker } from "react-native";
import { Block, theme, Text } from "galio-framework";
var FloatingLabel = require('react-native-floating-labels');
import { nowTheme } from '../constants';
import { Button } from "../components";
import Spinner from 'react-native-loading-spinner-overlay';
import * as Device from 'expo-device';

class viewW2 extends React.Component {

    constructor(props) {
        super(props);
        //Initial State
        this.state = {
            totalincome: "",
            totaltaxespaid: "",
            
        };
    }

    componentDidMount() {
        this.getData();
    }

    async getData() {

        this.setState({
            spinner: true
        });

        let ip = await AsyncStorage.getItem('ip');
        let id = await AsyncStorage.getItem('id');
        this.setState({
            FormID: id
        })
        AsyncStorage.removeItem('id')

        await fetch('http://' + ip + '/formview?ID=' + this.state.FormID + '')
            .then(res => res.json())

            .then(res => {
                this.setState({
                    totalincome: res[0].totalincome,
                    totaltaxespaid: res[0].totaltaxespaid,
                    spinner: false
                })

            })
            .catch((error) => {
                this.setState({
                    spinner: false
                });
                console.warn(error)
            });

            console.warn(Device.osBuildId)

    }

    renderHeading = () => {
        return (
            <Block flex style={styles.group}>
                <Block style={{ alignItems: 'center', justifyContent: 'center', paddingHorizontal: theme.SIZES.BASE }}>
                    <Text
                        h4
                        style={{

                            alignItems: 'center',
                            fontFamily: 'montserrat-regular',
                            //   marginBottom: theme.SIZES.BASE / 2
                        }}
                        color={nowTheme.COLORS.HEADER}
                    >
                        FORM W-2
                    </Text>
                    <Text
                        h5
                        style={{
                            fontFamily: 'montserrat-regular',
                            marginBottom: theme.SIZES.BASE / 2
                        }}
                        color={nowTheme.COLORS.HEADER}
                    >
                        Full Time Income Form
                    </Text>

                </Block>
            </Block>
        );
    };

    totalincome = () => {
        return (
            <Block flex style={styles.group}>
                <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>

                    <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                        <Block style={{ flexDirection: 'column' }}>
                            <Text
                                p
                                style={{
                                    fontFamily: 'montserrat-regular',
                                    marginBottom: theme.SIZES.BASE / 2,
                                    marginTop: '2.5%'
                                }}
                                color={nowTheme.COLORS.HEADER}
                            >
                                Total Income: {this.state.totalincome}
                            </Text>

                        </Block>
                    </Block>
                </Block>
            </Block>
        );
    };


    totaltaxespaid = () => {
        return (
            <Block flex style={styles.group}>
                <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>

                    <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                        <Block style={{ flexDirection: 'column' }}>
                            <Text
                                p
                                style={{
                                    fontFamily: 'montserrat-regular',
                                    marginBottom: theme.SIZES.BASE / 2,
                                    marginTop: '2.5%'
                                }}
                                color={nowTheme.COLORS.HEADER}
                            >
                                Total Taxes Paid:  {this.state.totaltaxespaid}
                  </Text>
                       
                        </Block>
                    </Block>
                </Block>
            </Block>
        );
    };

    render() {
        return (
            <Block style={{ flex: 1 }}>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                >

                    <Block style={{ flex: 0.9 }}>
                        <Spinner
                            visible={this.state.spinner}
                            textContent="Gathering Form.."
                            textStyle={styles.spinnerTextStyle}
                        />
                        {this.renderHeading()}
                        {this.totalincome()}
                        {this.totaltaxespaid()}
                        
                    </Block>

                   

                </ScrollView>

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

export default viewW2;