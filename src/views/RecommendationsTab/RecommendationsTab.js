import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import styles from "./RecommendationsTabStyles";
import {
  useIsFocused,
  useNavigation,
  useTheme,
} from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { MaterialIcons, AntDesign, Entypo } from "react-native-vector-icons";
import ModalSelector from "react-native-modal-selector";
import { moderateScale } from "react-native-size-matters";
import ProductCard from "../../components/Card/ProductCard/ProductCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import productsJSON from "../../common/products.json";

const RecommendationsTab = ({ route }) => {
  const scrollViewRef = useRef(null);
  const { colors } = useTheme();
  const { t } = useTranslation();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { logStatistics, deviceId } = useSelector((state) => state.stats);
  const [products, setProducts] = useState(productsJSON);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [page, setPage] = useState(1);
  // const [visibleProducts, setVisibleProducts] = useState(20);
  const [filterChanged, setFilterChanged] = useState(false);

  // const handleScrollIos = (event) => {
  //   const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;

  //   const isAtBottom =
  //     contentOffset.y + layoutMeasurement.height >= contentSize.height;

  //   if (isAtBottom) {
  //     // console.log("isAtBottom");
  //     setVisibleProducts((prevVisibleProducts) =>
  //       Math.min(prevVisibleProducts + 20, filteredProducts.length)
  //     );
  //   }
  // };

  // const handleScrollAndroid = (event) => {
  //   // Using a threshold to ensure the function is not called multiple times near the bottom
  //   const THRESHOLD = 5;
  //   const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;

  //   const isCloseToBottom =
  //     contentOffset.y + layoutMeasurement.height >=
  //     contentSize.height - THRESHOLD;

  //   if (isCloseToBottom) {
  //     // console.log("isCloseToBottom");
  //     setVisibleProducts((prevVisibleProducts) =>
  //       Math.min(prevVisibleProducts + 20, filteredProducts.length)
  //     );
  //   }
  // };
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const filters = [
    { label: t("all_products"), key: t("all_products") },
    { label: t("children"), key: t("children") },
    { label: t("cosmetics"), key: t("cosmetics") },
    { label: t("adults"), key: t("adults") },
    { label: t("supplementation"), key: t("supplementation") },
    { label: t("house_products"), key: t("house_products") },
    { label: t("food"), key: t("food") },
  ];
  const dotsFilters = [{ label: t("favorite"), key: t("favorite") }];
  const [selectedFilter, setSelectedFilter] = useState(filters[0].key);

  const sorts = [
    { label: t("by_default"), key: "default" },
    { label: t("A-Z"), key: "A-Z" },
    { label: t("Z-A"), key: "Z-A" },
  ];
  const [selectedSort, setSelectedSort] = useState(sorts[0].key);

  function sortByNameAZ(array) {
    return array.sort((a, b) => {
      const nameA = a.name.trim().toUpperCase();
      const nameB = b.name.trim().toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
  }

  function sortByNameZA(array) {
    return array.sort((a, b) => {
      const nameA = a.name.trim().toUpperCase();
      const nameB = b.name.trim().toUpperCase();
      if (nameA > nameB) {
        return -1;
      }
      if (nameA < nameB) {
        return 1;
      }
      return 0;
    });
  }

  const handleSearch = (text) => {
    setPage(1);
    setSearch(text);
    if (text.trim() === "") {
      if (selectedFilter === t("favorite")) {
        setFilteredProducts(favorites);
      } else if (selectedFilter === t("children")) {
        setFilteredProducts(
          products.filter((product) =>
            product.type_names.includes(t("children"))
          )
        );
      } else if (selectedFilter === t("cosmetics")) {
        setFilteredProducts(
          products.filter((product) =>
            product.type_names.includes(t("cosmetics"))
          )
        );
      } else if (selectedFilter === t("adults")) {
        setFilteredProducts(
          products.filter((product) => product.type_names.includes(t("adults")))
        );
      } else if (selectedFilter === t("supplementation")) {
        setFilteredProducts(
          products.filter((product) =>
            product.type_names.includes(t("supplementation"))
          )
        );
      } else if (selectedFilter === t("house_products")) {
        setFilteredProducts(
          products.filter((product) =>
            product.type_names.includes(t("house_products"))
          )
        );
      } else if (selectedFilter === t("food")) {
        setFilteredProducts(
          products.filter((product) => product.type_names.includes(t("food")))
        );
      } else {
        setFilteredProducts(products);
      }
    } else {
      const filtered = filteredProducts.filter((product) => {
        return product.name.toLowerCase().includes(text.toLowerCase());
      });
      setFilteredProducts(filtered);
    }
  };

  const saveFavorites = async (favorites) => {
    try {
      const jsonFavorites = JSON.stringify(favorites);
      await AsyncStorage.setItem("favorites", jsonFavorites);
    } catch (error) {
      throw error;
    }
  };

  const loadFavorites = async () => {
    try {
      const jsonFavorites = await AsyncStorage.getItem("favorites");
      if (jsonFavorites) {
        setFavorites(JSON.parse(jsonFavorites));
      }
    } catch (error) {
      throw error;
    }
  };

  const addToFavorites = (product) => {
    setFavorites((prevFavorites) => [...prevFavorites, product]);
    saveFavorites([...favorites, product]);
  };

  const removeFromFavorites = (productId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((product) => product.id !== productId)
    );
    saveFavorites(favorites.filter((product) => product.id !== productId));
  };

  useEffect(() => {
    let filtered = [...products];

    if (selectedFilter === t("favorite")) {
      filtered = favorites;
    } else if (selectedFilter !== t("all_products")) {
      filtered = products.filter((product) =>
        product.type_names.includes(t(selectedFilter))
      );
    }

    if (selectedSort === "A-Z") {
      filtered = sortByNameAZ(filtered);
    } else if (selectedSort === "Z-A") {
      filtered = sortByNameZA(filtered);
    }

    setFilteredProducts(filtered);
  }, [selectedFilter, selectedSort]);

  useEffect(() => {
    if (isFocused) {
      loadFavorites();
    }
  }, [isFocused]);
  useEffect(() => {
    setFilterChanged(true);
  }, [selectedFilter]);
  useEffect(() => {
    if (filterChanged) {
      setFilterChanged(false);
      // setVisibleProducts(20);
      setPage(1);
    }
  }, [filterChanged]);
  useEffect(() => {
    scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
  }, [selectedFilter, search, filterChanged, page]);
  useEffect(() => {
    setProducts(shuffleArray(products));
    if (!!route?.params?.state?.filterBy) {
      setSelectedFilter(route?.params?.state?.filterBy);
      setFilteredProducts(
        products?.filter((product) =>
          product?.type_names.includes(t(route?.params?.state?.filterBy))
        )
      );
    } else {
      setFilteredProducts(shuffleArray(products));
    }
  }, []);
  return (
    <>
      <View style={[styles.container]}>
        <View style={[styles.header, { backgroundColor: colors.primary }]}>
          <Text></Text>
          <Text
            style={[styles.headerTitleStyle, { color: colors.background2 }]}
          >
            {t("recommendations")}
          </Text>
          <ModalSelector
            data={dotsFilters}
            initValue={dotsFilters[0].key}
            onChange={(option) => {
              // setVisibleProducts(20);
              setPage(1);
              setSelectedFilter(option.key);
            }}
            selectedItemTextStyle={{
              color: colors.text,
              fontFamily: "PopinsRegular",
              fontSize: moderateScale(14, 0.2),
            }}
            optionTextStyle={{
              color: colors.primary,
              fontFamily: "PopinsRegular",
              fontSize: moderateScale(14, 0.2),
            }}
            optionContainerStyle={{
              backgroundColor: colors.background,
              borderRadius: 12,
            }}
            cancelStyle={{
              backgroundColor: colors.background,
              borderRadius: 12,
            }}
            cancelTextStyle={{
              color: colors.primary,
              fontFamily: "PopinsRegular",
              fontSize: moderateScale(14, 0.2),
            }}
            cancelText={t("close")}
            backdropPressToClose={true}
          >
            <View
              style={[
                styles.dotsBtn,
                {
                  borderColor: colors.primary,
                },
              ]}
            >
              <Entypo
                size={20}
                name="dots-three-vertical"
                color={colors.background2}
              />
            </View>
          </ModalSelector>
        </View>
        <View style={[styles.firstContainer]}>
          <View
            style={[
              styles.searchContainer,
              {
                borderColor: colors.placeholder,
                backgroundColor: colors.background2,
              },
            ]}
          >
            <AntDesign
              size={25}
              name="search1"
              color={colors.primary}
              style={{ marginRight: moderateScale(10, 0.2) }}
            />
            <TextInput
              style={{
                width: "85%",
                color: colors.text,
                fontFamily: "PopinsRegular",
              }}
              // placeholder={t("search")}
              // placeholderTextColor={colors.placeholder}
              returnKeyType="search"
              onChangeText={(text) => {
                setSearch(text);
                handleSearch(text);
              }}
              value={search}
            />
          </View>
          <View style={[styles.filterContainer]}>
            <View style={[styles.filterButton]}>
              <ModalSelector
                data={filters}
                initValue={selectedFilter}
                onChange={(option) => {
                  setSelectedFilter(option.key);
                }}
                selectedItemTextStyle={{
                  color: colors.text,
                  fontFamily: "PopinsRegular",
                  fontSize: moderateScale(14, 0.2),
                }}
                optionTextStyle={{
                  color: colors.primary,
                  fontFamily: "PopinsRegular",
                  fontSize: moderateScale(14, 0.2),
                }}
                optionContainerStyle={{
                  backgroundColor: colors.background,
                  borderRadius: 12,
                }}
                cancelStyle={{
                  backgroundColor: colors.background,
                  borderRadius: 12,
                }}
                cancelTextStyle={{
                  color: colors.primary,
                  fontFamily: "PopinsRegular",
                  fontSize: moderateScale(14, 0.2),
                }}
                cancelText={t("close")}
                backdropPressToClose={true}
              >
                <View style={[styles.modalSelected]}>
                  <Text
                    style={[
                      { color: colors.text, fontFamily: "PopinsRegular" },
                    ]}
                  >
                    <AntDesign size={20} name="filter" color={colors.text} />{" "}
                    {selectedFilter}
                    <AntDesign size={16} name="down" color={colors.text} />
                  </Text>
                </View>
              </ModalSelector>
            </View>
            <View style={[styles.filterButton]}>
              <ModalSelector
                data={sorts}
                initValue={selectedSort}
                onChange={(option) => {
                  setSelectedSort(option.key);
                }}
                selectedItemTextStyle={{
                  color: colors.text,
                  fontFamily: "PopinsRegular",
                  fontSize: moderateScale(14, 0.2),
                }}
                optionTextStyle={{
                  color: colors.primary,
                  fontFamily: "PopinsRegular",
                  fontSize: moderateScale(14, 0.2),
                }}
                optionContainerStyle={{
                  backgroundColor: colors.background,
                  borderRadius: 12,
                }}
                cancelStyle={{
                  backgroundColor: colors.background,
                  borderRadius: 12,
                }}
                cancelTextStyle={{
                  color: colors.primary,
                  fontFamily: "PopinsRegular",
                  fontSize: moderateScale(14, 0.2),
                }}
                cancelText={t("close")}
                backdropPressToClose={true}
              >
                <View style={[styles.modalSelected]}>
                  <Text
                    style={[
                      { color: colors.text, fontFamily: "PopinsRegular" },
                    ]}
                  >
                    {sorts.find((option) => option.key === selectedSort).label}{" "}
                    <AntDesign size={16} name="down" color={colors.text} />
                  </Text>
                </View>
              </ModalSelector>
            </View>
          </View>
        </View>
        <ScrollView
          ref={scrollViewRef}
          // onScroll={(event) =>
          //   Platform.OS === "ios"
          //     ? handleScrollIos(event)
          //     : handleScrollAndroid(event)
          // }
          // scrollEventThrottle={10}
          style={[styles.scrollView]}
          keyboardShouldPersistTaps="handled"
        >
          <View style={[styles.cardWrapper]}>
            {filteredProducts?.length > 0 &&
              filteredProducts
                ?.map((product, index) => {
                  const isFavorite = favorites?.some(
                    (favProduct) => favProduct.id === product?.id
                  );
                  return (
                    <ProductCard
                      key={index}
                      imageUrl={product?.imageURL}
                      title={product?.name}
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
                        navigation.navigate("Product", {
                          screen: "Product",
                          state: {
                            product: product,
                            productId: product?.id,
                            productImage: product?.imageURL,
                            productTitle: product?.name,
                            productDescription: product?.description,
                            productPopulation: product?.type_names,
                            productIngredients: product?.ingredients,
                            productLocations: product?.store_towns,
                            productStores: product?.store_links,
                            productInstagramURL: product?.instagramURL,
                            productStoreURL: product?.storeURL,
                            isFavorite: isFavorite,
                            favorites: favorites,
                          },
                        });
                      }}
                      onFavoritePress={() => {
                        if (isFavorite) {
                          removeFromFavorites(product?.id);
                        } else {
                          addToFavorites(product);
                        }
                      }}
                    />
                  );
                })
                .slice((page - 1) * 20, (page - 1) * 20 + 20)}
          </View>
          <View
            style={[
              styles.pagginationWrapper,
              { display: filteredProducts.length > 20 ? "flex" : "none" },
            ]}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              underlayColor={"transparent"}
              style={[styles.pageBtn, { backgroundColor: colors.primary }]}
              onPress={() => {
                if (page > 1) {
                  setPage(page - 1);
                }
              }}
              disabled={page === 1}
            >
              <AntDesign size={20} name="left" color={colors.background} />
            </TouchableOpacity>
            <View
              style={[
                styles.pageBtn,
                {
                  backgroundColor: colors.primary,
                  borderRadius: moderateScale(15, 0.2),
                },
              ]}
            >
              <Text style={[styles.pageBtnText, { color: colors.background }]}>
                {page}
              </Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.8}
              underlayColor={"transparent"}
              style={[styles.pageBtn, { backgroundColor: colors.primary }]}
              onPress={() => {
                if (page < filteredProducts.length / 20) {
                  setPage(page + 1);
                }
              }}
              disabled={page === Math.ceil(filteredProducts.length / 20)}
            >
              <AntDesign size={20} name="right" color={colors.background} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default RecommendationsTab;
