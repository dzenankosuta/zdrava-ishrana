import React, { useRef } from "react";
import { Platform, Text, View } from "react-native";
import { FontAwesome5, Octicons, Entypo } from "react-native-vector-icons";
import { useTheme } from "@react-navigation/native";
import { moderateScale } from "react-native-size-matters";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTranslation } from "react-i18next";
import styles from "./TabsStyles";
import HomeTab from "../../views/HomeTab/HomeTab";
import RecommendationsTab from "../../views/RecommendationsTab/RecommendationsTab";
import Product from "../../views/Product/Product";
import ProfileTab from "../../views/ProfileTab/ProfileTab";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Tabs = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  return (
    <Tab.Navigator
      tabBarOptions={{
        keyboardHidesTabBar: true,
        activeTintColor: colors.primary,
        inactiveTintColor: colors.darkBorder,
        activeBackgroundColor: colors.background2,
        inactiveBackgroundColor: colors.background2,
        style: { height: moderateScale(60, 0.2) },
        tabStyle: {
          height: moderateScale(60, 0.2),
        },
      }}
    >
      <Tab.Screen
        name="Home Tab"
        component={HomeNavigation}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <View style={[styles.tabContainer]}>
              <Text style={[styles.iconStyle]}>
                <Entypo size={28} name="home" color={color} />
              </Text>
              <Text style={[styles.tabName, { color }]}>{t("home")}</Text>
            </View>
          ),
          tabBarLabel: ({ color, focused }) =>
            focused && (
              <View
                style={[
                  styles.tabBottomLine,
                  { borderBottomColor: colors.primary },
                ]}
              ></View>
            ),
          tabStyle: styles.tabStyles,
          labelStyle: styles.labelStyles,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Home Recommendations"
        component={RecommendationsNavigation}
        options={{
          tabBarIcon: ({ color }) => (
            <View style={[styles.tabContainer]}>
              <Text style={[styles.iconStyle]}>
                <Octicons size={32} name="check" color={color} />
              </Text>
              <Text style={[styles.tabName, { color }]}>
                {t("recommendations")}
              </Text>
            </View>
          ),
          tabBarLabel: ({ color, focused }) =>
            focused && (
              <View
                style={[
                  styles.tabBottomLine,
                  { borderBottomColor: colors.primary },
                ]}
              ></View>
            ),
          tabStyle: styles.tabStyles,
          labelStyle: styles.labelStyles,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Home Profile"
        component={ProfileNavigation}
        options={{
          tabBarIcon: ({ color }) => (
            <View style={[styles.tabContainer]}>
              <Text style={[styles.iconStyle]}>
                <FontAwesome5 size={24} name="user-alt" color={color} />
              </Text>
              <Text style={[styles.tabName, { color }]}>{t("profile")}</Text>
            </View>
          ),
          tabBarLabel: ({ focused }) =>
            focused && (
              <View
                style={[
                  styles.tabBottomLine,
                  { borderBottomColor: colors.primary },
                ]}
              ></View>
            ),
          tabStyle: styles.tabStyles,
          labelStyle: styles.labelStyles,
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

const HomeNavigation = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const recommendationsRef = useRef(null);

  const RecommendationsComponent = (props) => (
    <RecommendationsTab {...props} ref={recommendationsRef} />
  );
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: (props) => (
          <Text
            style={{
              color: colors.text,
              textAlign: "center",
            }}
          >
            {props.children}
          </Text>
        ),
        headerStyle: {
          backgroundColor: colors.primary,
          height:
            Platform.OS === "ios"
              ? moderateScale(50, 0.2)
              : moderateScale(90, 0.2),
        },
        headerBackTitleVisible: false,
        // headerRight: RightHeaderComponent,
        headerTintColor: colors.background2,
      }}
      initialRouteName="home"
    >
      <Stack.Screen
        name="home"
        component={HomeTab}
        options={{
          headerTitle: false,
          headerTitleAlign: "center",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Home Recommendations"
        component={RecommendationsComponent}
        options={{
          headerTitle: t("recommendations"),
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: colors.background2,
            fontFamily: "PopinsRegular",
          },
          headerRight: () => {
            if (recommendationsRef.current) {
              const ButtonComponent = recommendationsRef.current.Dots;
              return <ButtonComponent />;
            }
          },
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Home Product"
        component={Product}
        options={{
          headerTitle: t("recommendations"),
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: colors.background2,
            fontFamily: "PopinsRegular",
          },
        }}
      />
    </Stack.Navigator>
  );
};

const RecommendationsNavigation = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: (props) => (
          <Text
            style={{
              color: colors.text,
              textAlign: "center",
            }}
          >
            {props.children}
          </Text>
        ),
        headerStyle: {
          backgroundColor: colors.primary,
          height:
            Platform.OS === "ios"
              ? moderateScale(50, 0.2)
              : moderateScale(90, 0.2),
        },
        headerBackTitleVisible: false,
        // headerRight: RightHeaderComponent,
        headerTintColor: colors.background2,
      }}
      initialRouteName="recommendations"
    >
      <Stack.Screen
        name="recommendations"
        component={RecommendationsTab}
        options={{
          headerTitle: t("recommendations"),
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: colors.background2,
            fontFamily: "PopinsRegular",
          },
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Product"
        component={Product}
        options={{
          headerTitle: t("recommendations"),
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: colors.background2,
            fontFamily: "PopinsRegular",
          },
        }}
      />
    </Stack.Navigator>
  );
};
const ProfileNavigation = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: false,
        headerStyle: {
          backgroundColor: colors.primary,
          height:
            Platform.OS === "ios"
              ? moderateScale(50, 0.2)
              : moderateScale(90, 0.2),
        },
        headerBackTitleVisible: false,
        // headerRight: RightHeaderComponent,
        headerTintColor: colors.background2,
      }}
      initialRouteName="profile"
    >
      <Stack.Screen
        name="profile"
        component={ProfileTab}
        options={{
          headerTitle: t("profile"),
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: colors.background2,
            fontFamily: "PopinsRegular",
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default Tabs;
