import { Dimensions, StyleSheet, View, ScrollView, Text, Image, ActivityIndicator } from 'react-native';
import * as React from 'react';
import COLORS from '../const/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
const { width } = Dimensions.get('screen');
const cardWidth = width / 2 - 20;
import { GET_CATEGORY } from '../queries';
import { useQuery } from '@apollo/client';


export default function ListCategories() {

    const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0);

    const { loading, error, data } = useQuery(GET_CATEGORY)

    if (loading) {
        return <ActivityIndicator size={"large"} color="purple" />
    }

    if (error) {
        return <Text>Oops something went wrong...</Text>
    }
        return (
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoriesListContainer}>

                {data.getAllCategories.map((category, index) => (
                    <TouchableOpacity
                        key={index}
                        activeOpacity={0.8}
                        onPress={() => setSelectedCategoryIndex(index)}>
                        <View
                            style={{
                                backgroundColor:
                                    selectedCategoryIndex == index
                                        ? '#7f5c4c'
                                        : '#f8f9fd',
                                ...styles.categoryBtn,
                            }}>
                            <View style={styles.categoryBtnImgCon}>
                                <Image
                                    source={{uri: `${category.image}`}}
                                    style={styles.imageCategory}
                                />
                            </View>
                            <Text
                                style={{
                                    fontSize: 15,

                                    marginLeft: 10,
                                    color:
                                        selectedCategoryIndex == index
                                            ? 'white'
                                            : 'black',
                                }}>
                                {category.name}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ))}

            </ScrollView>
        );
    

}

const styles = StyleSheet.create({
    categoriesListContainer: {
        paddingVertical: 30,
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    categoryBtn: {
        height: 45,
        width: 120,
        marginRight: 7,
        borderRadius: 30,
        alignItems: 'center',
        paddingHorizontal: 5,
        flexDirection: 'row',
    },
    categoryBtnImgCon: {
        height: 35,
        width: 35,
        backgroundColor: COLORS.white,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageCategory: {
        height: 35,
        width: 35,
        resizeMode: 'cover'
    }
});

