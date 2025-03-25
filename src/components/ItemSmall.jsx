import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FastImage from '@d11/react-native-fast-image';
import { ArrowRight3, Clock, Eye} from 'iconsax-react-native';
import { fontType, colors } from '../theme';

const ItemSmall = ({item}) => {
    return (
      <View style={styles.cardItem}>
        <FastImage
          style={styles.cardImage}
          source={{
            uri: item.image,
            headers: {Authorization: 'someAuthToken'},
            priority: FastImage.priority.high,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View style={styles.cardContent}>
          <View
            style={{
              flexDirection: 'row',
              gap:30
            }}>
            <View style={{gap: 5, flex:1}}>
              <Text style={styles.cardCategory}>{item.category}</Text>
              <Text style={styles.cardTitle}>{item.title}</Text>
            </View>
            <ArrowRight3
              color={"#FF8A65"}
              variant="Linear"
              size={20}
            />
          </View>
          <View style={styles.cardInfo}>
            <Clock size={10} variant="Linear" color={"#FF8A65"} />
            <Text style={styles.cardText}>{item.date}</Text>
            <Eye
              size={10}
              variant="Linear"
              color={"#FF8A65"}
            />
            <Text style={styles.cardText}>{item.views}</Text>
          </View>
        </View>
      </View>
    );
  };
  export default ItemSmall;
  const styles = StyleSheet.create({
    listCard: {
      paddingHorizontal: 24,
      paddingVertical: 10,
      gap: 15,
    },
    cardItem: {
      backgroundColor: colors.blue(0.03),
      flexDirection: 'row',
      borderRadius: 10,
    },
    cardCategory: {
      color: "#ff5b5b",
      fontSize: 10,
      fontFamily: fontType['Pjs-SemiBold'],
    },
    cardTitle: {
      fontSize: 14,
      fontFamily: fontType['Pjs-Bold'],
      color: colors.white(),
    },
    cardText: {
      fontSize: 10,
      fontFamily: fontType['Pjs-Medium'],
      color: colors.white(0.9)
    },
    cardImage: {
      width: 94,
      height: 94,
      borderRadius: 10,
      resizeMode: 'cover',
    },
    cardInfo: {
      flexDirection: 'row',
      gap: 5,
      alignItems: 'center',
    },
    cardContent: {
      gap: 10,
      justifyContent: 'space-between',
      paddingRight: 10,
      paddingLeft: 15,
      flex: 1,
      paddingVertical: 10,
    },
  });
