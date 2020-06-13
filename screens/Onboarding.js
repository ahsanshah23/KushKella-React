import React from "react";
import { StyleSheet, Dimensions, ScrollView, CheckBox, TextInput, AsyncStorage, TouchableOpacity, View, Picker, Image } from "react-native";
import { Block, theme, Text } from "galio-framework";
var FloatingLabel = require('react-native-floating-labels');
import { nowTheme } from '../constants';
import { Button } from "../components";
import Spinner from 'react-native-loading-spinner-overlay';
import * as Device from 'expo-device';

export default class Onboarding extends React.Component {
  state = {
    email: '',
    password: '',
    count1099: 0,
    countW2: 0
  };

  async getData() {
    await fetch('http://192.168.0.90:3006/formcount?PhoneID=' + Device.osBuildId + '&FormID=1&ID1040=0 ')
      .then(res => res.json())

      .then(res => {
        // console.warn(res[0].count)
        this.setState({
          count1099: res[0].count
        })
      })
      .catch(async api3looperror => {
        // console.warn(error);
      });

    await fetch('http://192.168.0.90:3006/formcount?PhoneID=' + Device.osBuildId + '&FormID=2&ID1040=0 ')
      .then(res => res.json())

      .then(res => {
        // console.warn(res[0].count)
        this.setState({
          countW2: res[0].count
        })
      })
      .catch(async api3looperror => {
        // console.warn(error);
      });
  }

  async Submit() {
    let ip = await AsyncStorage.getItem('ip');

    this.setState({ Totalincome: await AsyncStorage.getItem('TotalIncome') })
    AsyncStorage.removeItem('TotalIncome')

    if (this.state.count1099 == 0 || this.state.countW2 == 0) {
      alert("You need to add at least one 1099 and W2 form");
    }
    else {
      await fetch('http://192.168.0.90:3006/add1044?PhoneID=' + Device.osBuildId + '')
        .then(res => res.json())

        .then(res => {
          if (res == 1) {
            this.setState({
              countW2: 0,
              count1099: 0,
            })
            alert("Form 1040 generated successfully!")
          }
          else {
            alert("There was a problem with generating form 1044, Please try again!")
          }
        })
        .catch(async api3looperror => {
          // console.warn(error);
        });
    }

  }

  renderbutton = () => {
    return (
      <Block style={{ flexDirection: 'column', marginTop: theme.SIZES.BASE, justifyContent: 'center', alignItems: 'center' }}>
        <Block>
          <Button
            shadowless
            style={styles.button}
            color={nowTheme.COLORS.PRIMARY}
            // disabled={this.state.ButtonSubmit}
            onPress={this.Submit.bind(this)}

          >
            <Text
              style={{ fontFamily: 'montserrat-bold', fontSize: 14 }}
              color={theme.COLORS.WHITE}
            >
              CREATE 1044
                </Text>
          </Button>
        </Block>

      </Block>
    );
  };

  componentDidMount() {
    AsyncStorage.setItem('ip', '192.168.0.90:3006');
    setInterval(() => {
      this.getData();
    }, 1000);
  }

  renderheading = () => {
    return (
      <Block flex style={styles.group}>
        <Block style={{ marginTop: theme.SIZES.BASE * 2, alignItems: 'center', justifyContent: 'center', paddingHorizontal: theme.SIZES.BASE }}>
          <Text
            h3
            style={{

              alignItems: 'center',
              fontFamily: 'montserrat-regular',
            }}
            color={nowTheme.COLORS.HEADER}
          >
            FORM COUNT
          </Text>

        </Block>
      </Block>
    );
  }

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
          >
            W2 Form: {this.state.countW2}
          </Text>

        </Block>
      </Block>
    );
  };

  render() {
    return (
      <Block style={{ flex: 1 }}>

        <Block style={{ flex: 0.55 }}>

          <Block style={[styles.card, { backgroundColor: '#008080' }]}>
            <View style={styles.cardHeader}>
              <Text style={styles.title}> 1099</Text>
            </View>

            <View style={styles.cardFooter}>
              <Text onPress={() => this.props.navigation.navigate("Form1099")} style={styles.subTitle}> Add Form</Text>
              <Text onPress={() => {
                AsyncStorage.setItem('id1040', '0');
                this.props.navigation.navigate("view1099list");

              }} style={styles.subTitle}> View Form </Text>
            </View>

          </Block>

          <Block style={[styles.card, { backgroundColor: '#008080' }]}>
            <View style={styles.cardHeader}>
              <Text style={styles.title}> W2</Text>
            </View>

            <View style={styles.cardFooter}>
              <Text onPress={() => this.props.navigation.navigate("W2")} style={styles.subTitle}> Add Form</Text>
              <Text onPress={() => {
                AsyncStorage.setItem('id1040', '0');
                this.props.navigation.navigate("viewW2list");

              }} style={styles.subTitle}> View Form </Text>
            </View>

          </Block>

          <TouchableOpacity style={[styles.card, { backgroundColor: '#008080' }]} onPress={() => this.props.navigation.navigate("view1040list")}>
            <View style={styles.cardHeader}>
              <Text style={styles.title}>View Forms</Text>
              <Image style={styles.icon} source={{ uri: "https://img.icons8.com/ios/40/000000/settings.png" }} />
            </View>

            <View style={styles.cardFooter}>
              <Text style={styles.subTitle}> Proceed </Text>
            </View>
          </TouchableOpacity>

        </Block>

        <Block style={{ flex: 0.35 }}>

          {this.renderheading()}
          {this.renderCounts()}

        </Block>

        <Block style={{ flex: 0.1 }}>

          {this.renderbutton()}

        </Block>

      </Block>

    );
  }
}

const styles = StyleSheet.create({
  group: {
    paddingTop: theme.SIZES.BASE * 2
  },
  button: {
    backgroundColor: "#008080",
    color: "white"
  },
  card: {
    marginHorizontal: 2,
    marginVertical: 2,
    flexBasis: '30%',
    marginTop: 10
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
    flexDirection: 'row',
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
    fontSize: 26,
    flex: 1,
    color: "#FFFFFF",
    fontWeight: '500'
  },
  subTitle: {
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
