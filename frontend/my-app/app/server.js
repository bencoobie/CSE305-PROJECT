import axios from "axios";

export async function accidents() {
  return await axios.get("http://localhost:3000/accident");
}
