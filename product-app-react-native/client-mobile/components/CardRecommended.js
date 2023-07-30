import { Dimensions, StyleSheet, View, Text, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as React from 'react';
import COLORS from '../const/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
const { width } = Dimensions.get('screen');
const cardWidth = width / 2 - 20;
import { useNavigation } from '@react-navigation/native';
import dolar from '../helpers';

export default function CardRecommended({ product }) {
    const navigation = useNavigation()

    return (
        <TouchableOpacity
            underlayColor={COLORS.white}
            activeOpacity={0.9}
            onPress={() => navigation.push('Product Detail', {
                productId: product.id
            })}>
            <ImageBackground style={styles.cardImage} source={{ uri: `${product.mainImg}` }}>
                <View style={styles.discountContainer}>
                    <Text
                        style={styles.titleDiscount}>
                        -12%
                    </Text>
                </View>

                <View style={styles.iconFavoriteContainer}>
                    <Icon name="favorite-border" size={25} color={'white'} />
                </View>

                <Text
                    style={styles.titleProductName}>
                    {product.name}
                </Text>
                <View
                    style={styles.ratingPriceContainer}>
                    <View style={styles.ratingFlex}>
                        <Icon name="star" size={20} color={COLORS.primary} />
                        <Text style={styles.titleRating}>
                            5.0
                        </Text>
                    </View>
                    <View style={styles.priceFlex}>
                        {/* <Icon name="star" size={20} color={COLORS.white} /> */}
                        <Text style={styles.titlePrice}>{dolar(product.price * 0.000066)}</Text>
                    </View>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    cardImage: {
        height: 220,
        width: width / 2,
        marginRight: 20,
        padding: 10,
        overflow: 'hidden',
        borderRadius: 10
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
    iconFavoriteContainer: {
        flexDirection: 'row',
        alignSelf: 'flex-end'
    },
    titleProductName: {
        color: COLORS.white,
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 1,
    },
    ratingPriceContainer: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    ratingFlex: {
        flexDirection: 'row'
    },
    titleRating: {
        marginLeft: 5,
        color: 'grey'
    },
    priceFlex: {
        flexDirection: 'row'
    },
    titlePrice: {
        fontSize: 18,
        marginLeft: 5,
        color: '#4cb298',
        fontWeight: 'bold'
    }
});
