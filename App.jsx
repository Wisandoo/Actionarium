import React from 'react';
import {ScrollView, StyleSheet,  Text, View, Image, ImageBackground, TextInput, Pressable} from 'react-native';
import {Element3, Clock, Message, SearchNormal, ArrowRight3, Eye, ArrowSquareRight, People} from 'iconsax-react-native';
import { fontType, colors } from './src/theme';


export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <People
                  size={35}
                  variant="Linear"
                  color="#FF8A65"
                />
        <Text style={styles.title}>ACTIONARIUM</Text>
        <Element3 color={colors.black()} variant="Center" size={24} />
      </View>
      <View style={styles.listCategory}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={{...category.item, marginLeft: 24}}>
            <Text style={{...category.title, color:"#ff5b5b"}}>
            Popular Figures
            </Text>
          </View>
          <View style={category.item}>
            <Text style={category.title}>Rare Figures</Text>
          </View>
          <View style={category.item}>
            <Text style={category.title}>New Releases</Text>
          </View>
          <View style={category.item}>
            <Text style={category.title}>Custom Builds </Text>
          </View>
          <View style={category.item}>
            <Text style={category.title}>Brands</Text>
          </View>
        </ScrollView>
      </View>
      <View style={searchBar.container}>
        <TextInput
            style={searchBar.input}
            placeholder="Search"
          />
          <Pressable style={searchBar.button}>
            <SearchNormal size={20} color={colors.white()} />
          </Pressable>
      </View>
      <ListBlog />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black(),
  },
  header: {
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    height:52,
    elevation: 8,
    paddingTop:8,
    paddingBottom:4
  },
  title: {
    fontSize: 20,
    fontFamily: fontType['Pjs-ExtraBold'],
    color: colors.white(),
  },
  listCategory: {
    paddingVertical: 10,
  },
  listBlog: {
    paddingVertical: 10,
    gap: 10,
  },
});
const category = StyleSheet.create({
  item: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: 'center',
    backgroundColor: colors.white(),
    marginHorizontal:5
  },
  title: {
    fontFamily: fontType['Pjs-SemiBold'],
    fontSize: 14,
    lineHeight: 18,
    color: colors.grey(),
  },
});
const searchBar = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    backgroundColor: colors.grey(0.03),
    borderColor: "#FF5F1F",
    borderRadius: 20,
    borderWidth: 1,
    flexDirection: 'row',
  },
  input: {
    color : colors.white(),
    height: 40,
    padding: 10,
    width: '90%',
  },
  button: {
    backgroundColor: colors.black(),
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 40,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
});
const ListBlog = () => {
  return (
    <ScrollView>
      <View style={styles.listBlog}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={{gap: 15}}>
          <View style={{...itemHorizontal.cardItem, marginLeft: 24}}>
            <ImageBackground
              style={itemHorizontal.cardImage}
              resizeMode="cover"
              imageStyle={{borderRadius: 15}}
              source={{
                uri: 'https://i.pinimg.com/736x/ca/5c/9f/ca5c9facb5904915ed6f26b5dd506d44.jpg',
              }}>
              <View style={itemHorizontal.cardContent}>
                <View style={itemHorizontal.cardInfo}>
                  <Text style={itemHorizontal.cardTitle}>
                  Top 10 Action Figures of 2025
                  </Text>
                  <Text style={itemHorizontal.cardText}>Jan 10, 2025</Text>
                </View>
                <View>
                  <View style={itemHorizontal.cardIcon}>
                    <ArrowSquareRight color= "#FF8A65" variant="Linear" size={20} />
                  </View>
                </View>
              </View>
            </ImageBackground>
          </View>
          <View style={itemHorizontal.cardItem}>
            <ImageBackground
              style={itemHorizontal.cardImage}
              resizeMode="cover"
              imageStyle={{borderRadius: 15}}
              source={{
                uri: 'https://i.pinimg.com/736x/49/6a/ea/496aea728a7b124bc72005058fe81644.jpg',
              }}>
              <View style={itemHorizontal.cardContent}>
                <View style={itemHorizontal.cardInfo}>
                  <Text style={itemHorizontal.cardTitle}>
                    Exploring the World of Action Figures
                  </Text>
                  <Text style={itemHorizontal.cardText}>Jan 10, 2025</Text>
                </View>
                <View>
                  <View style={itemHorizontal.cardIcon}>
                  <ArrowSquareRight color= "#FF8A65" variant="Linear" size={20} />
                  </View>
                </View>
              </View>
            </ImageBackground>
          </View>
          <View style={itemHorizontal.cardItem}>
            <ImageBackground
              style={itemHorizontal.cardImage}
              resizeMode="cover"
              imageStyle={{borderRadius: 15}}
              source={{
                uri: 'https://i.pinimg.com/736x/8d/9f/55/8d9f55ab2bc14b095e5f8deeed8f3fc0.jpg',
              }}>
              <View style={itemHorizontal.cardContent}>
                <View style={itemHorizontal.cardInfo}>
                  <Text style={itemHorizontal.cardTitle}>
                    Exploring The Fans Favourite
                  </Text>
                  <Text style={itemHorizontal.cardText}>Jan 10, 2025</Text>
                </View>
                <View>
                  <View style={itemHorizontal.cardIcon}>
                  <ArrowSquareRight color= "#FF8A65" variant="Linear" size={20} />
                  </View>
                </View>
              </View>
            </ImageBackground>
          </View>
          <View style={itemHorizontal.cardItem}>
            <ImageBackground
              style={itemHorizontal.cardImage}
              resizeMode="cover"
              imageStyle={{borderRadius: 15}}
              source={{
                uri: 'https://i.pinimg.com/736x/8b/05/86/8b0586193a7c9379a3063bae39c20d08.jpg',
              }}>
              <View style={itemHorizontal.cardContent}>
                <View style={itemHorizontal.cardInfo}>
                  <Text style={itemHorizontal.cardTitle}>
                  "Action Figures 101: Mastering the Art of Collecting"
                  </Text>
                  <Text style={itemHorizontal.cardText}>Jan 10, 2025</Text>
                </View>
                <View>
                  <View style={itemHorizontal.cardIcon}>
                    <ArrowSquareRight color= "#FF8A65" variant="Linear" size={20} />
                  </View>
                </View>
              </View>
            </ImageBackground>
          </View>
          <View style={{...itemHorizontal.cardItem, marginRight: 24}}>
            <ImageBackground
              style={itemHorizontal.cardImage}
              resizeMode="cover"
              imageStyle={{borderRadius: 15}}
              source={{
                uri: 'https://i.pinimg.com/736x/8b/32/c7/8b32c71a82c88295adb66e5622fd4fa9.jpg',
              }}>
              <View style={itemHorizontal.cardContent}>
                <View style={itemHorizontal.cardInfo}>
                  <Text style={itemHorizontal.cardTitle}>
                  "Reviving Action Figures: The Comeback of Classic Collectibles"
                  </Text>
                  <Text style={itemHorizontal.cardText}>Jan 10, 2025</Text>
                </View>
                <View>
                  <View style={itemHorizontal.cardIcon}>
                    <ArrowSquareRight color= "#FF8A65" variant="Linear" size={20} />
                  </View>
                </View>
              </View>
            </ImageBackground>
          </View>
        </ScrollView>
        <View style={itemVertical.listCard}>
          <View style={itemVertical.cardItem}>
            <Image
              style={itemVertical.cardImage}
              source={{
                uri: 'https://i.pinimg.com/736x/70/52/1d/70521ddc7e8f2ab3b21fb6a2e61d1fa4.jpg',
              }}
            />
            <View style={itemVertical.cardContent}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={{gap: 5, width: '70%'}}>
                  <Text style={itemVertical.cardCategory}>Action Figures </Text>
                  <Text style={itemVertical.cardTitle}>
                  Tips for Displaying and Storing Your Collectibles
                  </Text>
                </View>
                <ArrowRight3
                  color="#FF8A65"
                  variant="Linear"
                  size={20}
                />
              </View>
              <View style={itemVertical.cardInfo}>
                <Clock
                  size={10}
                  variant="Linear"
                  color="#FF8A65"
                />
                <Text style={itemVertical.cardText}>Jan 25, 2025</Text>
                <Message
                  size={10}
                  variant="Linear"
                  color={colors.grey(0.6)}
                />
                <Text style={itemVertical.cardText}>89</Text>
              </View>
            </View>
          </View>
          <View style={itemVertical.cardItem}>
            <Image
              style={itemVertical.cardImage}
              source={{
                uri: 'https://i.pinimg.com/736x/cf/f0/75/cff075b0e466a2be9b7e361c2ddf9c16.jpg',
              }}
            />
            <View style={itemVertical.cardContent}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={{gap: 5, width: '70%'}}>
                  <Text style={itemVertical.cardCategory}>Action Figures</Text>
                  <Text style={itemVertical.cardTitle}>
                  A Guide to Customizing Your Favorite Collectibles
                  </Text>
                </View>
                 <ArrowRight3
                  color="#FF8A65"
                  variant="Linear"
                  size={20}
                />
              </View>
              <View style={itemVertical.cardInfo}>
                 <Clock
                  size={10}
                  variant="Linear"
                  color="#FF8A65"
                />
                <Text style={itemVertical.cardText}>Feb 25, 2025</Text>
                <Eye
                  size={10}
                  variant="Linear"
                  color="#FF8A65"
                />
                <Text style={itemVertical.cardText}>100</Text>
              </View>
            </View>
          </View>
          <View style={itemVertical.cardItem}>
            <Image
              style={itemVertical.cardImage}
              source={{
                uri: 'https://i.pinimg.com/736x/58/4f/23/584f2318d1696bb5acd6a07aac6bef32.jpg',
              }}
            />
            <View style={itemVertical.cardContent}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={{gap: 5, width: '70%'}}>
                  <Text style={itemVertical.cardCategory}>Rare Figures</Text>
                  <Text style={itemVertical.cardTitle}>
                    Checks Out the Rarest Action Figure on Display
                  </Text>
                </View>
                 <ArrowRight3
                  color="#FF8A65"
                  variant="Linear"
                  size={20}
                />
              </View>
              <View style={itemVertical.cardInfo}>
                 <Clock
                  size={10}
                  variant="Linear"
                  color="#FF8A65"
                />
                <Text style={itemVertical.cardText}>Feb 25, 2025</Text>
                <Eye
                  size={10}
                  variant="Linear"
                  color="#FF8A65"
                />
                <Text style={itemVertical.cardText}>150</Text>
              </View>
            </View>
          </View>
          <View style={itemVertical.cardItem}>
            <Image
              style={itemVertical.cardImage}
              source={{
                uri: 'https://i.pinimg.com/736x/15/85/ac/1585acd4abf298cdfc22ca5179a135bd.jpg',
              }}
            />
            <View style={itemVertical.cardContent}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={{gap: 5, width: '70%'}}>
                  <Text style={itemVertical.cardCategory}>Action Figures</Text>
                  <Text style={itemVertical.cardTitle}>The Rise of Collectible Action Figure Culture</Text>
                </View>
                 <ArrowRight3
                  color="#FF8A65"
                  variant="Linear"
                  size={20}
                />
              </View>
              <View style={itemVertical.cardInfo}>
                 <Clock
                  size={10}
                  variant="Linear"
                  color="#FF8A65"
                />
                <Text style={itemVertical.cardText}>Feb 25, 2025</Text>
                <Eye
                  size={10}
                  variant="Linear"
                  color="#FF8A65"
                />
                <Text style={itemVertical.cardText}>111</Text>
              </View>
            </View>
          </View>
          <View style={itemVertical.cardItem}>
            <Image
              style={itemVertical.cardImage}
              source={{
                uri: 'https://i.pinimg.com/736x/4c/f9/2c/4cf92ca00abe4eba764bc233bd07f63f.jpg',
              }}
            />
            <View style={itemVertical.cardContent}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={{gap: 5, width: '70%'}}>
                  <Text style={itemVertical.cardCategory}>New Release</Text>
                  <Text style={itemVertical.cardTitle}>
                    The Best Action Figures New Releases of 2025
                  </Text>
                </View>
                 <ArrowRight3
                  color="#FF8A65"
                  variant="Linear"
                  size={20}
                />
              </View>
              <View style={itemVertical.cardInfo}>
                 <Clock
                  size={10}
                  variant="Linear"
                  color="#FF8A65"
                />
                <Text style={itemVertical.cardText}>Feb 25, 2025</Text>
                <Eye
                  size={10}
                  variant="Linear"
                  color="#FF8A65"
                />
                <Text style={itemVertical.cardText}>125</Text>
              </View>
            </View>
          </View>
          <View style={itemVertical.cardItem}>
            <Image
              style={itemVertical.cardImage}
              source={{
                uri: 'https://i.pinimg.com/736x/01/17/21/0117214c93a596f41a2c52a0de755ad5.jpg',
              }}
            />
            <View style={itemVertical.cardContent}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={{gap: 5, width: '70%'}}>
                  <Text style={itemVertical.cardCategory}>Custom Builds</Text>
                  <Text style={itemVertical.cardTitle}>
                    Top 10 Best Custom Builds of 2025
                  </Text>
                </View>
                 <ArrowRight3
                  color="#FF8A65"
                  variant="Linear"
                  size={20}
                />
              </View>
              <View style={itemVertical.cardInfo}>
                 <Clock
                  size={10}
                  variant="Linear"
                  color="#FF8A65"
                />
                <Text style={itemVertical.cardText}>Feb 25, 2025</Text>
                <Eye
                  size={10}
                  variant="Linear"
                  color="#FF8A65"
                />
                <Text style={itemVertical.cardText}>99</Text>
              </View>
            </View>
          </View>
          <View style={itemVertical.cardItem}>
            <Image
              style={itemVertical.cardImage}
              source={{
                uri: 'https://upload.wikimedia.org/wikipedia/it/6/6d/Logo_Revoltech.jpg',
              }}
            />
            <View style={itemVertical.cardContent}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={{gap: 5, width: '70%'}}>
                  <Text style={itemVertical.cardCategory}>Brands</Text>
                  <Text style={itemVertical.cardTitle}>
                    Top 10 Action Figures Best Brands of 2025
                  </Text>
                </View>
                 <ArrowRight3
                  color="#FF8A65"
                  variant="Linear"
                  size={20}
                />
              </View>
              <View style={itemVertical.cardInfo}>
                 <Clock
                  size={10}
                  variant="Linear"
                  color="#FF8A65"
                />
                <Text style={itemVertical.cardText}>Feb 25, 2025</Text>
                <Message
                  size={10}
                  variant="Linear"
                  color={colors.grey(0.6)}
                />
                <Text style={itemVertical.cardText}>89</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
const itemVertical = StyleSheet.create({
  listCard: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    gap: 15,
  },
  cardItem: {
    backgroundColor: colors.blue(0.03),
    flexDirection: 'row',
    borderRadius: 10,
  },
  cardCategory: {
    color: "#E43C38",
    fontSize: 10,
    fontFamily: fontType['Pjs-SemiBold'],
  },
  cardTitle: {
    fontSize: 14,
    fontFamily: fontType['Pjs-Bold'],
    color: colors.white(),
  },
  cardText: {
    fontSize: 10,
    fontFamily: fontType['Pjs-Medium'],
    color: "#ff0303",
  },
  cardImage: {
    width: 94,
    height: 94,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  cardInfo: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  cardContent: {
    gap: 10,
    justifyContent: 'space-between',
    paddingRight: 10,
    paddingLeft: 15,
    flex: 1,
    paddingVertical: 10,
  },
});
const itemHorizontal = StyleSheet.create({
  cardItem: {
    width: 280,
  },
  cardImage: {
    width: '100%',
    alignContent: 'flex-start',
    height: 200,
    borderRadius: 5,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  cardInfo: {
    justifyContent: 'flex-end',
    height: '100%',
    gap: 10,
    maxWidth: '60%',
  },
  cardTitle: {
    fontFamily: fontType['Pjs-Bold'],
    fontSize: 14,
    color: colors.white(),
  },
  cardText: {
    fontSize: 10,
    color: colors.white(),
    fontFamily: fontType['Pjs-Medium'],
  },
  cardIcon: {
    borderWidth: 0.5,
    borderRadius: 5,
  },
});