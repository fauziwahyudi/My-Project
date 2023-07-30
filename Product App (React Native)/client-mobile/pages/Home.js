import { Dimensions, StyleSheet, View, ScrollView, Text, ActivityIndicator, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons'
import * as React from 'react';
import Carousel from '../components/Carousel';
import COLORS from '../const/colors';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { GET_PRODUCTS } from '../queries';
import { useQuery } from '@apollo/client';
import CardProduct from '../components/CardProduct';
import ListCategories from '../components/ListCategories';
import CardRecommended from '../components/CardRecommended';
import Video from 'react-native-video';
import { useRef } from 'react';
// import Video1 from '../assets/hermes-video.mp4'
import Timer from '../components/Timer';


export default function Home() {
  const videoRef = useRef(null)
  const onBuffer = (e) => {
    console.log("buffering....", e);
  }
  const onError = (e) => {
    console.log("error raised", e);
  }

  const { loading, error, data } = useQuery(GET_PRODUCTS)
  if (loading) {
    return <ActivityIndicator size={"large"} color={COLORS.primary} />
  }

  if (error) {
    return <Text>Oops something went wrong...</Text>
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="rgba(0,0,0,0)" />

      <Carousel />

      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <View style={styles.inputContainer}>
            <Icon name="search" size={28} />

            <TextInput
              placeholder="Search place"
              style={styles.textInput}
            />
          </View>

          <View style={styles.iconMenuContainer}>
            <Ionicons name="ios-menu" size={28} color={'black'} />
          </View>

        </View>
        {/* <Icon name="sort" size={28} color={'black'} /> */}
        <Ionicons name="chatbubble-ellipses" size={28} color={'black'} />

      </View>

      <FlatList
        ListHeaderComponent={() => {
          return (
            <>
              <ListCategories />

              <View style={styles.titleContainer}>
                <Text style={styles.titleText1}>Midnight Sale</Text>

                <View style={styles.timeContainer}>
                  <Ionicons name="time-outline" size={20} color={'white'} />

                  <Timer duration={2 * 24 * 60 * 1000} />

                </View>
                <Text style={styles.titleText2}>See all</Text>
              </View>


              <Text style={styles.sectionTitle}>Recommended</Text>
              <View>
                <FlatList
                  contentContainerStyle={{ paddingLeft: 20 }}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item) => item.id}
                  data={data.getAllProducts}
                  renderItem={({ item }) => <CardRecommended product={item} />}
                />

                <Text style={styles.sectionTitle}>All Product</Text>


              </View>
            </>
          )
        }}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        keyExtractor={(item) => item.id}
        data={data.getAllProducts}
        renderItem={({ item }) => <CardProduct product={item} />}

      />

    </View>


  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    position: 'absolute',
    top: 30,
    alignSelf: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 23,
  },
  inputContainer: {
    height: 50,
    width: '100%',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    position: 'absolute',
    top: 135,
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    shadowColor: "#000",
    zIndex: 1000000,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  textInput: {
    color: COLORS.grey
  },
  iconMenuContainer: {
    position: 'absolute',
    alignSelf: 'flex-start'
  },
  titleContainer: {
    backgroundColor: '#f8f9fd',
    paddingHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    width: 360,
    borderRadius: 10,
    marginLeft: 10
  },
  titleText1: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    color: 'black'
  },
  timeContainer: {
    paddingHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    height: 30,
    width: 115,
    borderRadius: 20,
    marginTop: 6,
    marginLeft: 10,
    backgroundColor: '#db3c3e'
  },
  titleText2: {
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 50,
    color: 'black'
  },
  categoryContainer: {
    marginTop: 60,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconContainer: {
    height: 60,
    width: 60,
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  sectionTitle: {
    marginHorizontal: 20,
    marginVertical: 15,
    fontWeight: 'bold',
    fontSize: 20,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  }
});
