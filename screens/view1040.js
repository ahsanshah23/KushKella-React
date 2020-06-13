import React from "react";
import { StyleSheet, Dimensions, ScrollView, CheckBox, TextInput, AsyncStorage, Picker } from "react-native";
import { Block, theme, Text } from "galio-framework";
var FloatingLabel = require('react-native-floating-labels');
import { nowTheme } from '../constants';
import { Button } from "../components";
import Spinner from 'react-native-loading-spinner-overlay';
import * as Device from 'expo-device';

class view1040 extends React.Component {

    constructor(props) {
        super(props);
        //Initial State
        this.state = {
            totaltaxableincome: "",
            TotalTaxesPaid: "",
            TotalTaxLiability: "",
            TaxDifference: "",
            FormID:0
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

        await fetch('http://' + ip + '/1040view?ID=' + this.state.FormID + '')
            .then(res => res.json())

            .then(res => {
                this.setState({
                    totaltaxableincome: res[0].TotalTaxableIncome,
                    TotalTaxesPaid: res[0].TotalTaxesPaid,
                    TotalTaxLiability: res[0].TotalTaxLiability,
                    TaxDifference: res[0].TaxDifference,
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

        await fetch('http://192.168.0.90:3006/formcount?PhoneID=' + Device.osBuildId + '&FormID=1&ID1040=' + this.state.FormID + ' ')
            .then(res => res.json())

            .then(res => {
                this.setState({
                    count1099: res[0].count,
                    spinner: false
                })
            })
            .catch(async api3looperror => {
                this.setState({
                    spinner: false
                });
                console.warn(error)
            });

            await fetch('http://192.168.0.90:3006/formcount?PhoneID=' + Device.osBuildId + '&FormID=2&ID1040=' + this.state.FormID + ' ')
            .then(res => res.json())

            .then(res => {
                this.setState({
                    countW2: res[0].count,
                    spinner: false
                })
            })
            .catch(async api3looperror => {
                this.setState({
                    spinner: false
                });
                console.warn(error)
            });




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
                        FORM 1040
              </Text>

                    <Text
                        h5
                        style={{
                            fontFamily: 'montserrat-regular',
                            marginBottom: theme.SIZES.BASE / 2
                        }}
                        color={nowTheme.COLORS.HEADER}
                    >
                        Final Tax Return Form
                    </Text>

                </Block>
            </Block>
        );
    };

    totaltaxableincome = () => {
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
                                Total Taxable Income: {this.state.totaltaxableincome}
                            </Text>

                        </Block>
                    </Block>
                </Block>
            </Block>
        );
    };

    TotalTaxesPaid = () => {
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
                                Total Taxes Paid: {this.state.TotalTaxesPaid}
                            </Text>

                        </Block>
                    </Block>
                </Block>
            </Block>
        );
    };

    TotalTaxLiability = () => {
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
                                Total Tax Liability: {this.state.TotalTaxLiability}
                            </Text>

                        </Block>
                    </Block>
                </Block>
            </Block>
        );
    };

    TaxDifference = () => {
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
                                Tax Difference: {this.state.TaxDifference}
                            </Text>

                        </Block>
                    </Block>
                </Block>
            </Block>
        );
    };

    renderbutton = () => {
        return (
            <Block style={{ flexDirection: 'column', marginTop: theme.SIZES.BASE, justifyContent: 'center', alignItems: 'center' }}>
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

    renderCounts = () => {
        return (
            <Block flex style={styles.group}>
                <Block style={{ alignItems: 'center', justifyContent: 'center', paddingHorizontal: theme.SIZES.BASE }}>


                    <Text
                        h5
                        style={{
                            fontFamily: 'montserrat-regular',
                            marginBottom: theme.SIZES.BASE / 2
                        }}
                        color={nowTheme.COLORS.HEADER}
                        onPress={() => {
                            AsyncStorage.setItem('id1040', this.state.FormID.toString());
                            this.props.navigation.navigate("view1099list");
            
                          }}
                    >
                        1099 Form: {this.state.count1099}
                    </Text>

                    <Text
                        h5
                        style={{
                            fontFamily: 'montserrat-regular',
                            marginBottom: theme.SIZES.BASE / 2
                        }}
                        color={nowTheme.COLORS.HEADER}
                        onPress={() => {
                            AsyncStorage.setItem('id1040', this.state.FormID.toString());
                            this.props.navigation.navigate("viewW2list");
            
                          }}
                    >
                        W2 Form: {this.state.countW2}
                    </Text>

                </Block>
            </Block>
        );
    };

    async Submit() {
        let ip = await AsyncStorage.getItem('ip');

        this.setState({ Totalincome: await AsyncStorage.getItem('TotalIncome') })
        AsyncStorage.removeItem('TotalIncome')

        this.setState({ Totalbusinessexpense: await AsyncStorage.getItem('Totalbusinessexpense') })
        AsyncStorage.removeItem('Totalbusinessexpense')


        if (this.state.Totalincome === "" || this.state.Totalbusinessexpense === "" || this.state.totalmilesdriven === "") {
            alert("All fields marked * are required!")

        }
        else {
            this.setState({
                spinner: true
            })
            await fetch('http://' + ip + '/addform?totalincome=' + this.state.Totalincome + '&totalbusinessexpense=' + this.state.Totalbusinessexpense + '&totalmilesdriven=' + this.state.totalmilesdriven + '&totaltaxespaid=0&FormID=1&PhoneID=' + Device.osBuildId + ' ')
                .then(res => res.json())

                .then(res => {
                    if (res == 1) {
                        this.setState({
                            spinner: false
                        })
                        alert("Form 1099 added!")
                        this.props.navigation.navigate("Onboarding")
                    }
                    else {
                        this.setState({
                            spinner: false
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
                        {this.totaltaxableincome()}
                        {this.TotalTaxesPaid()}
                        {this.TotalTaxLiability()}
                        {this.TaxDifference()}
                    </Block>

                    <Block style={{ flex: 0.1, marginTop: 50 }}>
                        {this.renderCounts()}
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

export default view1040;