import { Text, ScrollView, Image, View, Linking } from "react-native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./ProductStyles";
import { useTheme } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  MaterialIcons,
  MaterialCommunityIcons,
} from "react-native-vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import { addStatistic } from "../../services/stats";

const Product = ({ route }) => {
  const { state } = route.params;
  const { colors } = useTheme();
  const { t } = useTranslation();
  const { logStatistics, deviceId } = useSelector((state) => state.stats);
  const [favorite, setFavorite] = useState(state.isFavorite);

  const handleSite = async (url) => {
    Linking.openURL(url).catch((err) =>
      console.error("An error occurred", err)
    );
  };

  const saveFavorites = async (favorites) => {
    try {
      const jsonFavorites = JSON.stringify(favorites);
      await AsyncStorage.setItem("favorites", jsonFavorites);
    } catch (error) {
      // console.log("Error saving favorites: ", error);
      throw error;
    }
  };

  const addToFavorites = (product) => {
    saveFavorites([...state.favorites, product]);
  };

  const removeFromFavorites = (productId) => {
    saveFavorites(
      state.favorites.filter((product) => product.id !== productId)
    );
  };
  return (
    <ScrollView style={[styles.container]}>
      <View
        style={[styles.imgContainer, { backgroundColor: colors.background2 }]}
      >
        <Image
          source={{
            uri: state.productImage,
          }}
          style={[styles.img, { backgroundColor: colors.background2 }]}
          resizeMode="contain"
        />
        <View style={[styles.favoriteContainer]}>
          <TouchableOpacity
            activeOpacity={0.8}
            underlayColor={"transparent"}
            style={[
              styles.productFavoriteBtn,
              { backgroundColor: colors.background2 },
            ]}
            onPress={() => {
              setFavorite(!favorite);
              if (favorite) {
                removeFromFavorites(state.productId);
              } else {
                if (logStatistics) {
                  addStatistic({
                    product_id: state.productId,
                    unique_id: deviceId,
                    component: 3,
                    extra: "",
                    user_id: "null",
                  });
                }
                addToFavorites(state.product);
              }
            }}
          >
            <Text>
              {favorite ? (
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
              )}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={[styles.title, { color: colors.text }]}>
        {state.productTitle}
      </Text>
      <Text style={[styles.population, { color: colors.text }]}>
        {state.productPopulation.toString()}
      </Text>
      {state.productDescription && (
        <>
          <Text style={[styles.subTitle, { color: colors.text }]}>
            <MaterialCommunityIcons
              size={25}
              name="note-text-outline"
              color={colors.primary}
            />{" "}
            {t("description")}
          </Text>
          <Text style={[styles.text, { color: colors.text }]}>
            {state.productDescription}
          </Text>
        </>
      )}
      {state.productIngredients && (
        <>
          <Text style={[styles.subTitle, { color: colors.text }]}>
            <MaterialCommunityIcons
              size={24}
              name="basket-check"
              color={colors.primary}
            />{" "}
            {t("ingredients")}
          </Text>
          <Text style={[styles.text, { color: colors.text }]}>
            {state.productIngredients}
          </Text>
        </>
      )}
    </ScrollView>
  );
};

export default Product;
