  import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
  import React, {useState} from 'react';
  import {ArrowRight3} from 'iconsax-react-native';
  import FastImage from '@d11/react-native-fast-image';
  import {fontType, colors} from '../theme';
  import {useNavigation} from '@react-navigation/native';
  
  const ItemHorizontal = ({item, variant, onPress}) => {
    const navigation = useNavigation();
    return (
      <TouchableOpacity  style={itemHorizontal.cardItem}>
        <FastImage
          style={itemHorizontal.cardImage}
          source={{
              uri: item.image,
              headers: {Authorization: 'someAuthToken'},
              priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.cover}>
          <View style={itemHorizontal.cardContent}>
            <View style={itemHorizontal.cardInfo}>
              <Text style={itemHorizontal.cardTitle}>{item.title}</Text>
              <Text style={itemHorizontal.cardText}>{item.date}</Text>
            </View>
            <View>
              <View style={itemHorizontal.cardIcon}>
                <TouchableOpacity onPress={onPress}>
                  <ArrowRight3 color="#FF8A65" variant={variant} size={20} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </FastImage>
      </TouchableOpacity>
    );
  };
  const ListHorizontal = ({data}) => {
    const [bookmark, setBookmark] = useState([]);
    const toggleBookmark = itemId => {
      if (bookmark.includes(itemId)) {
        setBookmark(bookmark.filter(id => id !== itemId));
      } else {
        setBookmark([...bookmark, itemId]);
      }
    };
    const renderItem = ({item}) => {
      variant = bookmark.includes(item.id) ? 'Bold' : 'Linear';
      return (
        <ItemHorizontal
          item={item}
          variant={variant}
          onPress={() => toggleBookmark(item.id)}
        />
      );
    };
    return (
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={item => renderItem({...item})}
        ItemSeparatorComponent={() => <View style={{width: 15}} />}
        contentContainerStyle={{paddingHorizontal: 24}}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    );
  };
  export default ListHorizontal;
  const itemHorizontal = StyleSheet.create({
    cardItem: {
      width: 280,
    },
    cardImage: {
      width: '100%',
      alignContent: 'flex-start',
      height: 200,
      borderRadius: 5,
    },
    cardContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 15,
    },
    cardInfo: {
      justifyContent: 'flex-end',
      height: '100%',
      gap: 10,
      maxWidth: '60%',
    },
    cardTitle: {
      fontFamily: fontType['Pjs-Bold'],
      fontSize: 14,
      color: colors.white(),
    },
    cardText: {
      fontSize: 10,
      color: colors.white(),
      fontFamily: fontType['Pjs-Medium'],
    },
    cardIcon: {
      borderWidth: 0.5,
      borderRadius: 5,
    },
  });
  
  