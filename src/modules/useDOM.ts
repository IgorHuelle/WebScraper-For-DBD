import axios from "axios";
import { JSDOM } from "jsdom";

export const useDOM = async (url: string) => {
  const request = await axios.get<string>(url);
  const vDOM = new JSDOM(request.data);

  return vDOM.window.document;
};