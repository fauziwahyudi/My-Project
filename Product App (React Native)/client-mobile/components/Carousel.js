import { View, Dimensions, FlatList, ImageBackground, StyleSheet } from 'react-native';
import * as React from 'react';
import { useState, useRef, useEffect } from 'react'

export default function Carousel() {

    const flatlistRef = useRef()
    const screenWidth = Dimensions.get("window").width
    const [activeIndex, setActiveIndex] = useState(0)

    useEffect(() => {
        let interval = setInterval(() => {
            if (activeIndex === carouselData.length - 1) {
                flatlistRef.current.scrollToIndex({
                    index: 0,
                    animation: true
                })
            } else {
                flatlistRef.current.scrollToIndex({
                    index: activeIndex + 1,
                    animation: true
                })
            }
        }, 2000)
        return () => clearInterval(interval)
    })

    const getItemLayout = (data, index) => ({
        length: screenWidth,
        offset: screenWidth * index,
        index: index
    })

    const carouselData = [
        {
            id: '01',
            image: require('../assets/carousel1.jpg')
        },
        {
            id: '02',
            image: require('../assets/carousel2.jpg')
        },
        {
            id: '03',
            image: require('../assets/carousel3.jpg')
        }
    ]

    const renderItem = ({ item, index }) => {
        return (
            <View>
                <ImageBackground resizeMode="cover" source={item.image} style={{  width: screenWidth, ...styles.imageContainer }} />
            </View>
        )
    }

    const handleScroll = (event) => {
        const scrollPosition = event.nativeEvent.contentOffset.x
        const index = scrollPosition / screenWidth
        setActiveIndex(index)
    }

    return (
        <View>
            <FlatList data={carouselData} ref={flatlistRef} getItemLayout={getItemLayout} renderItem={renderItem} keyExtractor={(item) => item.id} horizontal={true} pagingEnabled={true} onScroll={handleScroll} />
        </View>

    )
}

const styles = StyleSheet.create({
    imageContainer: {
        height: 220,
        borderRadius: 20
    }
})
