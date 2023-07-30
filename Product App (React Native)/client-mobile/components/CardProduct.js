import { Dimensions, StyleSheet, View, ScrollView, Text, Image, SafeAreaView, ActivityIndicator, StatusBar, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as React from 'react';
import COLORS from '../const/colors';
const { width } = Dimensions.get('screen');
const cardWidth = width / 2 - 20;
import { useNavigation } from '@react-navigation/native';
import dolar from '../helpers';

export default function CardProduct({ product }) {

    const navigation = useNavigation()

    const getTitle = (title) => {
        return title?.length > 15 ? title.substring(0, 15) + "..." : title;
    };

    return (

        <TouchableOpacity
            underlayColor={COLORS.white}
            activeOpacity={0.9}
            onPress={() => navigation.push('Product Detail', {
                productId: product.id
            })}
        >
            <View style={styles.card}>

                <View style={{ alignItems: 'center' }}>
                    <Image source={{ uri: `${product.mainImg}` }} style={styles.image} />
                </View>

                <View style={{ marginTop: 8 }}>
                    <Text
                        style={styles.titleCategoryName}>
                        {product.Category.name}
                    </Text>
                </View>

                <View style={styles.discountContainer}>
                    <Text
                        style={styles.titleDiscount}>
                        -12%
                    </Text>
                </View>

                <View style={styles.productNameContainer}>
                    <Text style={styles.titleProductName}>{getTitle(product.name)}</Text>
                </View>
                <View
                    style={styles.ratingContainer}>
                    <View style={styles.ratingFlex}>
                        <Icon name="star" size={20} color={COLORS.primary} />
                        <Text style={styles.titleRating}>
                            5.0
                        </Text>
                    </View>
                    <Text style={styles.titlePrice}>
                        {dolar(product.price * 0.000066)}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );


}

const styles = StyleSheet.create({
    card: {
        height: 220,
        // width: cardWidth,
        marginHorizontal: 15,
        marginBottom: 90,
        marginTop: 5,
        // borderRadius: 15,
        elevation: 13,
        // backgroundColor: COLORS.white,

    },
    image: {
        height: 200,
        width: 160,
        borderRadius: 10
    },
    titleCategoryName: {
        fontSize: 12,
        fontWeight: 'bold',
        color: 'grey'
    },
    discountContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 30,
        width: 50,
        borderBottomEndRadius: 50,
        position: 'absolute',
        alignSelf: 'flex-start',
        Top: 6,
        backgroundColor: COLORS.secondary
    },
    titleDiscount: {
        fontSize: 15,
        fontWeight: 'bold',
        marginLeft: 10,
        color: COLORS.primary
    },
    productNameContainer: {
        marginHorizontal: 2
    },
    titleProductName: {
        fontSize: 17,
        fontWeight: 'bold',
        marginBottom: 15,
        marginTop: 5
    },
    ratingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    ratingFlex: {
        flexDirection: 'row'
    },
    titleRating: {
        marginLeft: 5, color: 'grey'
    },
    titlePrice: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#4cb298'
    }

});

