import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, Image} from 'react-native';
import {ArrowLeft} from 'iconsax-react-native';
import {useNavigation} from '@react-navigation/native';
import {fontType, colors} from '../../theme';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';

const CreateBlog = () => {
  const navigation = useNavigation();
  const dataCategory = [
    { id: 1, name: 'Popular Figures' },
    { id: 2, name: 'Rare Figures' },
    { id: 3, name: 'New Releases' },
    { id: 4, name: 'Custom Build' },
    { id: 5, name: 'Brands' },
  ];

  const [blogData, setBlogData] = useState({
    title: '',
    content: '',
    category: {},
  });

  const [image, setImage] = useState(null);

  const handleChange = (key, value) => {
    setBlogData({
      ...blogData,
      [key]: value,
    });
  };

  const handleImagePick = async () => {
    try {
      const pickedImage = await ImagePicker.openPicker({
        width: 1920,
        height: 1080,
        cropping: true,
      });
      console.log(pickedImage);
      setImage(pickedImage.path);
    } catch (error) {
      console.log('Image pick cancelled or failed:', error);
    }
  };

  const handleUpload = async () => {
    if (!blogData.title || !blogData.content || !blogData.category.name || !image) {
      Alert.alert('Validation Error', 'Please fill out all fields.');
      return;
    }

    try {
        await axios.post('https://682c9fb14fae188947534d0a.mockapi.io/api/Post', {
      title: blogData.title,
      image: image,
      caption: blogData.content,
      tag: blogData.category.name,
      createdAt: new Date().toISOString()
    }).then(response => {
      navigation.goBack();
      Alert.alert('Success','Post uploaded successfully!');
    });

    } catch (error) {
      console.error('Upload failed:', error);
      Alert.alert('Upload Failed', 'There was an error uploading your post.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft color={colors.black()} variant="Linear" size={24} />
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={styles.title}>New Post</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 10, gap: 10 }}>

        <View style={textInput.borderDashed}>
          <TextInput
            placeholder="Title"
            value={blogData.title}
            onChangeText={text => handleChange('title', text)}
            placeholderTextColor={colors.white(0.6)}
            multiline
            style={textInput.title}
          />
        </View>

        <TouchableOpacity onPress={handleImagePick} style={{ alignItems: 'center', marginBottom: 20 }}>
          <View style={{
            width: 300,
            height: 300,
            backgroundColor: colors.white(0.1),
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
          }}>
            {image ? (
              <Image
                source={{ uri: image }}
                style={{ width: '100%', height: '100%' }}
                resizeMode="cover"
              />
            ) : (
              <Text style={{ color: colors.white(0.6), fontSize: 12 }}>
                Tap to upload image
              </Text>
            )}
          </View>
        </TouchableOpacity>

        <View style={[textInput.borderDashed, { minHeight: 100, borderRadius: 10 }]}>
          <TextInput
            placeholder="Write a caption..."
            value={blogData.content}
            onChangeText={text => handleChange('content', text)}
            placeholderTextColor={colors.white(0.6)}
            multiline
            style={[textInput.content, { fontSize: 14 }]}
          />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10 }}>
          {dataCategory.map((item, index) => {
            const isSelected = item.id === blogData.category.id;
            return (
              <TouchableOpacity
                key={index}
                onPress={() => handleChange('category', { id: item.id, name: item.name })}
                style={[category.item, { backgroundColor: isSelected ? colors.red() : colors.white(0.08) }]}
              >
                <Text style={[category.name, { color: isSelected ? colors.black() : colors.white() }]}>{item.name}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.button} onPress={handleUpload}>
          <Text style={styles.buttonLabel}>Upload</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreateBlog;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.black() },
  header: {
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    height: 75,
    elevation: 10,
    paddingTop: 18,
    paddingBottom: 4,
  },
  title: {
    fontFamily: fontType['Pjs-Bold'],
    fontSize: 25,
    color: colors.white(),
  },
  bottomBar: {
    backgroundColor: colors.red(),
    alignItems: 'flex-end',
    paddingHorizontal: 24,
    paddingVertical: 10,
    shadowColor: colors.black(),
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: colors.white(),
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonLabel: {
    fontSize: 14,
    fontFamily: fontType['Pjs-SemiBold'],
    color: colors.black(),
  },
});

const textInput = StyleSheet.create({
  borderDashed: {
    borderStyle: 'dashed',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    borderColor: colors.white(0.6),
  },
  title: {
    fontSize: 16,
    fontFamily: fontType['Pjs-SemiBold'],
    color: colors.white(),
    padding: 0,
  },
  content: {
    fontSize: 12,
    fontFamily: fontType['Pjs-Regular'],
    color: colors.white(),
    padding: 0,
  },
});

const category = StyleSheet.create({
  item: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 25,
  },
  name: {
    fontSize: 10,
    fontFamily: fontType['Pjs-Medium'],
  },
});
