<template>
  <v-card color="primary" variant="flat" class="ma-0 pa-0" width="100vw">
    <v-tabs v-model="tab" align-tabs="title">
      <v-tab value="departaments"> Департаменты </v-tab>
      <v-tab value="machines"> Машины </v-tab>
      <v-tab value="workers"> Работники </v-tab>
      <v-tab value="defect"> Дефекты </v-tab>
    </v-tabs>
    <v-window v-model="tab">
      <v-window-item value="departaments">
        <v-card flat>
          <div class="d-flex jsutify-start my-7">
            <v-btn @click="refreshDepartaments" class="mx-5" color="primary"
              >Обновить</v-btn
            >
            <v-btn
              :loading="isDepartamentAddLoading"
              class="mx-5"
              color="primary"
              >Добавить
              <v-dialog
                v-model="departamentDialog"
                activator="parent"
                width="auto"
              >
                <v-card class="px-15 py-10">
                  <v-card-title>{{
                    editDepartamentId
                      ? "Редактировать департамент"
                      : "Новый департамент"
                  }}</v-card-title>
                  <v-form ref="departamentForm">
                    <v-text-field
                      class="my-2"
                      :rules="requiredRule"
                      variant="outlined"
                      label="Логин"
                      color="primary"
                      v-model="addDepartamentDto.name"
                    />
                  </v-form>

                  <v-card-actions class="d-flex justify-center">
                    <v-btn
                      variant="outlined"
                      color="primary"
                      @click="closeDepartamentDialog"
                      >Закрыть</v-btn
                    >
                    <v-btn
                      variant="outlined"
                      class="mx-5"
                      color="primary"
                      :loading="isDepartamentAddLoading"
                      @click="addDepartament"
                      >{{ editDepartamentId ? "Обновить" : "Добавить" }}</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-btn>
            <v-btn
              :loading="isDepartamentDeleteLoading"
              color="primary"
              @click="deleteDepartaments"
              >Удалить</v-btn
            >
          </div>
          <v-data-table
            v-model="selectedDepartaments"
            show-select
            :loading="isDepartamentLoading"
            :items="departaments"
            :headers="departamentsHeaders"
          >
            <template v-slot:[`item.workersCount`]="{ item }">
              <span>{{ item.users?.length || 0 }}</span>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon icon="mdi-pencil" @click="startEdit(item)" />
            </template>
          </v-data-table>
        </v-card>
      </v-window-item>
      <v-window-item value="machines">
        <v-card flat>
          <div class="d-flex jsutify-start my-7">
            <v-btn @click="refreshMachines" class="mx-5" color="primary"
              >Обновить</v-btn
            >
            <v-btn :loading="isMachineAddLoading" class="mx-5" color="primary"
              >Добавить
              <v-dialog v-model="machineDialog" activator="parent" width="auto">
                <v-card class="px-15 py-10">
                  <v-card-title>{{
                    editMachineId ? "Редактировать машину" : "Новая машина"
                  }}</v-card-title>
                  <v-form ref="machineForm">
                    <v-text-field
                      class="my-2"
                      :rules="requiredRule"
                      variant="outlined"
                      label="Название"
                      color="primary"
                      v-model="addMachineDto.name"
                    />
                    <v-text-field
                      class="my-2"
                      :rules="requiredRule"
                      variant="outlined"
                      label="Описание"
                      color="primary"
                      v-model="addMachineDto.description"
                    />
                    <v-select
                      class="my-2"
                      :rules="requiredRule"
                      variant="outlined"
                      label="Департамент"
                      color="primary"
                      :items="departaments"
                      item-title="name"
                      item-value="id"
                      v-model="addMachineDto.departamentId"
                    />
                  </v-form>

                  <v-card-actions class="d-flex justify-center">
                    <v-btn
                      variant="outlined"
                      color="primary"
                      @click="closeMachineDialog"
                      >Закрыть</v-btn
                    >
                    <v-btn
                      variant="outlined"
                      class="mx-5"
                      color="primary"
                      :loading="isMachineAddLoading"
                      @click="addMachine"
                      >{{ editMachineId ? "Обновить" : "Добавить" }}</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-btn>
            <v-btn
              :loading="isMachineDeleteLoading"
              color="primary"
              @click="deleteMachines"
              >Удалить</v-btn
            >
          </div>
          <v-data-table
            v-model="selectedMachines"
            show-select
            :loading="isMachineLoading"
            :items="machines"
            :headers="machinesHeaders"
          >
            <template v-slot:[`item.isActive`]="{ item }">
              <span>{{ item.raw.isActive ? "Да" : "Нет" }}</span>
            </template>
            <template v-slot:[`item.createdAt`]="{ value }">
              <span>{{ moment(value).format("DD-MM-YY") }}</span>
            </template>
            <template v-slot:[`item.updatedAt`]="{ value }">
              <span>{{ moment(value).format("DD-MM-YY") }}</span>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon
                @click="toggleMachine(item)"
                size="large"
                class="mr-5"
                :icon="
                  !item.raw.isActive
                    ? 'mdi-toggle-switch-off'
                    : 'mdi-toggle-switch'
                "
              ></v-icon>
              <v-icon icon="mdi-pencil" @click="startEditMachine(item)" />
            </template>
          </v-data-table>
        </v-card>
      </v-window-item>
      <v-window-item value="workers">
        <v-card flat>
          <div class="d-flex jsutify-start my-7">
            <v-btn @click="refreshUsers" class="mx-5" color="primary"
              >Обновить</v-btn
            >
            <v-btn :loading="isUserAddLoading" class="mx-5" color="primary"
              >Добавить
              <v-dialog v-model="userDialog" activator="parent" width="auto">
                <v-card class="px-15 py-10">
                  <v-card-title>{{ "Новый работник" }}</v-card-title>
                  <v-form ref="userForm">
                    <v-text-field
                      class="my-2"
                      :rules="requiredRule"
                      variant="outlined"
                      label="Логин"
                      color="primary"
                      v-model="addUserDto.login"
                    />
                    <v-text-field
                      class="my-2"
                      :rules="requiredRule"
                      variant="outlined"
                      label="Пароль"
                      color="primary"
                      v-model="addUserDto.password"
                    />
                    <v-select
                      class="my-2"
                      :rules="requiredRule"
                      variant="outlined"
                      label="Роль"
                      color="primary"
                      :items="['user', 'admin']"
                      v-model="addUserDto.role"
                    />
                    <v-select
                      class="my-2"
                      :rules="requiredRule"
                      variant="outlined"
                      label="Департамент"
                      color="primary"
                      :items="departaments"
                      item-title="name"
                      item-value="id"
                      v-model="addUserDto.departamentId"
                    />
                  </v-form>

                  <v-card-actions class="d-flex justify-center">
                    <v-btn
                      variant="outlined"
                      color="primary"
                      @click="closeUserDialog"
                      >Закрыть</v-btn
                    >
                    <v-btn
                      variant="outlined"
                      class="mx-5"
                      color="primary"
                      :loading="isUserAddLoading"
                      @click="addUser"
                      >{{ "Добавить" }}</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-btn>
            <v-btn
              :loading="isUserDeleteLoading"
              color="primary"
              @click="deleteUsers"
              >Удалить</v-btn
            >
          </div>
          <v-data-table
            v-model="selectedUsers"
            show-select
            :loading="isUserLoading"
            :items="users"
            :headers="userHeaders"
          >
          </v-data-table>
        </v-card>
      </v-window-item>
      <v-window-item value="defect">
        <v-card flat>
          <div class="d-flex jsutify-start my-7">
            <v-btn @click="refreshDefects" class="mx-5" color="primary"
              >Обновить</v-btn
            >
          </div>
          <v-data-table
            :loading="isDefectLoading"
            :items="defects"
            :headers="defectsHeaders"
          >
            <template v-slot:[`item.isResolved`]="{ item }">
              <span>{{ item.raw.isResolved ? "Да" : "Нет" }}</span>
            </template>
            <template v-slot:[`item.createdAt`]="{ value }">
              <span>{{ moment(value).format("DD-MM-YY") }}</span>
            </template>
            <template v-slot:[`item.updatedAt`]="{ value }">
              <span>{{ moment(value).format("DD-MM-YY") }}</span>
            </template>
          </v-data-table>
        </v-card>
      </v-window-item>
    </v-window>
  </v-card>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import AddDepartamentDto from "@/types/dto/departaments/AddDepartamentDto";
