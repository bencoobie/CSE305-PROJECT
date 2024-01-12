import Login from "@/components/Login/login";
import { NavigationMenuDemo } from "@/components/Navbar";

export default function LoginPage() {
  return (
    <div>
      <NavigationMenuDemo></NavigationMenuDemo>

      <Login className="mb-10"></Login>
    </div>
  );
}
