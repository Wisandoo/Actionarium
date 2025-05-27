import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator} from 'react-native';
import FastImage from '@d11/react-native-fast-image';
import {ArrowLeft, AddSquare, Add} from 'iconsax-react-native';
import {useNavigation} from '@react-navigation/native';
import {fontType, colors} from '../../theme';
import ImagePicker from 'react-native-image-crop-picker';
import {addDoc, collection, getFirestore} from '@react-native-firebase/firestore';

const CreateBlog = () => {
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

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
    totalLikes: 0,
    totalComments: 0,
  });

  const handleChange = (key, value) => {
    setBlogData(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleImagePick = async () => {
    ImagePicker.openPicker({
      width: 1920,
      height: 1080,
      cropping: true,
    })
      .then(image => {
        setImage(image.path);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleUpload = async () => {
    let filename = image.substring(image.lastIndexOf('/') + 1);
    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;

    setLoading(true);
    try {
      const imageFormData = new FormData();
      imageFormData.append('file', {
        uri: image,
        type: `image/${extension}`,
        name: filename,
      });

      const result = await fetch('https://backend-file-praktikum.vercel.app/upload/', {
        method: 'POST',
        body: imageFormData,
      });

      if (result.status !== 200) {
        throw new Error('Failed to upload image');
      }

      const {url} = await result.json();

      const db = getFirestore();
      const blogRef = collection(db, 'blog');

      await addDoc(blogRef, {
        title: blogData.title,
        content: blogData.content,
        category: blogData.category,
        totalLikes: blogData.totalLikes,
        totalComments: blogData.totalComments,
        image: url,
        createdAt: new Date(),
      });

      setLoading(false);
      navigation.goBack();
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft color={colors.black()} variant="Linear" size={24} />
        </TouchableOpacity>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text style={styles.title}>Write blog</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{paddingHorizontal: 24, paddingVertical: 10, gap: 10}}>
        <View style={textInput.borderDashed}>
          <TextInput
            placeholder="Title"
            value={blogData.title}
            onChangeText={text => handleChange('title', text)}
            placeholderTextColor={colors.grey(0.6)}
            multiline
            style={textInput.title}
          />
        </View>

        <View style={[textInput.borderDashed, {minHeight: 250}]}>
          <TextInput
            placeholder="Content"
            value={blogData.content}
            onChangeText={text => handleChange('content', text)}
            placeholderTextColor={colors.grey(0.6)}
            multiline
            style={textInput.content}
          />
        </View>

        <View style={textInput.borderDashed}>
          <Text style={category.title}>Category</Text>
          <View style={category.container}>
            {dataCategory.map((item, index) => {
              const isSelected = item.id === blogData.category.id;
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleChange('category', item)}
                  style={[category.item, {backgroundColor: isSelected ? colors.black() : colors.grey(0.08)}]}>
                  <Text style={[category.name, {color: isSelected ? colors.white() : colors.grey()}]}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {image ? (
          <View style={{position: 'relative'}}>
            <FastImage
              style={{width: '100%', height: 127, borderRadius: 5}}
              source={{uri: image}}
              resizeMode={FastImage.resizeMode.cover}
            />
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: -5,
                right: -5,
                backgroundColor: colors.blue(),
                borderRadius: 25,
              }}
              onPress={() => setImage(null)}>
              <Add size={20} variant="Linear" color={colors.white()} style={{transform: [{rotate: '45deg'}]}} />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity onPress={handleImagePick}>
            <View style={[textInput.borderDashed, {
              gap: 10,
              paddingVertical: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }]}>
              <AddSquare color={colors.grey(0.6)} variant="Linear" size={42} />
              <Text style={{
                fontFamily: fontType['Pjs-Regular'],
                fontSize: 12,
                color: colors.grey(0.6),
              }}>
                Upload Thumbnail
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.button} onPress={handleUpload}>
          <Text style={styles.buttonLabel}>Upload</Text>
        </TouchableOpacity>
      </View>

      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={colors.blue()} />
        </View>
      )}
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
  loadingOverlay: {
    flex: 1,
    backgroundColor: colors.black(0.4),
    justifyContent: 'center',
    alignItems: 'center',
},
  buttonLabel: {
    fontSize: 14,
    fontFamily: fontType['Pjs-SemiBold'],
    color: colors.black(),
  }
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
