import AsyncStorage from "@react-native-async-storage/async-storage";

 
const storeData = async (_key, _value) => {
try {
    await AsyncStorage.setItem(_key, _value)
} catch (e) {
    // saving error
}
}

const getData = async (_key, _default) => {
try {
    const value = await AsyncStorage.getItem(key)
    console.log(value);
    return value ? value : _default;

} catch(e) {
    // error reading value
}
}


const storage = {storeData, getData}

export default storage;