import UpdateDepartamentDto from "@/types/dto/departaments/UpdateDepartamentDto";
import AddMachineDto from "@/types/dto/machines/AddMachineDto";
import UpdateMachineDto from "@/types/dto/machines/UpdateMachineDto";
import AddUserDto from "@/types/dto/users/AddUserDto";
import moment from "moment";

const store = useStore();
const tab = ref(0);
onMounted(() => {
  store.dispatch("departaments/fetch");
  store.dispatch("machines/fetch");
  store.dispatch("users/fetch");
  store.dispatch("defects/fetch");
});
const requiredRule: any = [(val: string) => !!val || "Поле обязательно!"];

const selectedDepartaments = ref<string[]>([]);
const departamentForm = ref<any | null>(null);
const departamentDialog = ref(false);
const editDepartamentId = ref<string | null>(null);
const addDepartamentDto = ref<AddDepartamentDto>({
  name: "",
});

const departamentsHeaders: any = [
  { title: "Имя", value: "name" },
  {
    title: "Количество работников",
    value: "workersCount",
    key: "workersCount",
  },
  {
    title: "",
    value: "actions",
    key: "actions",
  },
];

const addDepartament = async () => {
  if (!(await departamentForm.value?.validate()).valid) {
    return;
  }

  try {
    if (editDepartamentId.value) {
      const dto: UpdateDepartamentDto = {
        ...addDepartamentDto.value,
        id: editDepartamentId.value,
      };
      await store.dispatch("departaments/update", dto);
    } else {
      await store.dispatch("departaments/add", addDepartamentDto.value);
    }
  } finally {
    closeDepartamentDialog();
  }
};

