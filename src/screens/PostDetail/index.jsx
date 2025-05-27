import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  ActivityIndicator,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FastImage from '@d11/react-native-fast-image';
import { ArrowLeft, Like1, Receipt21, Message, Share } from 'iconsax-react-native';
import ActionSheet from 'react-native-actions-sheet';
import { colors, fontType } from '../../theme';
import axios from 'axios';
import { doc, getFirestore, onSnapshot,  deleteDoc } from '@react-native-firebase/firestore';

const PostDetail = ({ route }) => {
  const { postId } = route.params;
  const navigation = useNavigation();

  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [iconStates, setIconStates] = useState({
    liked: { variant: 'Linear', color: colors.grey(0.6) },
    bookmarked: { variant: 'Linear', color: colors.grey(0.6) },
  });

  const actionSheetRef = useRef(null);

  const openActionSheet = () => actionSheetRef.current?.show();
  const closeActionSheet = () => actionSheetRef.current?.hide();

 useEffect(() => {
  const db = getFirestore();
  const postRef = doc(db, 'blog', postId);

  const unsub = onSnapshot(postRef, (snapshot) => {
    const postData = snapshot.data();
    if (postData) {
      setSelectedPost(postData);
    } else {
      // Cegah alert jika memang kita sedang menghapus
      if (!deletingRef.current) {
        Alert.alert('Error', 'Post not found.');
        navigation.goBack();
      }
    }
    setLoading(false);
  });

  return () => unsub();
}, [postId]);


  const navigateEdit = () => {
    closeActionSheet();
    navigation.navigate('EditPost', { postId });
  };

  const deletingRef = useRef(false);

  const handleDelete = async () => {
  closeActionSheet();
  setLoading(true);
  deletingRef.current = true;
  try {
    const db = getFirestore();
    const blogRef = doc(db, 'blog', postId);
    await blogRef.delete();

    // Optional: delete from image backend
    if (selectedPost?.image) {
      await fetch(`https://backend-file-praktikum.vercel.app/delete/${selectedPost.image}`, {
        method: 'POST',
      });
    }

    console.log('Post deleted!');
    
    Alert.alert('Success', 'Post deleted successfully.');
    navigation.goBack();
  } catch (error) {
    console.error('Delete error:', error);
    Alert.alert('Error', 'Failed to delete the post.');
  } finally {
    setLoading(false);
    deletingRef.current = false;
  }
};


  const scrollY = useRef(new Animated.Value(0)).current;
  const diffClampY = Animated.diffClamp(scrollY, 0, 52);
  const headerY = diffClampY.interpolate({
    inputRange: [0, 52],
    outputRange: [0, -52],
  });
  const bottomBarY = diffClampY.interpolate({
    inputRange: [0, 52],
    outputRange: [0, 52],
  });

  const toggleIcon = (iconName) => {
    setIconStates((prev) => ({
      ...prev,
      [iconName]: {
        variant: prev[iconName].variant === 'Linear' ? 'Bold' : 'Linear',
        color: prev[iconName].variant === 'Linear' ? colors.blue() : colors.grey(0.6),
      },
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.header, { transform: [{ translateY: headerY }] }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft color={colors.white(0.6)} variant="Linear" size={24} />
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', gap: 20 }}>
          <Share color={colors.white()} variant="Linear" size={24} />
          <TouchableOpacity onPress={openActionSheet}>
            <Text>Edit</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.blue()} />
        </View>
      ) : (
        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
          contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 62, paddingBottom: 54 }}
        >
          <FastImage
            style={styles.image}
            source={{ uri: selectedPost?.image }}
            resizeMode={FastImage.resizeMode.cover}
          />
          <View style={{ marginTop: 15 }}>
            <Text style={styles.caption}>{selectedPost?.caption || 'No caption provided.'}</Text>
            {selectedPost?.tags?.length > 0 && (
              <View style={styles.tagContainer}>
                {selectedPost.tags.map((tag, index) => (
                  <View key={index} style={styles.tag}>
                    <Text style={styles.tagText}>#{tag}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </Animated.ScrollView>
      )}

      <Animated.View style={[styles.bottomBar, { transform: [{ translateY: bottomBarY }] }]}>
        <TouchableOpacity onPress={() => toggleIcon('liked')}>
          <Like1 color={iconStates.liked.color} variant={iconStates.liked.variant} size={24} />
        </TouchableOpacity>
        <Text style={styles.info}>100 Likes</Text>
        <TouchableOpacity>
          <Message color={colors.grey(0.6)} variant="Linear" size={24} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleIcon('bookmarked')}>
          <Receipt21 color={iconStates.bookmarked.color} variant={iconStates.bookmarked.variant} size={24} />
        </TouchableOpacity>
      </Animated.View>

      <ActionSheet
        ref={actionSheetRef}
        containerStyle={{ borderTopLeftRadius: 25, borderTopRightRadius: 25 }}
        indicatorStyle={{ width: 100 }}
        gestureEnabled={true}
        defaultOverlayOpacity={0.3}
      >
        <TouchableOpacity style={styles.actionButton} onPress={navigateEdit}>
          <Text style={styles.actionText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={handleDelete}>
          <Text style={[styles.actionText, { color: 'red' }]}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={closeActionSheet}>
          <Text style={[styles.actionText, { color: 'grey' }]}>Cancel</Text>
        </TouchableOpacity>
      </ActionSheet>
    </SafeAreaView>
  );
};

export default PostDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black(),
  },
  header: {
    position: 'absolute',
    top: 5,
    left: 0,
    right: 0,
    height: 55,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    backgroundColor: colors.orange(),
    zIndex: 1000,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    top: 15,
    width: '100%',
    height: 400,
    borderRadius: 15,
  },
  caption: {
    top: 15,
    fontSize: 16,
    color: colors.orange(),
    fontFamily: fontType['Pjs-Regular'],
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  tag: {
    backgroundColor: colors.grey(0.2),
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 5,
  },
  tagText: {
    fontSize: 12,
    color: colors.white(),
    fontFamily: fontType['Pjs-Regular'],
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    backgroundColor: colors.black(),
  },
  info: {
    fontSize: 14,
    color: colors.grey(0.6),
    fontFamily: fontType['Pjs-Regular'],
  },
  actionButton: {
    padding: 15,
    alignItems: 'center',
  },
  actionText: {
    fontSize: 16,
    fontFamily: fontType['Pjs-Medium'],
    color: colors.black(),
  },
});
