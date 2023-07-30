import React from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../const/colors';
import { PrimaryButton } from '../components/Button';

const OnBoardScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.areaContainer}>

      <View style={{ height: 400 }}>
        <Image
          style={styles.onboardImage}
          source={require('../assets/onboardImage.png')}
        />
      </View>
      <View style={styles.textContainer}>
        <View>
          <Text style={styles.titleText1}>
            Trend Fashion
          </Text>
          <Text
            style={styles.titleText2}>
            We help you to find best and trend fashion for you
          </Text>
        </View>
        <View style={styles.indicatorContainer}>
          <View style={styles.currentIndicator} />
          <View style={styles.indicator} />
          <View style={styles.indicator} />
        </View>
        <PrimaryButton
          onPress={() => navigation.navigate('HomeTab')}
          title="Get Started"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  areaContainer: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  onboardImage: {
    width: '100%',
    resizeMode: 'contain',
    top: -80
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: 50,
    justifyContent: 'space-between',
    paddingBottom: 40,
  },
  titleText1: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  titleText2: {
    marginTop: 20,
    fontSize: 18,
    textAlign: 'center',
    color: COLORS.grey,
  },
  indicatorContainer: {
    height: 50,
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  currentIndicator: {
    height: 12,
    width: 30,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    marginHorizontal: 5,
  },
  indicator: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: COLORS.grey,
    marginHorizontal: 5,
  },
});

export default OnBoardScreen;