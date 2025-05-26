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
import { useRoute, useNavigation } from '@react-navigation/native';
import FastImage from '@d11/react-native-fast-image';
import { ArrowLeft, Like1, Receipt21, Message, Share } from 'iconsax-react-native';
import ActionSheet from 'react-native-actions-sheet';
import { colors, fontType } from '../../theme';
import axios from 'axios';

const PostDetail = ({route}) => {
  const navigation = useNavigation();
  const { image, caption, tags, postId } = route.params;

  const [iconStates, setIconStates] = useState({
    liked: { variant: 'Linear', color: colors.grey(0.6) },
    bookmarked: { variant: 'Linear', color: colors.grey(0.6) },
  });
  const [loading, setLoading] = useState(false); // Untuk indikator loading saat delete
  const actionSheetRef = useRef(null);

  const openActionSheet = () => actionSheetRef.current?.show();
  const closeActionSheet = () => actionSheetRef.current?.hide();

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
    setIconStates((prevStates) => ({
      ...prevStates,
      [iconName]: {
        variant: prevStates[iconName].variant === 'Linear' ? 'Bold' : 'Linear',
        color:
          prevStates[iconName].variant === 'Linear'
            ? colors.blue()
            : colors.grey(0.6),
      },
    }));
  };

   const handleDelete = async () => {
  closeActionSheet(); // Menutup Action Sheet
  setLoading(true); // Menampilkan loading spinner

  try {
    // Menghapus data berdasarkan ActionariumId dari MockAPI
    // console.log(postId);
    const response = await axios.delete(`https://682c9fb14fae188947534d0a.mockapi.io/api/Post/${postId}`);

    // if (!response.ok) {
    //   throw new Error('Failed to delete the post.');
    // }

    // Navigasi kembali setelah penghapusan
    navigation.goBack();
    Alert.alert('Success', 'Post has been deleted.');
  } catch (error) {
    console.error(error);
    Alert.alert('Error', 'Failed to delete the post.');
  } finally {
    setLoading(false); // Menghentikan loading spinner
  }
};


  return (
    <SafeAreaView style={styles.container}>
      {/* Animated Header */}
      <Animated.View
        style={[styles.header, { transform: [{ translateY: headerY }] }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft color={colors.grey(0.6)} variant="Linear" size={24} />
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', gap: 20 }}>
          <Share color={colors.grey(0.6)} variant="Linear" size={24} />
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
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingTop: 62,
            paddingBottom: 54,
          }}>
          <FastImage
            style={styles.image}
            source={{ uri: image }}
            resizeMode={FastImage.resizeMode.cover}
          />
          <View style={{ marginTop: 15 }}>
            <Text style={styles.caption}>
              {caption || 'No caption provided.'}
            </Text>
            {tags?.length > 0 && (
              <View style={styles.tagContainer}>
                {tags.map((tag, index) => (
                  <View key={index} style={styles.tag}>
                    <Text style={styles.tagText}>#{tag}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </Animated.ScrollView>
      )}

      {/* Bottom Bar */}
      <Animated.View
        style={[styles.bottomBar, { transform: [{ translateY: bottomBarY }] }]}>
        <TouchableOpacity onPress={() => toggleIcon('liked')}>
          <Like1
            color={iconStates.liked.color}
            variant={iconStates.liked.variant}
            size={24}
          />
        </TouchableOpacity>
        <Text style={styles.info}>100 Likes</Text>
        <TouchableOpacity>
          <Message color={colors.grey(0.6)} variant="Linear" size={24} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleIcon('bookmarked')}>
          <Receipt21
            color={iconStates.bookmarked.color}
            variant={iconStates.bookmarked.variant}
            size={24}
          />
        </TouchableOpacity>
      </Animated.View>

      {/* Action Sheet */}
      <ActionSheet
        ref={actionSheetRef}
        containerStyle={{
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
        }}
        indicatorStyle={{ width: 100 }}
        gestureEnabled={true}
        defaultOverlayOpacity={0.3}>
        <TouchableOpacity style={styles.actionButton} onPress={() => {}}>
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
    backgroundColor: colors.white(),
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 52,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    backgroundColor: colors.white(),
    zIndex: 1000,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 400,
    borderRadius: 15,
  },
  caption: {
    fontSize: 16,
    color: colors.black(),
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
    backgroundColor: colors.white(),
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