const refreshDepartaments = () => {
  store.dispatch("departaments/refresh");
};

const deleteDepartaments = () => {
  store.dispatch("departaments/deletedepartaments", selectedDepartaments.value);
};

const startEdit = (item: any) => {
  editDepartamentId.value = item.value;
  addDepartamentDto.value = {
    ...departaments.value.find((d: any) => d.id === editDepartamentId.value),
  };
  departamentDialog.value = true;
};

const closeDepartamentDialog = () => {
  departamentDialog.value = false;
  editDepartamentId.value = null;
  addDepartamentDto.value = { name: "" };
};

const departaments = computed(() => store.getters["departaments/departaments"]);
const isDepartamentDeleteLoading = computed(
  () => store.getters["defects/isDeleteLoading"]
);
const isDepartamentAddLoading = computed(
  () => store.getters["departaments/isAddLoading"]
);
const isDepartamentLoading = computed(
  () => store.getters["departaments/isLoading"]
);

const selectedMachines = ref<string[]>([]);
const machineForm = ref<any | null>(null);
const machineDialog = ref(false);
const editMachineId = ref<string | null>(null);
const addMachineDto = ref<AddMachineDto>({
  name: "",
  description: "",
});

const machinesHeaders: any = [
  { title: "Имя", value: "name" },
  { title: "Описание", value: "description" },
  { value: "departament.name", title: "Департамент" },
  { value: "isActive", title: "Активна", key: "isActive" },
  { value: "createdAt", title: "Создана", key: "createdAt" },
  { value: "updateAt", title: "Последнее обновление", key: "updatedAt" },
  {
    title: "",
    value: "actions",
    key: "actions",
    width: "150px",
  },
];

const addMachine = async () => {
  if (!(await machineForm.value?.validate()).valid) {
    return;
  }

  try {
    if (editMachineId.value) {
      const dto: UpdateMachineDto = {
        ...addMachineDto.value,
        id: editMachineId.value,
      };
      await store.dispatch("machines/update", dto);
    } else {
      await store.dispatch("machines/add", addMachineDto.value);
    }
  } finally {
    closeMachineDialog();
  }
};

const refreshMachines = () => {
  store.dispatch("machines/refresh");
};

const deleteMachines = () => {
  store.dispatch("machines/deletemachines", selectedMachines.value);
};

const startEditMachine = (item: any) => {
  editMachineId.value = item.value;
  addMachineDto.value = {
    ...machines.value.find((d: any) => d.id === editMachineId.value),
  };
  machineDialog.value = true;
};

const closeMachineDialog = () => {
  machineDialog.value = false;
  editMachineId.value = null;
  addMachineDto.value = { name: "", description: "" };
};

const toggleMachine = async (item: any) => {
  const machine = machines.value.find((d: any) => d.id === item.value);

  const dto: UpdateMachineDto = {
    ...machine,
    isActive: !machine.isActive || false,
    id: item.value,
  };
  await store.dispatch("machines/update", dto);
};

const machines = computed(() => store.getters["machines/machines"]);
const isMachineDeleteLoading = computed(
  () => store.getters["machines/isDeleteLoading"]
);
const isMachineAddLoading = computed(
  () => store.getters["machines/isAddLoading"]
);
const isMachineLoading = computed(() => store.getters["machines/isLoading"]);

const selectedUsers = ref<string[]>([]);
const userForm = ref<any | null>(null);
const userDialog = ref(false);
const addUserDto = ref<AddUserDto>({
  login: "",
  role: "user",
  password: "",
});

const userHeaders: any = [
  { title: "Login", value: "login" },
  { value: "departament.name", title: "Департамент" },
  { title: "Роль", value: "role" },
];

const addUser = async () => {
  if (!(await userForm.value?.validate()).valid) {
    return;
  }

  try {
    await store.dispatch("users/add", addUserDto.value);
  } finally {
    closeUserDialog();
  }
};

const refreshUsers = () => {
  store.dispatch("users/refresh");
};

const deleteUsers = () => {
  store.dispatch("users/deleteusers", selectedUsers.value);
};
const closeUserDialog = () => {
  userDialog.value = false;
  addUserDto.value = { login: "", role: "user", password: "" };
};

const users = computed(() => store.getters["users/users"]);
const isUserDeleteLoading = computed(
  () => store.getters["users/isDeleteLoading"]
);
const isUserAddLoading = computed(() => store.getters["users/isAddLoading"]);
const isUserLoading = computed(() => store.getters["user/isLoading"]);

const defectsHeaders: any = [
  { title: "Имя", value: "name" },
  { title: "Описание", value: "description" },
  { title: "Решена", value: "isResolved", key: "isResolved" },
  { title: "Создана", value: "createdAt", key: "createdAt" },
  { title: "Обновлена", value: "updateAt", key: "updateAt" },
];
const refreshDefects = () => {
  store.dispatch("defects/refresh");
};

const defects = computed(() => store.getters["defects/defects"]);
const isDefectLoading = computed(() => store.getters["defects/isLoading"]);
</script>
