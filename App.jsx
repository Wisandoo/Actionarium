import React, { useState } from 'react';
import {ScrollView, StyleSheet,  Text, View, Image, ImageBackground, TextInput, Pressable, FlatList, TouchableOpacity} from 'react-native';
import {Element3, Clock, Message, SearchNormal, ArrowRight3, Eye, ArrowSquareRight, People} from 'iconsax-react-native';
import { fontType, colors } from './src/theme';
import { CategoryList, BlogList } from './src/data';
import { ListHorizontal, ItemSmall } from './src/components';


const ItemCategory = ({item, onPress, color}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={category.item}>
        <Text style={{...category.title, color}}>{item.CategoryName}</Text>
      </View>
    </TouchableOpacity>
  );
};

const FlatListCategory = () => {
  const [selected, setSelected] = useState(1);
  const renderItem = ({item}) => {
    const color = item.id === selected ? "#ff5b5b" : colors.grey();
    return (
      <ItemCategory
        item={item}
        onPress={() => setSelected(item.id)}
        color={color}
      />
    );
  };
  return (
    <FlatList
      data={CategoryList}
      keyExtractor={item => item.id}
      renderItem={item => renderItem({...item})}
      ItemSeparatorComponent={() => <View style={{width: 10}} />}
      contentContainerStyle={{paddingHorizontal: 24}}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <People
                  size={35}
                  variant="Linear"
                  color="#FF8A65"
                />
        <Text style={styles.title}>ACTIONARIUM</Text>
        <Element3 color={colors.black()} variant="Center" size={24} />
      </View>
      <View style={styles.listCategory}>
        <FlatListCategory />
      </View>
      <View style={searchBar.container}>
        <TextInput
            style={searchBar.input}
            placeholder="Search"
          />
          <Pressable style={searchBar.button}>
            <SearchNormal size={20} color={colors.white()} />
          </Pressable>
      </View>
      <ListBlog />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black(),
  },
  header: {
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    height:52,
    elevation: 8,
    paddingTop:8,
    paddingBottom:4
  },
  title: {
    fontSize: 20,
    fontFamily: fontType['Pjs-ExtraBold'],
    color: colors.white(),
  },
  listCategory: {
    paddingVertical: 10,
  },
  listBlog: {
    paddingVertical: 10,
    gap: 10,
  },
  listCard: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    gap: 15,
  },
});
const category = StyleSheet.create({
  item: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: 'center',
    backgroundColor: colors.white(),
  },
  title: {
    fontFamily: fontType['Pjs-SemiBold'],
    fontSize: 14,
    lineHeight: 18,
  },
});
const searchBar = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    backgroundColor: colors.grey(0.03),
    borderColor: "#FF5F1F",
    borderRadius: 20,
    borderWidth: 1,
    flexDirection: 'row',
  },
  input: {
    color : colors.white(),
    height: 40,
    padding: 10,
    width: '90%',
  },
  button: {
    backgroundColor: colors.black(0.005),
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 40,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
});
const ListBlog = () => {
  const horizontalData = BlogList.slice(0, 5);
  const verticalData = BlogList.slice(5);
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.listBlog}>
        <ListHorizontal data={horizontalData} />
        <View style={styles.listCard}>
          {verticalData.map((item, index) => (
            <ItemSmall item={item} key={index} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};


