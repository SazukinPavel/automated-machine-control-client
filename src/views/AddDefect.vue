<template>
  <v-container
    v-if="!isFetchLoading"
    style="max-width: 1000px"
    class="pa-4 ma-auto mt-xl-15"
  >
    <page-title>
      {{
        isEdit ? "Редактирование неисправности" : "Добавление неисправности"
      }}</page-title
    >
    <v-form ref="defectForm">
      <v-autocomplete
        :disabled="!!props.isEdit"
        v-model="addDefectDto.machineId"
        :items="machines"
        label="Станок"
        item-value="id"
        item-title="fullName"
        :rules="[requiredRule]"
      >
      </v-autocomplete>
      <v-autocomplete
        ref="responsibleAutoComplete"
        v-model="addDefectDto.responsible"
        :items="users"
        label="Ответственный"
        :rules="[requiredRule]"
        item-value="id"
        item-title="login"
        multiple
      />
      <v-autocomplete
        v-model="addDefectDto.type"
        :items="types"
        item-title="name"
        item-value="id"
        label="Тип"
        :rules="[requiredRule]"
      />
      <v-text-field
        class="my-2"
        :rules="[requiredRule]"
        variant="outlined"
        label="Название"
        color="primary"
        v-model="addDefectDto.name"
      />
      <v-textarea
        class="my-2"
        variant="outlined"
        label="Описание"
        color="primary"
        v-model="addDefectDto.description"
      />
      <v-autocomplete
        :single-line="false"
        class="my-2"
        variant="outlined"
        label="Материалы"
        :items="consumables"
        item-title="name"
        item-value="id"
        multiple
        :rules="[requiredRule]"
        color="primary"
        v-model="addDefectDto.consumables"
      >
        <template v-slot:item="{ props, item }">
          <v-list-item
            v-bind="props"
            :title="item?.raw?.name"
            :subtitle="item?.raw?.type?.name"
          ></v-list-item>
        </template>
      </v-autocomplete>
      <v-text-field
        type="datetime-local"
        v-model="addDefectDto.decisionDate"
        :rules="[requiredRule]"
      />
    </v-form>
    <div class="d-flex justify-end align-center">
      <v-btn class="mx-5" :disabled="isAddLoading" @click="goBack">Назад</v-btn>
      <v-btn class="mx-5" :loading="isAddLoading" @click="add">{{
        props.isEdit ? "Обновить" : "Добавить"
      }}</v-btn>
    </div>
  </v-container>
  <loading v-else />
</template>

<script setup lang="ts">
import Loading from "@/components/loading.vue";
import { onMounted, defineProps, ref, computed } from "vue";
import useValidators from "@/hooks/useValidators";
import { useStore } from "vuex";
import useNavigateTo from "@/hooks/useNavigateTo";
import { useRoute } from "vue-router";
import AddDefectDto from "@/types/dto/defects/AddDefectDto";
import Machine from "@/types/busnes/Machine";
import User from "@/types/busnes/User";
import Consumable from "@/types/busnes/Consumable";
import PageTitle from "@/components/ui/pageTitle.vue";
import api from "@/api";
import useDateFormater from "@/hooks/useDateFormater";
import UpdateDefectDto from "@/types/dto/defects/UpdateDefectDto";

const props = defineProps({ isEdit: { type: Boolean, default: false } });

const store = useStore();
const route = useRoute();
const { goTo } = useNavigateTo();
const { requiredRule } = useValidators();
const { formatToInput } = useDateFormater();

const addDefectDto = ref<AddDefectDto>({});
const isAddLoading = ref(false);
const isFetchLoading = ref(false);
const defectForm = ref<any | null>(null);
const localConsumable = ref<Consumable[]>([]);

const machines = computed<Machine[]>(() =>
  store.getters["machines/machines"].map((m: Machine) => ({
    ...m,
    fullName: `${m.name} (${m.number})`,
  }))
);
const users = computed<User[]>(() => store.getters["users/users"]);
const consumables = computed<Consumable[]>(() =>
  store.getters["consumables/consumables"]
    .filter((d: Consumable) => d.isAvailable)
    .concat(...localConsumable.value)
);
const types = computed(() => store.getters["defectTypes/types"]);
const machineId = computed(() => route.query.machine?.toString());

const add = async () => {
  if (!(await defectForm.value.validate()).valid) {
    return;
  }
  isAddLoading.value = true;
  try {
    if (props.isEdit) {
      const updateDefectDto: UpdateDefectDto = { ...addDefectDto.value };
      await store.dispatch("defects/update", updateDefectDto);
    } else {
      await store.dispatch("defects/add", {
        ...addDefectDto.value,
        machineId: addDefectDto.value.machineId || machineId.value,
      });
    }
    store.commit("snackbar/showSnackbarSuccess", {
      message: `Неисправность ${
        props.isEdit ? "обновлена" : "добавлена"
      } успешно`,
    });
    goTo("MachinesDefects", { id: addDefectDto.value.machineId });
  } catch (e) {
    store.commit("snackbar/showSnackbarError", {
      message: `Произошла ошибка при ${
        props.isEdit ? "обновление" : "создании"
      } неисправности`,
    });
  } finally {
    isAddLoading.value = false;
  }
};

const goBack = () => {
  goTo(
    addDefectDto.value.machineId ? "MachinesDefects" : "LastDepartament",
    addDefectDto.value.machineId ? { id: addDefectDto.value.machineId } : {}
  );
};

onMounted(async () => {
  addDefectDto.value.machineId = machineId.value;

  isFetchLoading.value = true;
  try {
    await Promise.all([
      store.dispatch("machines/fetch"),
      store.dispatch("users/fetch"),
      store.dispatch("consumables/fetch"),
      store.dispatch("defectTypes/fetch"),
    ]);

    if (props.isEdit) {
      const defect = await api.defects.getById(route.params.id.toString());
      addDefectDto.value = {
        ...defect.data,
        type: defect.data.type.id,
        machineId: defect.data.machine?.id,
        decisionDate: formatToInput(defect.data.decisionDate),
        responsible: defect.data.responsible?.map((r) => r.id),
        consumables: defect.data.consumables?.map((r) => r.id),
      };
      localConsumable.value = defect.data.consumables;
    }
  } catch {
    store.commit("snackbar/showSnackbarError", {
      message: "Произошла ошибка при получение неисправности",
    });
    goBack();
  } finally {
    isFetchLoading.value = false;
  }
});
</script>

<style scoped></style>
