import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  ActionSheetIOS,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useBlog } from '../context/BlogContext';

const ProfileDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params;

  const { getBlogPost, deleteBlogPost } = useBlog();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const loadPost = async () => {
      const fetchedPost = await getBlogPost(id);
      setPost(fetchedPost);
    };
    loadPost();
  }, [id]);

  const handleOptions = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Cancel', 'Edit', 'Delete'],
        destructiveButtonIndex: 2,
        cancelButtonIndex: 0,
      },
      (buttonIndex) => {
        if (buttonIndex === 1) {
          navigation.navigate('EditProfileForm', { id }); // or EditBlogForm if shared
        } else if (buttonIndex === 2) {
          Alert.alert(
            'Delete Post',
            'Are you sure you want to delete this post?',
            [
              { text: 'Cancel', style: 'cancel' },
              {
                text: 'Delete',
                style: 'destructive',
                onPress: async () => {
                  await deleteBlogPost(id);
                  navigation.goBack();
                },
              },
            ]
          );
        }
      }
    );
  };

  if (!post) {
    return (
      <View style={styles.center}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: post.image }} style={styles.image} />
      <Text style={styles.name}>{post.title}</Text>
      <Text style={styles.description}>{post.content}</Text>

      <TouchableOpacity onPress={handleOptions} style={styles.optionsButton}>
        <Text style={styles.optionsText}>•••</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  optionsButton: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
  optionsText: {
    fontSize: 24,
    color: '#888',
  },
});

export default ProfileDetail;


// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: colors.black() },
//   header: { alignItems: 'center', paddingVertical: 20 },
//   avatar: { width: 100, height: 100, borderRadius: 50 },
//   name: { fontSize: 18, fontFamily: fontType['Pjs-Bold'], color: 'white', marginTop: 8 },
//   sub: { fontSize: 12, color: 'gray', marginBottom: 10 },
//   stats: { flexDirection: 'row', gap: 20, marginVertical: 10 },
//   statText: { color: 'white', fontSize: 12 },
//   editButton: {
//     backgroundColor: colors.orange(),
//     borderRadius: 10,
//     paddingVertical: 8,
//     paddingHorizontal: 20,
//     marginTop: 10,
//   },
//   editText: { color: 'white', fontFamily: fontType['Pjs-Medium'] },
//   postList: { padding: 10 },
//   postImage: {
//     width: 100,
//     height: 100,
//     margin: 5,
//     borderRadius: 10,
//   },
//   postContainer: {
//   position: 'relative', // Memastikan elemen anak bisa diatur posisinya
//   margin: 5,
// },
// menuButton: {
//   position: 'absolute', // Posisi absolut agar di atas gambar
//   top: 5,
//   right: 5,
//   backgroundColor: 'rgba(0, 0, 0, 0.6)', // Latar belakang transparan
//   padding: 5,
//   borderRadius: 20,
//   zIndex: 10, // Pastikan di atas elemen lainnya
// },
// menuIcon: {
//   color: 'white', // Warna ikon
//   fontSize: 16,
//   fontWeight: 'bold',
// },

// });
