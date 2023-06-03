import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveFavorite = async (
  owner_username: string,
  slug: string,
  id: string
) => {
  try {
    const favoritesString = await AsyncStorage.getItem("favorites");
    let favoritesArray = favoritesString ? JSON.parse(favoritesString) : [];
    const existingFavorite = favoritesArray.find((f: any) => f.id === id);
    if (!existingFavorite) {
      favoritesArray.push({ owner_username, slug, id });
      console.log(favoritesArray);
      await AsyncStorage.setItem("favorites", JSON.stringify(favoritesArray));
    }
  } catch (error) {
    console.error(error);
  }
};

export const getFavorites = async () => {
  try {
    const favoritesString = await AsyncStorage.getItem("favorites");
    const favoritesArray = favoritesString ? JSON.parse(favoritesString) : [];
    return favoritesArray;
  } catch (error) {
    console.error(error);
  }
};

export const removeFavorite = async (favoriteId: string) => {
  try {
    const favoritesString = await AsyncStorage.getItem("favorites");
    let favoritesArray = favoritesString ? JSON.parse(favoritesString) : [];
    const removeIndex = favoritesArray.findIndex(
      (f: any) => f.id === favoriteId
    );
    if (removeIndex !== -1) {
      favoritesArray.splice(removeIndex, 1);
      await AsyncStorage.setItem("favorites", JSON.stringify(favoritesArray));
      return favoritesArray;
    }
  } catch (error) {
    console.error(error);
  }
};

export const getFavorite = async (
  owner_username: string,
  slug: string,
  id: string
) => {
  try {
    const favoritesString = await AsyncStorage.getItem("favorites");
    let favoritesArray = favoritesString ? JSON.parse(favoritesString) : [];

    const favorite = favoritesArray.find(
      (f: any) =>
        f.owner_username === owner_username && f.slug === slug && f.id === id
    );

    if (favorite) {
      return true;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
  }
};
