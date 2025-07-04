import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  useWindowDimensions,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";

import api from "../../services/axios";
import CustomModal from "../mod/CustomModal";

const { width, height } = Dimensions.get("window");

function Cadastro({ visible, onClose, onOpenLogin }) {
  const navigation = useNavigation();
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();

  const [usuario, setUsuario] = useState({
    nome: "",
    email: "",
    NIF: "",
    senha: "",
    showSenha: true,
  });
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const [internalModalVisible, setInternalModalVisible] = useState(false);
  const [internalModalMessage, setInternalModalMessage] = useState("");
  const [internalModalType, setInternalModalType] = useState("info");

  async function armazenarDados(idUsuario, token) {
    try {
      await SecureStore.setItemAsync("idUsuario", idUsuario.toString());
      await SecureStore.setItemAsync("tokenUsuario", token.toString());
    } catch (erro) {
      console.error("Erro ao armazenar dados:", erro);
    }
  }

  async function handleCadastro() {
    const usuarioParaEnviar = {
      nome: usuario.nome,
      email: usuario.email,
      NIF: usuario.NIF,
      senha: usuario.senha,
      confirmarSenha: confirmarSenha,
    };

    try {
      const response = await api.postCadastro(usuarioParaEnviar);
      setInternalModalMessage(response.data.message);
      setInternalModalType("success");
      setInternalModalVisible(true);

      const idUsuario = response.data.usuario.id_usuario;
      const token = response.data.token;

      armazenarDados(idUsuario, token);

      setTimeout(() => {
        onClose();
        navigation.navigate("Principal");
      }, 700);
    } catch (error) {
      setInternalModalMessage(error.response?.data?.error || "Erro ao cadastrar.");
      setInternalModalType("error");
      setInternalModalVisible(true);
    }
  }

  const dynamicStyles = StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.7)",
      justifyContent: "center",
      alignItems: "center",
    },
    modal: {
      backgroundColor: "white",
      padding: width * 0.06,
      borderRadius: 15,
      width: width * 0.85,
      maxWidth: 400,
      alignItems: 'center',
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.35,
      shadowRadius: 10,
      elevation: 10,
    },
    closeButton: {
      position: 'absolute',
      top: 10,
      right: 10,
      padding: 5,
      zIndex: 1,
    },
    headerIcon: {
      marginBottom: height * 0.02,
      color: 'white',
      backgroundColor: 'rgb(177, 16, 16)',
      padding: width * 0.03, // Ajustado para ser responsivo
      borderRadius: (width * 0.11 + width * 0.03 * 2) / 2, // Ajustado para ser responsivo e circular
    },
    title: {
      fontSize: width * 0.06,
      fontWeight: "bold",
      color: '#333',
      marginBottom: height * 0.02,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: width * 0.04,
      color: '#666',
      marginBottom: height * 0.03,
      textAlign: 'center',
    },
    inputRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      marginBottom: height * 0.025,
      gap: width * 0.02,
    },
    inputGroup: {
      flex: 1,
      alignItems: 'flex-start',
    },
    inputTitle: {
      fontSize: width * 0.035,
      marginBottom: height * 0.005,
      fontWeight: "500",
      color: '#555',
    },
    inputFake: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: "#ddd",
      backgroundColor: "#f5f5f5",
      paddingVertical: height * 0.015,
      paddingHorizontal: width * 0.03,
      borderRadius: 8,
      width: '100%',
      justifyContent: 'space-between',
    },
    inputFakeText: {
      fontSize: width * 0.04,
      color: '#333',
    },
    summaryContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#f0f0f0',
      borderRadius: 10,
      paddingVertical: height * 0.015,
      paddingHorizontal: width * 0.04,
      marginBottom: height * 0.03,
      width: '100%',
    },
    summaryIcon: {
      marginRight: width * 0.025,
      color: 'rgb(177, 16, 16)',
    },
    summaryText: {
      fontSize: width * 0.038,
      color: '#333',
      fontWeight: '500',
    },
    confirmButton: {
      backgroundColor: "rgb(177, 16, 16)",
      paddingVertical: height * 0.02,
      paddingHorizontal: width * 0.08,
      borderRadius: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.25,
      shadowRadius: 5,
      elevation: 6,
    },
    confirmButtonText: {
      color: "white",
      fontWeight: "bold",
      fontSize: width * 0.045,
      marginLeft: width * 0.02,
    },
    separator: {
      height: 1,
      width: '80%',
      backgroundColor: '#eee',
      marginVertical: height * 0.018,
    },
    buttonToCadastro: {
      backgroundColor: "transparent",
      paddingVertical: height * 0.0001,
      paddingHorizontal: width * 0.05,
      borderRadius: 8,
      alignItems: "center",
      marginTop: height * 0.015,
      width: '100%',
    },
    textButtonToCadastro: {
      fontSize: width * 0.045,
      color: "rgb(152, 0, 0)",
      fontWeight: "bold",
      textDecorationLine: 'underline',
    },
    createAccountText: {
      fontSize: width * 0.039,
      color: 'gray',
      marginBottom: height * 0.001,
    },
    loginInputContainer: { // Reutilizado e renomeado para 'formInputContainer' no Cadastro
        flexDirection: "row",
        alignItems: "center",
        width: '100%',
        borderWidth: 1,
        borderColor: "#ddd",
        backgroundColor: "#f5f5f5",
        paddingVertical: height * 0.015,
        paddingHorizontal: width * 0.03,
        borderRadius: 8,
        marginBottom: height * 0.025,
    },
    loginInputField: { // Reutilizado e renomeado para 'formInputField' no Cadastro
        flex: 1,
        fontSize: width * 0.04,
        color: '#333',
        paddingVertical: 0,
    },
  });

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={dynamicStyles.overlay}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1, justifyContent: "center", alignItems: "center", width: "100%" }}
        >
          <View style={dynamicStyles.modal}>
            <TouchableOpacity style={dynamicStyles.closeButton} onPress={onClose}>
              <Ionicons name="close-circle-outline" size={width * 0.07} color="#999" />
            </TouchableOpacity>

            <Ionicons name="person-add-outline" size={width * 0.09} color="white" style={dynamicStyles.headerIcon} />
            <Text style={dynamicStyles.title}>Cadastre-se</Text>

            <View style={dynamicStyles.loginInputContainer}>
                <Ionicons name="person-outline" size={width * 0.05} color="gray" style={dynamicStyles.iconStyle} />
                <TextInput
                    placeholder="nome"
                    value={usuario.nome}
                    onChangeText={(value) => {
                        setUsuario({ ...usuario, nome: value });
                    }}
                    style={dynamicStyles.loginInputField}
                    placeholderTextColor="gray"
                />
            </View>

            <View style={dynamicStyles.loginInputContainer}>
                <Ionicons name="mail-outline" size={width * 0.05} color="gray" style={dynamicStyles.iconStyle} />
                <TextInput
                    placeholder="e-mail"
                    value={usuario.email}
                    onChangeText={(value) => {
                        setUsuario({ ...usuario, email: value });
                    }}
                    style={dynamicStyles.loginInputField}
                    placeholderTextColor="gray"
                />
            </View>

            <View style={dynamicStyles.loginInputContainer}>
                <Ionicons name="document-text-outline" size={width * 0.05} color="gray" style={dynamicStyles.iconStyle} />
                <TextInput
                    placeholder="NIF"
                    value={usuario.NIF}
                    onChangeText={(value) => {
                        setUsuario({ ...usuario, NIF: value });
                    }}
                    style={dynamicStyles.loginInputField}
                    placeholderTextColor="gray"
                />
            </View>
            
            <View style={dynamicStyles.loginInputContainer}>
                <Ionicons name="lock-closed-outline" size={width * 0.05} color="gray" style={dynamicStyles.iconStyle} />
                <TextInput
                    style={dynamicStyles.loginInputField}
                    placeholder="senha"
                    value={usuario.senha}
                    secureTextEntry={usuario.showSenha}
                    onChangeText={(value) => {
                        setUsuario({ ...usuario, senha: value });
                    }}
                    placeholderTextColor="gray"
                />
                <TouchableOpacity
                    onPress={() =>
                        setUsuario({ ...usuario, showSenha: !usuario.showSenha })
                    }
                >
                    <Ionicons
                        name={usuario.showSenha ? "eye-off-outline" : "eye-outline"}
                        size={width * 0.05}
                        color="gray"
                    />
                </TouchableOpacity>
            </View>

            <View style={dynamicStyles.loginInputContainer}>
                <Ionicons name="lock-closed-outline" size={width * 0.05} color="gray" style={dynamicStyles.iconStyle} />
                <TextInput
                    style={dynamicStyles.loginInputField}
                    placeholder="confirmar senha"
                    value={confirmarSenha}
                    secureTextEntry={usuario.showSenha}
                    onChangeText={(value) => setConfirmarSenha(value)}
                    placeholderTextColor="gray"
                />
                <TouchableOpacity
                    onPress={() =>
                        setUsuario({ ...usuario, showSenha: !usuario.showSenha })
                    }
                >
                    <Ionicons
                        name={usuario.showSenha ? "eye-off-outline" : "eye-outline"}
                        size={width * 0.05}
                        color="gray"
                    />
                </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={handleCadastro}
              style={dynamicStyles.confirmButton}
            >
              <Text style={dynamicStyles.confirmButtonText}>Cadastrar-se</Text>
            </TouchableOpacity>
            
            <View style={dynamicStyles.separator} />

            <Text style={dynamicStyles.createAccountText}>Já tem uma conta?</Text>
            <TouchableOpacity
              style={dynamicStyles.buttonToCadastro} // Mantendo o nome do estilo para reuso
              onPress={() => {
                onClose();
                if (onOpenLogin) {
                  onOpenLogin();
                } else {
                  navigation.navigate("Login");
                }
              }}
            >
              <Text style={dynamicStyles.textButtonToCadastro}>Login</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>

      <CustomModal
        open={internalModalVisible}
        onClose={() => setInternalModalVisible(false)}
        title={internalModalType === "success" ? "Cadastro Concluído" : "Erro"}
        message={internalModalMessage}
        type={internalModalType}
      />
    </Modal>
  );
}

export default Cadastro;
