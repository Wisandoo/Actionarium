import { ScrollView, StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { Setting, Edit } from 'iconsax-react-native';
import React from 'react';
import FastImage from '@d11/react-native-fast-image';
import { ProfileData,  PictureList } from '../../data';
import { fontType, colors } from '../../theme';
import {useNavigation} from '@react-navigation/native';

const formatNumber = number => {
  if (number >= 1_000_000_000) return (number / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
  if (number >= 1_000_000) return (number / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  if (number >= 1_000) return (number / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
  return number.toString();
};


const Profile = () => {
  const navigation = useNavigation();
    return (
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Setting color={colors.orange()} variant="Linear" size={24} />
        </View>
  
        <ScrollView contentContainerStyle={styles.scrollContainer}>
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
            {[
              { label: 'Posted', value: ProfileData.blogPosted },
              { label: 'Following', value: formatNumber(ProfileData.following) },
              { label: 'Follower', value: formatNumber(ProfileData.follower) }
            ].map((stat, index) => (
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
  
          {/* Blog Posts Grid */}
          <FlatList
            data={PictureList.slice(0, 12)}
            keyExtractor={(_, index) => index.toString()}
            numColumns={3}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            renderItem={({ item }) => (
              <View style={styles.imageContainer}>
                <FastImage
                  source={{ uri: item.image }}
                  style={styles.image}
                  resizeMode={FastImage.resizeMode.cover}
                />
              </View>
            )}
            contentContainerStyle={styles.blogSection}
          />
        </ScrollView>
        <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate('AddBlog')}>
        <Edit color={colors.white()} variant="Linear" size={20} />
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
    buttonEdit: { padding: 14, backgroundColor: colors.orange(), borderRadius: 10, alignItems: 'center' },
    buttonText: { fontSize: 14, color: colors.black(), fontFamily: fontType['Pjs-SemiBold'] },
    blogSection: { paddingTop: 15, paddingHorizontal: 5 },
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
  
