import { View, Text, Platform, ScrollView, Image, Linking } from "react-native";
import * as Device from "expo-device";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  useIsFocused,
  useNavigation,
  useTheme,
} from "@react-navigation/native";
import { moderateScale } from "react-native-size-matters";
import styles from "./HomeTabStyles";
import { Feather, MaterialIcons } from "react-native-vector-icons";
import HomeIcon from "../../../assets/Icons/home.svg";
import FoodIcon from "../../../assets/Icons/food.svg";
import CosmeticsIcon from "../../../assets/Icons/cosmetics.svg";
import ChildrenIcon from "../../../assets/Icons/children.svg";
import AdultsIcon from "../../../assets/Icons/adults.svg";
import MedicineIcon from "../../../assets/Icons/medicine.svg";
import RecommendationCard from "../../components/Card/RecommendationCard/RecommendationCard";
import Carousel, { Pagination } from "react-native-x-carousel";
import { webUrl } from "../../../config/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProductFilterCard from "../../components/Card/ProductFilterCard/ProductFilterCard";
import ActionProductCard from "../../components/Card/ActionProductCard/ActionProductCard";
import {
  getOnSaleProducts,
  getProducts,
  getRecommendProducts,
} from "../../services/products";
import { useQuery } from "react-query";
import ActivityScreen from "../ActivityScreen/ActivityScreen";
import { useSelector } from "react-redux";
import { addStatistic } from "../../services/stats";

