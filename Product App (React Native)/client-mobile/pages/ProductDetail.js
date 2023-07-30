import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Image, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
// import Icon from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../const/colors';
import { SecondaryButton } from '../components/Button';
import { GET_PRODUCT_DETAIL } from '../queries';
import { GET_USER } from '../queries';
import { useQuery } from '@apollo/client';
import dolar from '../helpers';

const Detail = ({ navigation, route }) => {


  const { height, width } = Dimensions.get('window')

  const [selectedIndex, setSelectedIndex] = useState(0)
  // const [selectedProduct, setSelectedProduct] = useState(0)

  const { productId } = route.params;

  const { loading, error, data } = useQuery(GET_PRODUCT_DETAIL, {
    variables: {
      getProductByIdId: productId
    }
  })
  // console.log(data.getProductById);
  if (loading) {
    return <ActivityIndicator size={"large"} color={COLORS.primary} />
  }

  if (error) {
    return <Text>Oops something went wrong...</Text>
  }


  return (
    <SafeAreaView style={styles.areaContainer}>
      <ScrollView >
        <View style={styles.header}>
          <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Details</Text>
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ height: height / 2.5, flexDirection: 'row' }}>
            <FlatList
              pagingEnabled
              horizontal
              onScroll={e => {
                // setSelectedIndex(
                //   (e.nativeEvent.contentOffset.x / width).toFixed(0)
                // )
              }}
              keyExtractor={(item) => item.id}
              data={data.getProductById.Images}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => {
                return <Image source={{ uri: item.imgUrl }} style={{ height: 400, width: 300 }} />
              }} />
            <View style={{ width: width, height: 40, position: 'absolute', bottom: 0, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              {data.getProductById.Images.map((item, index) => {
                return (
                  <View key={item.id} style={{ backgroundColor: selectedIndex === index ? '#8e8e8e' : '#f2f2f2', height: 5, width: 30 }}></View>
                )
              })}

            </View>
            <View>
              <FlatList data={data.getProductById.Images} vertical renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity style={{ width: width / 3, height: height / 7, borderWidth: 2, borderColor: '#fff' }}
                  // onPress={() => {
                  //   setSelectedProduct(index)
                  //   setSelectedIndex(0)
                  // }}
                  >
                    <Image source={{ uri: item.imgUrl }} style={{ width: '100%', height: '100%' }} />
                  </TouchableOpacity>
                )
              }}
              />
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', height: 30, width: 70, borderRadius: 50, position: 'absolute', alignSelf: 'stretch', marginTop: 10, marginLeft: 170, backgroundColor: '#7f5c4c' }}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: 'bold',
                marginLeft: 11,
                color: 'white'
              }}>
              {data.getProductById.Category.name}
            </Text>
          </View>
          <View style={{ paddingHorizontal: 16, marginTop: 6 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 14 }}>
              <Entypo name="shopping-cart" style={{ fontSize: 18, color: COLORS.primary, marginRight: 6 }} />
              <Text style={{ fontSize: 12, color: 'black' }}>
                Shopping
              </Text>
            </View>
            <View style={{ flexDirection: 'row', marginVertical: 4, alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 24, fontWeight: '600', letterSpacing: 0.5, marginVertical: 4, color: 'black', maxWidth: "84%" }}>
                {data.getProductById.name}
              </Text>
              <Icon
                name="favorite-border"
                style={{
                  fontSize: 30,
                  color: COLORS.primary,
                  padding: 8,
                  borderRadius: 100,
                }}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{ flexDirection: 'row' }}>
                <Icon name="star" size={17} color={COLORS.primary} />
                <Text style={{ fontSize: 12, marginLeft: 5, color: 'grey' }}>
                  5.0
                </Text>
                <Text style={{ fontSize: 12, marginLeft: 5, fontWeight: 'bold' }}>
                  (800 Reviews)
                </Text>
                <Text style={{ fontSize: 12, marginLeft: 5, color: 'grey' }}>
                  | 863
                </Text>
                <Text style={{ fontSize: 12, marginLeft: 5, fontWeight: 'bold' }}>
                  Purchased
                </Text>
                <Text style={{ fontSize: 12, marginLeft: 5, color: 'grey' }}>
                  | 1000
                </Text>
                <Text style={{ fontSize: 12, marginLeft: 5, fontWeight: 'bold' }}>
                  Stocks
                </Text>
              </View>
              {/* <Text style={{ fontSize: 15, fontWeight: 'bold', marginBottom: 10 }}>
                        {dolar(product.price * 0.000066)}
                    </Text> */}
            </View>
            <Text style={{ marginTop: 20, fontSize: 17, fontWeight: 'bold' }}>Description:</Text>
            <Text
              style={{
                fontSize: 15,
                color: 'black',
                fontWeight: '400',
                opacity: 0.5,
                marginBottom: 18,
                marginTop: 10
              }}>
              {data.getProductById.description}
            </Text>
            <Text
              style={{
                fontSize: 20,
                color: '#4cb298',
                fontWeight: 'bold',
                letterSpacing: 1,
                lineHeight: 20,
                maxWidth: '85%',
                maxHeight: 44,
                marginBottom: 5,
                marginTop: 10,
                alignSelf: 'flex-end'
              }}>
              {dolar(data.getProductById.price * 0.000066)}
            </Text>
          </View>
        </View>
        <View style={{ marginTop: 40, marginBottom: 40 }}>
          <SecondaryButton title="Add To Cart" />
        </View>
      </ScrollView>
    </SafeAreaView>


  );
};

const styles = StyleSheet.create({
  areaContainer: {
    flex: 1
  },
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  details: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 60,
    backgroundColor: COLORS.primary,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  iconContainer: {
    backgroundColor: COLORS.white,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  detailsText: {
    marginTop: 10,
    lineHeight: 22,
    fontSize: 16,
    color: COLORS.white,
  },
});

export default Detail;
