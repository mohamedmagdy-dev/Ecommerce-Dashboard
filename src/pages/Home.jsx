// redux
import { useSelector } from "react-redux";
export default function Home() {
  const { user } = useSelector((state) => state.user);
  return;
}
