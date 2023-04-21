import { useRouter } from "vue-router";

export default function useNavigateTo() {
  const router = useRouter();

  const goTo = (name: string, params?: any) => router.push({ name, params });
  const goBack = () => router.go(-1);

  return { goTo, goBack };
}
