import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import React, { useState, useCallback, useEffect} from 'react';
import { Setting, Edit, Add } from 'iconsax-react-native';
import FastImage from '@d11/react-native-fast-image';
import { ProfileData, PictureList } from '../../data';
import { fontType, colors } from '../../theme';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import axios from 'axios';

const formatNumber = number => {
  if (number >= 1_000_000_000) return (number / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
  if (number >= 1_000_000) return (number / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  if (number >= 1_000) return (number / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
  return number.toString();
};

const profileInfo = [
  { label: 'Posted', value: ProfileData.blogPosted },
  { label: 'Following', value: formatNumber(ProfileData.following) },
  { label: 'Follower', value: formatNumber(ProfileData.follower) }
];

const Profile = () => {
  const navigation = useNavigation();

  const renderHeader = () => (
    <>
      {/* Header */}
      <View style={styles.header}>
        <Setting color={colors.orange()} variant="Linear" size={24} />
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <FastImage
          style={styles.pic}
          source={{
            uri: ProfileData.profilePict,
            headers: { Authorization: 'someAuthToken' },
            priority: FastImage.priority.high,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <Text style={styles.name}>{ProfileData.name}</Text>
        <Text style={styles.info}>Member since {ProfileData.createdAt}</Text>
      </View>

      {/* Stats Section */}
      <View style={styles.statsContainer}>
        {profileInfo.map((stat, index) => (
          <View key={index} style={styles.statItem}>
            <Text style={styles.statCount}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* Edit Profile Button */}
      <TouchableOpacity style={styles.buttonEdit}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>
    </>
  );

  // status untuk menandakan apakah terjadi loading/tidak
  const [loading, setLoading] = useState(true);
  // state blod data untuk menyimpan list (array) dari blog
  const [blogData, setBlogData] = useState([]);
  // status untuk menyimpan status refreshing
  const [refreshing, setRefreshing] = useState(false);
  
  const getDataBlog = async () => {
    try {
      // ambil data dari API dengan metode GET
      const response = await axios.get(
        'https://682c9fb14fae188947534d0a.mockapi.io/api/Post',
      );
      // atur state blogData sesuai dengan data yang
      // di dapatkan dari API
      setBlogData(response.data);
      // atur loading menjadi false
      setLoading(false)
    } catch (error) {
        console.error(error);
    }
  };

  useFocusEffect(useCallback(() => {
    getDataBlog();    
  }));


  return (
    <View style={styles.container}>
      <FlatList
        data={blogData}
        keyExtractor={(_, index) => index.toString()}
        numColumns={3}
        ListHeaderComponent={renderHeader}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.imageContainer}
          activeOpacity={0.8}
          onPress={() =>
          navigation.navigate('PostDetail', {
            image: item.image,
            caption: item.caption || '', // pastikan data ada
            tags: item.tags || [], // bisa array kosong jika tidak ada
            postId: item.id
          })
}

        >
          <FastImage
            source={{ uri: item.image }}
            style={styles.image}
            resizeMode={FastImage.resizeMode.cover}
          />
        </TouchableOpacity>
      )}

        contentContainerStyle={styles.scrollContainer}
      />

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate('CreatePost')}>
        <Add color={colors.white()} variant="Linear" size={20} />
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.black() },
  header: { padding: 16, alignItems: 'flex-end' },
  scrollContainer: { paddingHorizontal: 24, paddingVertical: 20 },
  profileSection: { alignItems: 'center', marginBottom: 20 },
  pic: { width: 150, height: 150, borderRadius: 100 },
  name: { color: colors.white(), fontSize: 25, fontFamily: fontType['Pjs-Bold'] },
  info: { fontSize: 12, color: colors.white(0.7), fontFamily: fontType['Pjs-Regular'] },
  statsContainer: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 15 },
  statItem: { alignItems: 'center' },
  statCount: { fontSize: 18, color: colors.white(), fontFamily: fontType['Pjs-SemiBold'] },
  statLabel: { fontSize: 14, color: colors.white(0.7), fontFamily: fontType['Pjs-Regular'] },
  buttonEdit: { padding: 14, backgroundColor: colors.orange(), borderRadius: 10, alignItems: 'center', marginBottom: 15 },
  buttonText: { fontSize: 14, color: colors.black(), fontFamily: fontType['Pjs-SemiBold'] },
  imageContainer: { flex: 1, margin: 5 },
  image: { width: '100%', aspectRatio: 1, borderRadius: 10 },
  floatingButton: {
    backgroundColor: colors.orange(),
    padding: 15,
    position: 'absolute',
    bottom: 24,
    right: 24,
    borderRadius: 10,
    shadowColor: colors.blue(),
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
});