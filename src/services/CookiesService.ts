import Cookies from "js-cookie";

export default class CookiesService {
  private static COOKIES_NAME = "biznesExpert-token-local";

  static setToken(token: string, saveLong = false) {
    Cookies.set(this.COOKIES_NAME, token);
  }

  static resetToken() {
    Cookies.set(this.COOKIES_NAME, "");
  }

  static getToken() {
    return Cookies.get(this.COOKIES_NAME);
  }
}
