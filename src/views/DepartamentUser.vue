<template>
  <v-card color="primary" variant="flat" class="ma-0 pa-0" width="100vw">
    <v-tabs v-model="tab" align-tabs="title">
      <v-tab value="machines"> Машины </v-tab>
      <v-tab value="defect"> Дефекты </v-tab>
    </v-tabs>
    <v-window v-model="tab">
      <v-window-item value="machines">
        <v-dialog persistent v-model="defectDialog" width="auto">
          <v-card class="px-15 py-10">
            <v-card-title> Новый дефект </v-card-title>
            <v-form ref="defectForm">
              <v-text-field
                v-model="addDefectDto.name"
                label="Название:"
                :rules="requiredRule"
              ></v-text-field>
              <v-textarea
                v-model="addDefectDto.description"
                label="Описание:"
                :rules="requiredRule"
              ></v-textarea>
            </v-form>

            <v-card-actions class="d-flex justify-center">
              <v-btn
                variant="outlined"
                color="primary"
                @click="closeDefectDialog"
                >Закрыть</v-btn
              >
              <v-btn
                variant="outlined"
                class="mx-5"
                color="primary"
                :loading="isAddDefectLoading"
                @click="addDefect"
                >Добавить</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-card flat>
          <v-text-field v-model="searchParam" label="Найти" />
          <v-expansion-panels
            v-model="selectedMachine"
            class="mt-10"
            variant="accordion"
          >
            <v-expansion-panel
              v-for="machine in filtredMachines"
              :key="machine.id"
              :value="machine.id"
            >
              <v-expansion-panel-title>
                <v-row>
                  <v-col cols="11">
                    <span>{{ machine.name }}</span>
                  </v-col>
                  <v-col cols="1">
                    <v-chip :color="machine.isActive ? 'green' : 'red'">{{
                      machine.isActive ? "ON" : "OFF"
                    }}</v-chip>
                  </v-col>
                </v-row>
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <v-card flat>
                  <v-card-title class="text-h5 text-center"
                    >Описание</v-card-title
                  >
                  <v-card-text class="text-h6 mb-5">{{
                    machine.description
                  }}</v-card-text>
                  <v-divider class="border-opacity-100" color="primary" />
                  <div class="d-flex jsutify-start my-7">
                    <v-btn @click="refreshDefects" class="mx-5" color="primary"
                      >Обновить</v-btn
                    >
                    <v-btn
                      :loading="isAddDefectLoading"
                      @click="openDefectDialog(machine.id)"
                      class="mx-5"
                      color="primary"
                      >Добавить</v-btn
                    >
                  </div>
                  <v-data-table
                    :loading="isDefectLoading"
                    :items="defects"
                    :headers="defectsHeaders"
                    class="elevation-1 table"
                  >
                    <template v-slot:[`item.isResolved`]="{ item }">
                      <span>{{ item.raw.isResolved ? "Да" : "Нет" }}</span>
                    </template>
                    <template v-slot:[`item.createdAt`]="{ value }">
                      <span>{{
                        moment(value).format("DD-MM-YY hh-mm-ss")
                      }}</span>
                    </template>
                    <template v-slot:[`item.updatedAt`]="{ value }">
                      <span>{{
                        moment(value).format("DD-MM-YY hh-mm-ss")
                      }}</span>
                    </template>
                    <template v-slot:[`item.actions`]="{ item }">
                      <div class="d-flex justify-center align-center">
                        <v-btn
                          color="primary"
                          variant="outlined"
                          v-if="!item.raw.isResolved"
                          @click="closeDefect(machine.id, item.raw.id)"
                          >Закрыть</v-btn
                        >
                      </div>
                    </template>
                  </v-data-table>
                </v-card>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card>
      </v-window-item>
    </v-window>
  </v-card>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import moment from "moment";
import Machine from "@/types/busnes/Machine";
import AddDefectDto from "@/types/dto/defects/AddDefectDto";
import api from "@/api";
import UpdateDefectDto from "@/types/dto/defects/UpdateDefectDto";