const HomeTab = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [deviceType, setDeviceType] = useState(1);
  const { logStatistics, deviceId } = useSelector((state) => state.stats);
  const [favorites, setFavorites] = useState([]);

  const { data: allProducts, isLoading: gettingAllProducts } = useQuery({
    queryKey: "allProducts",
    queryFn: () => getProducts(),
    cacheTime: 1000 * 60 * 300,
    onError: (error) => {
      throw error;
    },
  });

  const { data: topProducts, isLoading: gettingRecommendProducts } = useQuery({
    queryKey: "recommendProducts",
    queryFn: () => getRecommendProducts(),
    cacheTime: 1000 * 60 * 300,
    onError: (error) => {
      throw error;
    },
  });

  const { data: actionProducts, isLoading: gettingAcionProducts } = useQuery({
    queryKey: "actionProducts",
    queryFn: () => getOnSaleProducts(),
    cacheTime: 1000 * 60 * 300,
    onError: (error) => {
      throw error;
    },
  });

  const handleSite = async (url) => {
    // const supported = await Linking.canOpenURL(url);

    // if (supported) {
    //   await Linking.openURL(url);
    // } else {
    //   Alert.alert(`${t("error_opening_site")} ${url}`);
    // }
    Linking.openURL(url).catch((err) =>
      console.error("An error occurred", err)
    );
  };

  const [recommendations, setRecommendations] = useState([
    {
      label: t("children"),
      key: t("children"),
      icon: <ChildrenIcon />,
      onPress: () => {
        navigation.navigate("Home Recommendations", {
          screen: "Home Recommendations",
          state: {
            filterBy: t("children"),
          },
        });
      },
    },
    {
      label: t("cosmetics"),
      key: t("cosmetics"),
      icon: <CosmeticsIcon />,
      onPress: () => {
        navigation.navigate("Home Recommendations", {
          screen: "Home Recommendations",
          state: {
            filterBy: t("cosmetics"),
          },
        });
      },
    },
    {
      label: t("adults"),
      key: t("adults"),
      icon: <AdultsIcon />,
      onPress: () => {
        navigation.navigate("Home Recommendations", {
          screen: "Home Recommendations",
          state: {
            filterBy: t("adults"),
          },
        });
      },
    },
    {
      label: t("supplementation"),
      key: t("supplementation"),
      icon: <MedicineIcon />,
      onPress: () => {
        navigation.navigate("Home Recommendations", {
          screen: "Home Recommendations",
          state: {
            filterBy: t("supplementation"),
          },
        });
      },
    },
    {
      label: t("house_products"),
      key: t("house_products"),
      icon: <HomeIcon />,
      onPress: () => {
        navigation.navigate("Home Recommendations", {
          screen: "Home Recommendations",
          state: {
            filterBy: t("house_products"),
          },
        });
      },
    },
    {
      label: t("food"),
      key: t("food"),
      icon: <FoodIcon />,
      onPress: () => {
        navigation.navigate("Home Recommendations", {
          screen: "Home Recommendations",
          state: {
            filterBy: t("food"),
          },
        });
      },
    },
    // {
    //   label: t("favorite"),
    //   key: t("favorite"),
    //   icon: <MaterialIcons size={60} name="favorite" color={colors.primary} />,
    //   onPress: () => {
    //     navigation.navigate("Home Recommendations", {
    //       screen: "Home Recommendations",
    //     });
    //   },
    // },
  ]);
  const renderItem = (data) => {
    const dataImage = allProducts?.find(
      (product) => product?.id === data?.id
    )?.imageURL;
    return (
      <View
        key={data?.id}
        style={[
          styles.carouselWrapper,
          { height: deviceType === 1 ? 200 : 300 },
        ]}
      >
        <RecommendationCard
          imageUrl={webUrl.prod + data?.imageURL}
          title={data?.name}
          text={data?.description}
          onPress={() => {
            if (logStatistics) {
              addStatistic({
                product_id: data?.id,
                unique_id: deviceId,
                component: 1,
                extra: "",
                user_id: "null",
              });
            }
            navigation.navigate("Home Product", {
              screen: "Home Product",
              state: {
                product: data,
                productId: data?.id,
                productImage: webUrl.prod + dataImage,
                productTitle: data?.orig_name,
                productDescription: data?.orig_description,
                productPopulation: data?.type_names,
                productIngredients: data?.ingredients,
                productLocations: data?.store_towns,
                productStores: data?.store_links,
                productInstagramURL: data?.instagramURL,
                productStoreURL: data?.storeURL,
                isFavorite: favorites.some((item) => item?.id === data?.id),
                favorites: favorites,
              },
            });
          }}
        />
      </View>
    );
  };
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const favorites = await AsyncStorage.getItem("favorites");
        if (favorites) {
          setFavorites(JSON.parse(favorites));
        }
      } catch (error) {
        throw error;
      }
    };

    if (isFocused) {
      loadFavorites();
    }
  }, [isFocused]);
  useEffect(() => {
    const fetchDeviceType = async () => {
      const type = await Device.getDeviceTypeAsync();
      setDeviceType(type);
    };

    fetchDeviceType();
  }, []);
  return (
    <View style={{ backgroundColor: colors.primary }}>
      <ScrollView>
        <View
          style={[
            styles.headerContainer,
            {
              backgroundColor: colors.primary,
              marginTop: Platform.OS === "android" ? moderateScale(35, 0.2) : 0,
            },
          ]}
        >
          <Image
            source={require("../../../assets/Images/logo.png")}
            style={[styles.icon]}
          />
          <Text style={[styles.headerTitle, { color: colors.background2 }]}>
            {t("home_title")}
          </Text>
        </View>
        <>
          {(gettingRecommendProducts ||
            gettingAcionProducts ||
            gettingAllProducts) && <ActivityScreen message={t("loading")} />}
          <View
            style={[
              styles.mainContainer,
              {
                backgroundColor: colors.background,
                display:
                  gettingRecommendProducts ||
                  gettingAcionProducts ||
                  gettingAllProducts
                    ? "none"
                    : "flex",
              },
            ]}
          >
            <View style={[styles.recommendationContainer]}>
              <Text
                style={[styles.recommendationTitle, { color: colors.text }]}
              >
                {t("we_recommend")}
              </Text>
              <View>
                <Carousel
                  pagination={Pagination}
                  renderItem={renderItem}
                  data={topProducts}
                  loop
                  autoplay
                  autoplayInterval={5000}
                />
              </View>
            </View>
            <View style={[styles.healthRecommendationContainer]}>
              <Text
                style={[
                  styles.healthRecommendationTitle,
                  { color: colors.text },
                ]}
              >
                <Feather size={26} name="check" color={colors.primary} />{" "}
                {t("health_recommend")}
              </Text>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                <View style={{ flexDirection: "row" }}>
                  {recommendations.map((item, index) => (
                    <ProductFilterCard
                      key={index}
                      icon={item.icon}
                      filterName={item.label}
                      onPress={item.onPress}
                    />
                  ))}
                </View>
              </ScrollView>
            </View>
            <View style={[styles.actionRecommendationContainer]}>
              {!gettingRecommendProducts && !gettingAcionProducts && (
                <Text
                  style={[
                    styles.actionRecommendationTitle,
                    { color: colors.text },
                  ]}
                >
                  <Feather size={26} name="percent" color={colors.primary} />{" "}
                  {t("products_on_sale")}
                </Text>
              )}
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  {actionProducts.length > 0 &&
                    actionProducts.map((product, index) => {
                      const isFavorite = favorites.some(
                        (favProduct) => favProduct?.id === product?.id
                      );
                      return (
                        <ActionProductCard
                          key={index}
                          imageUrl={webUrl.prod + product.imageURL}
                          title={product.name}
                          favoriteIcon={
                            isFavorite ? (
                              <MaterialIcons
                                size={25}
                                name="favorite"
                                color={colors.primary}
                              />
                            ) : (
                              <MaterialIcons
                                size={25}
                                name="favorite-outline"
                                color={colors.primary}
                              />
                            )
                          }
                          onPress={() => {
                            if (logStatistics) {
                              addStatistic({
                                product_id: product.id,
                                unique_id: deviceId,
                                component: 2,
                                extra: "",
                                user_id: "null",
                              });
                            }
                            navigation.navigate("Home Product", {
                              screen: "Home Product",
                              state: {
                                product: product,
                                productId: product.id,
                                productImage: webUrl.prod + product.imageURL,
                                productTitle: product.name,
                                productDescription: product.description,
                                productPopulation: product.type_names,
                                productIngredients: product.ingredients,
                                productLocations: product.store_towns,
                                productStores: product.store_links,
                                productInstagramURL: product.instagramURL,
                                productStoreURL: product.storeURL,
                                isFavorite: isFavorite,
                                favorites: favorites,
                              },
                            });
                          }}
                        />
                      );
                    })}
                </View>
              </ScrollView>
            </View>
          </View>
        </>
      </ScrollView>
    </View>
  );
};

export default HomeTab;
