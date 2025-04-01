import { StyleSheet, Text, View, ScrollView, FlatList, TouchableOpacity, TextInput } from 'react-native';
import React from 'react';
import { BlogList } from '../../data';
import { ItemSmall } from '../../components';
import { SearchNormal1 } from 'iconsax-react-native';
import { fontType, colors } from '../../theme';

const recentSearches = [
  { id: 1, label: 'Spider-man' },
  { id: 2, label: 'The Flash' },
  { id: 3, label: 'Venom Revoltech' },
  { id: 4, label: 'Custom Action Figure' },
  { id: 5, label: 'Most Expensive Figure' },
];

// Komponen untuk item Recent Search
const ItemRecent = ({ item }) => (
  <TouchableOpacity style={category.item}>
    <Text style={category.title}>{item.label}</Text>
  </TouchableOpacity>
);

// FlatList untuk Recent Search
const RecentSearchList = () => (
  <FlatList
    data={recentSearches}
    keyExtractor={item => item.id.toString()}
    renderItem={({ item }) => <ItemRecent item={item} />}
    ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
    contentContainerStyle={styles.listCategory}
    horizontal
    showsHorizontalScrollIndicator={false}
  />
);

const Searching = () => {
  const recentBlog = BlogList.slice(5);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Search</Text>
      </View>

      {/* Search Bar */}
      <View style={searchBar.container}>
        <TextInput style={searchBar.input} placeholder="Search..." placeholderTextColor={colors.white(0.6)} />
        <TouchableOpacity style={searchBar.button}>
          <SearchNormal1 size={20} color={colors.white()} variant="Linear" />
        </TouchableOpacity>
      </View>

       {/* Recent Search Section */}
       <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Search</Text>
        <RecentSearchList />
      </View>

      {/* Blog List */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.listCard}>
          {recentBlog.map((item, index) => (
            <ItemSmall item={item} key={index} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Searching;

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
    height: 52,
    elevation: 8,
    paddingTop: 8,
    paddingBottom: 4,
    marginTop: 8,
  },
  title: {
    fontSize: 25,
    fontFamily: fontType['Pjs-ExtraBold'],
    color: colors.orange(),
  },
  section: {
    marginTop: 1,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: fontType['Pjs-Bold'],
    color: colors.orange(),
    marginBottom: 10,
  },
  listCategory: {
    paddingVertical: 10,
    paddingHorizontal: 24,
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
    marginHorizontal: 18,
    marginBottom: 5,
    backgroundColor: colors.black(),
    borderColor: colors.orange(),
    borderRadius: 20,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    color: colors.white(),
    height: 40,
    paddingHorizontal: 10,
    width: '85%',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 57,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: colors.orange(2),
  },
});