const store = useStore();
const tab = ref(0);
const requiredRule: any = [(val: string) => !!val || "Поле обязательно!"];
const searchParam = ref("");

onMounted(() => {
  store.dispatch("machines/fetch");
});

const selectedMachine = ref<string>("");

const machines = computed<Machine[]>(() => store.getters["machines/machines"]);
// const isMachineLoading = computed(() => store.getters["machines/isLoading"]);
const filtredMachines = computed(() => {
  if (!searchParam.value) {
    return machines.value;
  }
  return machines.value.filter((m) => {
    return (
      m.id.toString().startsWith(searchParam.value) ||
      m.name.toLowerCase().startsWith(searchParam.value.toLowerCase()) ||
      m.description.toLowerCase().startsWith(searchParam.value.toLowerCase())
    );
  });
});

const defectForm = ref<any>();
const defectDialog = ref(false);
const addDefectDto = ref<AddDefectDto>({
  machineId: "",
  name: "",
  description: "",
});

const defectsHeaders: any = [
  { title: "Имя", value: "name" },
  { title: "Описание", value: "description" },
  {
    title: "Решён",
    value: "isResolved",
    key: "isResolved",
    class: "table-header",
  },
  {
    title: "Дата создания",
    value: "createdAt",
    key: "createdAt",
  },
  {
    title: "Дата последнего обновления",
    value: "updatedAt",
    key: "updatedAt",
  },
  {
    title: "Actions",
    value: "actions",
    key: "actions",
  },
];
const refreshDefects = () => {
  store.dispatch("defects/refresh");
};

const closeDefectDialog = () => {
  defectDialog.value = false;
  addDefectDto.value = { name: "", description: "", machineId: "" };
};

const openDefectDialog = (machineId: string) => {
  defectDialog.value = true;
  addDefectDto.value.machineId = machineId;
};

const addDefect = async () => {
  if (!(await defectForm.value?.validate()).valid) {
    return;
  }

  try {
    const response = await api.defects.add(addDefectDto.value);

    const realMachine = machines.value.find(
      (m) => m.id === addDefectDto.value.machineId
    );
    store.commit("machines/replaceMachines", {
      ...realMachine,
      defects: [...realMachine?.defects, response.data],
    });
    closeDefectDialog();
    store.commit("snackbar/showSnackbarSuccess", {
      message: "Дефект успешно добавлен",
    });
  } catch {
    store.commit("snackbar/showSnackbarError", {
      message: "Произошла ошибка при добавление дефекта",
    });
  }
};

const closeDefect = async (machineId: string, defectId: string) => {
  try {
    const updateDefectDto: UpdateDefectDto = {
      ...defects.value.find((d) => d.id === defectId),
      id: machineId,
      isResolved: true,
    };

    console.log(updateDefectDto);
    await api.defects.update(updateDefectDto);

    const realMachine = machines.value.find((m) => m.id === machineId);

    if (!realMachine) {
      throw new Error();
    }

    store.commit("machines/replaceMachines", {
      ...realMachine,
      defects: [
        ...realMachine?.defects.map((d) => {
          if (d.id === defectId) {
            d.isResolved = true;
          }
          return d;
        }),
      ],
    });
    store.commit("snackbar/showSnackbarSuccess", {
      message: "Дефект успешно устранён",
    });
  } catch (e) {
    console.log(e);
    store.commit("snackbar/showSnackbarError", {
      message: "Произошла ошибка при устранение дефекта",
    });
  }
};

const defects = computed(() => {
  if (!selectedMachine.value) {
    return [];
  }

  return machines.value?.find((m) => m.id === selectedMachine.value)?.defects;
});
const isDefectLoading = computed(() => store.getters["defects/isLoading"]);
const isAddDefectLoading = computed(
  () => store.getters["defects/isAddLoading"]
);
</script>
