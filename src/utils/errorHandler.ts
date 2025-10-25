import Toast from "react-native-toast-message";

export const showErrorToast = (message: string, customTitle?: string) => {
  Toast.show({
    type: "error",
    text1: customTitle || "Erro",
    text2: message,
    position: "top",
    visibilityTime: 4000,
    autoHide: true,
    topOffset: 60,
  });
};

export const showSuccessToast = (message: string, title: string = "Sucesso") => {
  Toast.show({
    type: "success",
    text1: title,
    text2: message,
    position: "top",
    visibilityTime: 3000,
    autoHide: true,
    topOffset: 60,
  });
};

export const showInfoToast = (message: string, title: string = "Informação") => {
  Toast.show({
    type: "info",
    text1: title,
    text2: message,
    position: "top",
    visibilityTime: 3000,
    autoHide: true,
    topOffset: 60,
  });
};
