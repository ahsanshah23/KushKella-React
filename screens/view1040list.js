import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Image, ActivityIndicator, FlatList } from 'react-native';
import { Block, Text, theme, Button as GaButton } from 'galio-framework';
import { View } from 'react-native';
import { AsyncStorage } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import * as Device from 'expo-device';

class view1040list extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            id: "",
            title: "",
            leader_email: "",
            forms1040: [],
            leader: ""

        };
    }

    componentDidMount() {
        this.getData();
    }

    async getData() {

        this.setState({
            spinner: true
        });

        const forms = [];
        let ip = await AsyncStorage.getItem('ip');

        await fetch('http://' + ip + '/1040viewlist?PhoneID=' + Device.osBuildId + '')
            .then(res => res.json())

            .then(res => {

                if (res == undefined) {
                    this.setState({
                        spinner: false
                    });
                    Alert("No Forms Found! ");
                }
                else {
                    res.map((element) => {
                        const formsObj = {};

                        formsObj.id = element.id;
                        formsObj.PhoneID = element.PhoneID;

                        forms.push(formsObj);
                    });

                    this.setState({ forms1040: forms });
                    this.setState({
                        spinner: false
                    });
                }
            })
            .catch((error) => {
                //Error 
                alert("Error");
                console.warm(error);
                this.setState({
                    spinner: false
                });
            });
    }

    render() {
        const { leader } = this.state;

        return (
            <Block>
                <Spinner
                    visible={this.state.spinner}
                    textContent={'Gathering Details ...'}
                    textStyle={{ color: 'white' }}
                />
                <ScrollView>

                    {this.state.forms1040.map((item, key) => (

                        <TouchableOpacity style={[styles.card, { backgroundColor: '#778899' }]} onPress={() => {
                            AsyncStorage.setItem('id', (item.id).toString());
                            this.props.navigation.navigate("view1040");

                        }}>
                            <View style={styles.cardHeader}>
                                <Text
                                    h5
                                    style={{
                                        color: 'white',
                                        fontFamily: 'montserrat-regular',
                                        marginBottom: theme.SIZES.BASE / 2
                                    }}
                                    onPress={() => {
                                        AsyncStorage.setItem('id1040', this.state.FormID.toString());
                                        this.props.navigation.navigate("view1099list");

                                    }}
                                >
                                    Form 1040 #: {key + 1}
                                </Text>

                            </View>


                            <View style={styles.cardFooter}>
                                
                                <Text key={key} style={styles.subTitle}>ID: {item.id}</Text>
                                <Text key={key} style={styles.subTitle}>Phone ID: {item.PhoneID}</Text>

                            </View>
                        </TouchableOpacity>
                    )
                    )}


                </ScrollView>
            </Block>
        );
    }
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'column',
        marginHorizontal: 10,
        marginVertical: 2,
        flexBasis: '27%',
        marginTop: 20,
        borderRadius: 10
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: 30,
        backgroundColor: '#ecf0f1',
        padding: 8,
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    cardFooter: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingTop: 12.5,
        paddingBottom: 25,
        paddingHorizontal: 16,
        borderBottomLeftRadius: 1,
        borderBottomRightRadius: 1,
    },
    icon: {
        height: 20,
        width: 20,
    },
    title: {
        fontFamily: 'montserrat-regular',
        fontSize: 20,
        flex: 1,
        color: "#FFFFFF",
        fontWeight: '500'
    },
    subTitle: {
        paddingVertical: 10,
        fontFamily: 'montserrat-regular',
        fontSize: 16,
        flex: 1,
        color: "#FFFFFF",
    },
    cardHeader: {
        paddingVertical: 17,
        paddingHorizontal: 16,
        borderTopLeftRadius: 1,
        borderTopRightRadius: 1,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center"
    },
});


export default view1040list;