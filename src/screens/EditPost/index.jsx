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
import { getFirestore, doc, getDoc, deleteDoc } from '@react-native-firebase/firestore';

const ProfileDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params;

  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const db = getFirestore();
        const docRef = doc(db, 'blog', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPost({ id: docSnap.id, ...docSnap.data() });
        } else {
          Alert.alert('Error', 'Post not found.');
          navigation.goBack();
        }
      } catch (error) {
        console.error('Error fetching post:', error);
        Alert.alert('Error', 'Failed to load post.');
      }
    };

    fetchPost();
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
          navigation.navigate('EditProfileForm', { id });
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
                  try {
                    const db = getFirestore();
                    await deleteDoc(doc(db, 'blog', id));
                    Alert.alert('Success', 'Post deleted!');
                    navigation.goBack();
                  } catch (error) {
                    console.error('Error deleting post:', error);
                    Alert.alert('Error', 'Failed to delete post.');
                  }
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
