import Toast from "react-native-toast-message";
import { showErrorToast, showInfoToast, showSuccessToast } from "../errorHandler";

jest.mock("react-native-toast-message");

describe("Error Handler", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("showErrorToast", () => {
    it("should call Toast.show with error configuration", () => {
      const message = "Something went wrong";

      showErrorToast(message);

      expect(Toast.show).toHaveBeenCalledWith({
        type: "error",
        text1: "Erro",
        text2: message,
        position: "top",
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 60,
      });
    });

    it("should use custom title when provided", () => {
      const message = "Something went wrong";
      const customTitle = "Custom Error";

      showErrorToast(message, customTitle);

      expect(Toast.show).toHaveBeenCalledWith({
        type: "error",
        text1: customTitle,
        text2: message,
        position: "top",
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 60,
      });
    });

    it("should use default title when not provided", () => {
      showErrorToast("Error message");

      expect(Toast.show).toHaveBeenCalledWith(
        expect.objectContaining({
          text1: "Erro",
        }),
      );
    });
  });

  describe("showSuccessToast", () => {
    it("should call Toast.show with success configuration", () => {
      const message = "Operation successful";

      showSuccessToast(message);

      expect(Toast.show).toHaveBeenCalledWith({
        type: "success",
        text1: "Sucesso",
        text2: message,
        position: "top",
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 60,
      });
    });

    it("should use custom title when provided", () => {
      const message = "Operation successful";
      const customTitle = "Great!";

      showSuccessToast(message, customTitle);

      expect(Toast.show).toHaveBeenCalledWith({
        type: "success",
        text1: customTitle,
        text2: message,
        position: "top",
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 60,
      });
    });

    it("should use default title when not provided", () => {
      showSuccessToast("Success message");

      expect(Toast.show).toHaveBeenCalledWith(
        expect.objectContaining({
          text1: "Sucesso",
        }),
      );
    });
  });

  describe("showInfoToast", () => {
    it("should call Toast.show with info configuration", () => {
      const message = "Here is some information";

      showInfoToast(message);

      expect(Toast.show).toHaveBeenCalledWith({
        type: "info",
        text1: "Informação",
        text2: message,
        position: "top",
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 60,
      });
    });

    it("should use custom title when provided", () => {
      const message = "Here is some information";
      const customTitle = "Notice";

      showInfoToast(message, customTitle);

      expect(Toast.show).toHaveBeenCalledWith({
        type: "info",
        text1: customTitle,
        text2: message,
        position: "top",
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 60,
      });
    });

    it("should use default title when not provided", () => {
      showInfoToast("Info message");

      expect(Toast.show).toHaveBeenCalledWith(
        expect.objectContaining({
          text1: "Informação",
        }),
      );
    });
  });

  describe("Toast configurations", () => {
    it("should have longer visibility time for errors", () => {
      showErrorToast("error");
      showSuccessToast("success");

      const errorCall = (Toast.show as jest.Mock).mock.calls[0][0];
      const successCall = (Toast.show as jest.Mock).mock.calls[1][0];

      expect(errorCall.visibilityTime).toBeGreaterThan(successCall.visibilityTime);
    });

    it("should all use top position and same offset", () => {
      showErrorToast("error");
      showSuccessToast("success");
      showInfoToast("info");

      const calls = (Toast.show as jest.Mock).mock.calls;

      calls.forEach((call) => {
        expect(call[0].position).toBe("top");
        expect(call[0].topOffset).toBe(60);
      });
    });

    it("should all auto hide", () => {
      showErrorToast("error");
      showSuccessToast("success");
      showInfoToast("info");

      const calls = (Toast.show as jest.Mock).mock.calls;

      calls.forEach((call) => {
        expect(call[0].autoHide).toBe(true);
      });
    });
  });
});
