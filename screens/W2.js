import React from "react";
import { StyleSheet, Dimensions, ScrollView, CheckBox, TextInput, AsyncStorage, Picker } from "react-native";
import { Block, theme, Text } from "galio-framework";
var FloatingLabel = require('react-native-floating-labels');
import { nowTheme } from '../constants';
import { Button } from "../components";
import Spinner from 'react-native-loading-spinner-overlay';
import * as Device from 'expo-device';
import Totalincome from './totalincome'

class FYP1_FinalEvaluation extends React.Component {
    state = {
        ischecked: false,
    };

    constructor(props) {
        super(props);
        //Initial State
        this.state = {
            totaltaxespaid: ""
        };
    }

    componentDidMount() {
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
                                Total Taxes Paid: *
                  </Text>
                            <Block style={{ flexDirection: 'column' }}>
                                <FloatingLabel
                                    inputStyle={styles.input1}
                                    style={styles.formInput}
                                    keyboardType='number-pad'
                                    onChangeText={(totaltaxespaid) => this.setState({ totaltaxespaid })}
                                    placeholder="Total Taxes Paid"
                                >
                                </FloatingLabel>
                            </Block>


                        </Block>
                    </Block>
                </Block>
            </Block>
        );
    };

    renderbutton = () => {
        return (
            <Block style={{ flex: 0.33, flexDirection: 'column', marginTop: theme.SIZES.BASE, justifyContent: 'center', alignItems: 'center' }}>
                <Block>
                    <Button
                        shadowless
                        style={styles.button}
                        color={nowTheme.COLORS.PRIMARY}
                        disabled={this.state.ButtonSubmit}
                        onPress={this.Submit.bind(this)}

                    >
                        <Text
                            style={{ fontFamily: 'montserrat-bold', fontSize: 14 }}
                            color={theme.COLORS.WHITE}
                        >
                            Submit
                    </Text>
                    </Button>
                </Block>

            </Block>
        );
    };

    async Submit() {
        let ip = await AsyncStorage.getItem('ip');
        
        this.setState({ Totalincome: await AsyncStorage.getItem('TotalIncome') })
        AsyncStorage.removeItem('TotalIncome')

        if (this.state.Totalincome === "" || this.state.totaltaxespaid === "" ) {
            alert("All fields marked * are required!")

        }
        else {
            this.setState({
                spinner:true
            })
            await fetch('http://' + ip + '/addform?totalincome=' + this.state.Totalincome + '&totalbusinessexpense=0&totalmilesdriven=0&totaltaxespaid=' + this.state.totaltaxespaid + '&FormID=2&PhoneID=' + Device.osBuildId + ' ')
                .then(res => res.json())

                .then(res => {
                    if(res==1)
                    {
                        this.setState({
                            spinner:false
                        })
                        alert("Form W2 added!")
                        this.props.navigation.navigate("Onboarding")
                    }
                    else
                    {
                        this.setState({
                            spinner:false
                        })
                        alert("There was a problem with your submission!")
                    }
                })
                .catch(async api3looperror => {
                    // console.warn(error);
                });
        }

    }


    render() {
        return (
            <Block style={{ flex: 1 }}>
                <Spinner
                    visible={this.state.spinner}
                    textContent={this.state.spinnertext}
                    textStyle={styles.spinnerTextStyle}
                />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >

                    <Block style={{ flex: 0.9 }}>
                        {this.renderHeading()}
                        <Totalincome />
                        {this.totaltaxespaid()}
                    </Block>

                    <Block style={{ flex: 0.1, marginTop: 50 }}>
                        {this.renderbutton()}
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

export default FYP1_FinalEvaluation;