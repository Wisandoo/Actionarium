import { StyleSheet, Text, View, TouchableOpacity, FlatList, RefreshControl, ActivityIndicator } from 'react-native';
import React, { useState, useCallback, useEffect } from 'react';
import { Setting, Edit, Add } from 'iconsax-react-native';
import FastImage from '@d11/react-native-fast-image';
import { ProfileData } from '../../data';
import { fontType, colors } from '../../theme';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { collection, getFirestore, onSnapshot } from '@react-native-firebase/firestore';
import { formatNumber } from '../../utils/formatNumber';

const profileInfo = [
  { label: 'Posted', value: ProfileData.blogPosted },
  { label: 'Following', value: formatNumber(ProfileData.following) },
  { label: 'Follower', value: formatNumber(ProfileData.follower) }
];

const Profile = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [blogData, setBlogData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const getDataBlog = () => {
    const db = getFirestore();
    const blogRef = collection(db, 'blog');

    const subscriber = onSnapshot(blogRef, snapshot => {
      const blogs = [];
      snapshot.forEach(doc => {
        blogs.push({
          ...doc.data(),
          id: doc.id,
        });
      });
      setBlogData(blogs);
      setLoading(false);
    });

    return subscriber;
  };

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = getDataBlog();
      return () => unsubscribe(); // cleanup listener
    }, [])
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      getDataBlog(); // Refresh via re-snapshot
      setRefreshing(false);
    }, 1500);
  }, []);

  const renderHeader = () => (
    <>
      <View style={styles.header}>
        <Setting color={colors.orange()} variant="Linear" size={24} />
      </View>
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
      <View style={styles.statsContainer}>
        {profileInfo.map((stat, index) => (
          <View key={index} style={styles.statItem}>
            <Text style={styles.statCount}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>
      <TouchableOpacity style={styles.buttonEdit}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>
    </>
  );

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
                caption: item.caption || '',
                tags: item.tags || [],
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
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListFooterComponent={
          loading ? (
            <ActivityIndicator size="large" color={colors.orange()} style={{ marginTop: 20 }} />
          ) : null
        }
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