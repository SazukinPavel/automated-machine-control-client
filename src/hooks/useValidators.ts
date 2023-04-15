import { useRouter } from "vue-router";
import { ref } from "vue";

export default function useValidators() {
  const required = ref((val: string) => !!val || "Поле обязательное");

  return { required };
}
