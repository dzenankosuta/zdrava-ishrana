import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  SafeAreaView,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { useTranslation } from "react-i18next";
import { useNavigation, useTheme } from "@react-navigation/native";
import styles from "./AddProductStyles";
import { CustomButton } from "../../components/CustomButton/CustomButton";
import { useSelector } from "react-redux";

const AddProduct = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const { id: userId } = useSelector((state) => state.auth);
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [imageURL, setImageURL] = useState("");

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert(
        "Permission Denied",
        "Permission to access camera roll is required!"
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImageURL(result.assets[0].uri);
    }
  };

  const addProduct = async () => {
    if (name && description && ingredients && imageURL) {
      try {
        const newProduct = {
          id: Date.now().toString(),
          name,
          description,
          ingredients,
          imageURL,
          instagramURL: "https://www.instagram.com/aronica.natural/",
          storeURL:
            "https://zdravaulja.com/products/floral-garden?_pos=1&_sid=ccc654f04&_ss=r&variant=42981517918443",
          orderNumber: 0,
          is_approved: true,
          sort_number: 1,
          language_id: 1,
          store_names: [
            "U razli\u010ditim prodavnicama zdrave hrane i apotekama \u0161irom Srbije.",
          ],
          type_names: ["Kozmetika", "Odrasli"],
          store_links: [],
          store_towns: [],
          hashtags: [],
        };

        const storedProducts = await AsyncStorage.getItem(
          `${userId}myProducts`
        );
        const currentProducts = storedProducts
          ? JSON.parse(storedProducts)
          : [];
        currentProducts.push(newProduct);

        await AsyncStorage.setItem(
          `${userId}myProducts`,
          JSON.stringify(currentProducts)
        );
        Alert.alert(t("product_added"), t("product_added_in_my_products"), [
          {
            text: t("ok"),
            onPress: () => navigation.goBack(),
          },
        ]);
        setName("");
        setDescription("");
        setIngredients("");
        setImageURL("");
      } catch (error) {
        Alert.alert(t("error"), t("something_went_wrong"));
      }
    } else {
      Alert.alert(t("validation"), t("all_fields_must_be_filled"));
    }
  };

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       const storedProducts = await AsyncStorage.getItem(`${userId}myProducts`);
  //       console.log("storedProducts", storedProducts);
  //     };
  //     fetchData();
  //   }, []);
  return (
    <View style={styles.container}>
      <Text style={[styles.addProductTitle, { color: colors.text }]}>
        {t("add_product")}
      </Text>
      <SafeAreaView style={[styles.safeArea]}>
        <TextInput
          style={[
            styles.textInput,
            {
              color: colors.text,
              borderBottomColor: colors.placeholder,
            },
          ]}
          onChangeText={setName}
          value={name}
          placeholder={t("product_name")}
          placeholderTextColor={colors.placeholder}
          keyboardType="default"
        />
        <TextInput
          style={[
            styles.textInput,
            {
              color: colors.text,
              borderBottomColor: colors.placeholder,
            },
          ]}
          onChangeText={setDescription}
          value={description}
          placeholder={t("product_description")}
          placeholderTextColor={colors.placeholder}
          keyboardType="default"
        />
        <TextInput
          style={[
            styles.textInput,
            {
              color: colors.text,
              borderBottomColor: colors.placeholder,
            },
          ]}
          onChangeText={setIngredients}
          value={ingredients}
          placeholder={t("product_ingredients")}
          placeholderTextColor={colors.placeholder}
          keyboardType="default"
        />
        <View style={styles.buttonWrapper}>
          <CustomButton
            text={t("select_image")}
            onPress={pickImage}
            type="secondary"
          />
        </View>
        {imageURL ? (
          <Image source={{ uri: imageURL }} style={styles.image} />
        ) : null}
        <View style={styles.mainButtonWrapper}>
          <CustomButton
            text={t("add_product_btn")}
            onPress={addProduct}
            type="primary"
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default AddProduct;
