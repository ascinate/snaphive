import { View, Image,StyleSheet } from 'react-native'
const logo = require("../../assets/logoTwo.png");

const Logo = ({ style }) => {
  return (
    <View style={[styles.flex, style]}>
      <Image source={logo} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    width: 187,
    height: 47,
  },
  logo: {
    width: '100%',
    height: '100%',
    resizeMode: "contain",
  },
});
export default Logo