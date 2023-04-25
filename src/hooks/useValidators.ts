import { useRouter } from "vue-router";
import { ref } from "vue";

export default function useValidators() {
  const requiredRule = ref((val: string) => !!val || "Поле обязательное");

  const yearRule = ref((val: number) => {
    if (val > 3000 || val < 1900) {
      return "Некоректный год";
    }

    return true;
  });

  return { requiredRule, yearRule };
}
