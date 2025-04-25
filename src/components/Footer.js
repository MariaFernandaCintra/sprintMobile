import { StyleSheet, View, Text } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

function Footer() {
  return (
    <View style={styles.footer}>
      <Text style={styles.textDesenvolvido}>
        &copy; Desenvolvido por: Vinicius Fogaça, Maria Júlia e Maria Fernanda
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: "rgb(166, 13, 13)",
    height: "7%",
    width: "100%",
    borderTopColor: "white",
    borderTopWidth: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  textDesenvolvido: { color: "white", fontWeight: "bold", fontSize: 14 },
});

export default Footer;
