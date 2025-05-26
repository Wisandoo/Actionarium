import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { getFirestore, doc, onSnapshot, collection, query, where } from '@react-native-firebase/firestore';
import FastImage from '@d11/react-native-fast-image';
import ActionSheet from 'react-native-actions-sheet';
import { colors, fontType } from '../../theme';
import axios from 'axios';

const ProfileDetail = ({ route }) => {
  const { userId } = route.params;
 const [iconStates, setIconStates] = useState({
    liked: {variant: 'Linear', color: colors.grey(0.6)},
    bookmarked: {variant: 'Linear', color: colors.grey(0.6)},
});

const [selectedBlog, setSelectedBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  const actionSheetRef = useRef(null);


  useEffect(() => {
    const db = getFirestore();

    // Ambil data user
    const unsubUser = onSnapshot(doc(db, 'users', userId), (snap) => {
      if (snap.exists()) setUser(snap.data());
    });

    // Ambil post berdasarkan userId
    const q = query(collection(db, 'posts'), where('userId', '==', userId));
    const unsubPosts = onSnapshot(q, (snap) => {
      const userPosts = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPosts(userPosts);
    });

    setLoading(false);
    return () => {
      unsubUser();
      unsubPosts();
    };
  }, [userId]);

  const openActionSheet = () => actionSheetRef.current?.show();
  const closeActionSheet = () => actionSheetRef.current?.hide();

  useFocusEffect(
    useCallback(() => {
      getBlogById();
    }, [ActionariumId])
  );

  const getBlogById = async () => {
    try {
      // ambil data blog berdasarkan spesifik ID dengan metode GET
      const response = await axios.get(
        `https://682c9fb14fae188947534d0a.mockapi.io/api/Post/${ActionariumId}`,
      );
      // atur state blog berdasarkan response dari API
      setSelectedBlog(response.data);
      setLoading(false);
    } catch (error) {
      Alert.alert('error', `${error.Message}`);
    }
  };

  const navigateEdit = () => {
    navigation.navigate('EditBlog', {ActionariumId});
    closeActionSheet()
  }
  const handleDelete = async () => {
    setLoading(true);
    try {
      // hapus data blog dengan spesifik ID dengan metode DELETE
      const response = await axios.delete(`https://682c9fb14fae188947534d0a.mockapi.io/api/Post/${ActionariumId}`);
      if (response.status == 200) {
        closeActionSheet();
        navigation.goBack();
      }
    } catch (error) {
      Alert.alert('Gagal Menghapus Post', `${error.Message}`);
    } finally {
      setLoading(false);
    }
  }

  const renderItem = ({ item }) => (
  <View style={styles.postContainer}>
    <FastImage source={{ uri: item.image }} style={styles.postImage} />
    <TouchableOpacity
      style={styles.menuButton}
      onPress={() => {
        setSelectedBlog(item); // Set data blog yang dipilih
        openActionSheet(); // Tampilkan Action Sheet
      }}
    >
      <Text style={styles.menuIcon}>⋮</Text> {/* Ikon tiga titik */}
    </TouchableOpacity>
  </View>
);


  if (loading || !user) {
    return <ActivityIndicator size="large" color={colors.blue()} style={{ flex: 1 }} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: user.profilePicture }} style={styles.avatar} />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.sub}>Member since {user.createdAt}</Text>
        <View style={styles.stats}>
          <Text style={styles.statText}>{posts.length} Posted</Text>
          <Text style={styles.statText}>{user.following} Following</Text>
          <Text style={styles.statText}>{user.followers} Followers</Text>
        </View>
        <TouchableOpacity style={styles.editButton} onPress={openActionSheet}>
          <Text style={styles.editText}>Edit Profile</Text>
        </TouchableOpacity>

      </View>

      <FlatList
        data={posts}
        numColumns={3}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.postList}
      />

      <ActionSheet ref={actionSheetRef}>
        ref={actionSheetRef}
        containerStyle={{
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
        }}
        indicatorStyle={{
          width: 100,
        }}
        defaultOverlayOpacity={0.3}
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 15,
          }}
          onPress={navigateEdit}
          >
          <Text
            style={{
              fontFamily: fontType['Pjs-Medium'],
              color: colors.black(),
              fontSize: 18,
            }}>
            Edit
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 15,
          }}
          onPress={handleDelete}>
          <Text
            style={{
              fontFamily: fontType['Pjs-Medium'],
              color: colors.black(),
              fontSize: 18,
            }}>
            Delete
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 15,
          }}
          onPress={closeActionSheet}>
          <Text
            style={{
              fontFamily: fontType['Pjs-Medium'],
              color: 'red',
              fontSize: 18,
            }}>
            Cancel
          </Text>
        </TouchableOpacity>

      </ActionSheet>
    </View>
  );
};

export default ProfileDetail;
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.black() },
  header: { alignItems: 'center', paddingVertical: 20 },
  avatar: { width: 100, height: 100, borderRadius: 50 },
  name: { fontSize: 18, fontFamily: fontType['Pjs-Bold'], color: 'white', marginTop: 8 },
  sub: { fontSize: 12, color: 'gray', marginBottom: 10 },
  stats: { flexDirection: 'row', gap: 20, marginVertical: 10 },
  statText: { color: 'white', fontSize: 12 },
  editButton: {
    backgroundColor: colors.orange(),
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  editText: { color: 'white', fontFamily: fontType['Pjs-Medium'] },
  postList: { padding: 10 },
  postImage: {
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: 10,
  },
  postContainer: {
  position: 'relative', // Memastikan elemen anak bisa diatur posisinya
  margin: 5,
},
menuButton: {
  position: 'absolute', // Posisi absolut agar di atas gambar
  top: 5,
  right: 5,
  backgroundColor: 'rgba(0, 0, 0, 0.6)', // Latar belakang transparan
  padding: 5,
  borderRadius: 20,
  zIndex: 10, // Pastikan di atas elemen lainnya
},
menuIcon: {
  color: 'white', // Warna ikon
  fontSize: 16,
  fontWeight: 'bold',
},

});
