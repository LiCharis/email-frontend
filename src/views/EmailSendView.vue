<template>
  <el-row>
    <el-col :span="12">
      <el-button type="primary" @click="uploadFile">Upload Excel</el-button>
      <el-button type="success" @click="addNewRow">Add New Row</el-button>
      <input type="file" ref="fileInput" style="display: none" @change="handleFileUpload">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="email" label="Email"></el-table-column>
        <el-table-column prop="phone" label="Phone"></el-table-column>
        <el-table-column label="Actions">
          <template #default="scope">
            <el-button type="danger" @click="handleDelete(scope.$index)">Delete</el-button>
            <el-button type="primary" @click="editRow(scope.$index)">Edit</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
    <el-col :span="12">
      <el-form :model="emailForm">
        <el-form-item label="Title">
          <el-input v-model="emailForm.title"></el-input>
        </el-form-item>
        <el-form-item label="Content">
          <el-input type="textarea" v-model="emailForm.content"></el-input>
        </el-form-item>
        <el-form-item label="Attachment">
          <el-upload :action="null" :on-change="handleAttachmentChange">
            <el-button type="primary">Upload Attachment</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="sendEmail">Send Email</el-button>
        </el-form-item>
      </el-form>
      <el-dialog
          v-model="isDialogVisible"
          title="修改数据"
          width="500"
      >
        <el-form :model="editForm">
          <el-form-item label="Email">
            <el-input v-model="editForm.email"></el-input>
          </el-form-item>
          <el-form-item label="Phone">
            <el-input v-model="editForm.phone"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="isDialogVisible=false">取消</el-button>
          <el-button type="primary" @click="saveEdit">保存</el-button>
        </div>
      </el-dialog>
      <el-dialog
          v-model="isNewRowDialogVisible"
          title="添加数据"
          width="500"
      >
        <el-form :model="newRowForm">
          <el-form-item label="Email">
            <el-input v-model="newRowForm.email"></el-input>
          </el-form-item>
          <el-form-item label="Phone">
            <el-input v-model="newRowForm.phone"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="isNewRowDialogVisible=false">取消</el-button>
          <el-button type="primary" @click="saveNewRow">确定</el-button>
        </div>
      </el-dialog>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref } from 'vue';
import * as XLSX from 'xlsx';
import axios from 'axios';

// 表单和数据管理
const fileInput = ref(null);
const tableData = ref([]);
const editForm = ref({ email: '', phone: '' });
const newRowForm = ref({ email: '', phone: '' });
const emailForm = ref({
  title: '',
  content: '',
  attachment: null
});
const isDialogVisible = ref(false);
const isNewRowDialogVisible = ref(false);
const currentEditIndex = ref(-1);

const uploadFile = () => {
  if (fileInput.value) {
    fileInput.value.click();
  }
};

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = (e) => {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: 'array' });
    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

    tableData.value = jsonData.slice(1).map((row) => ({
      email: row[0],
      phone: row[1]
    }));
  };

  reader.readAsArrayBuffer(file);
};

const handleDelete = (index) => {
  tableData.value.splice(index, 1);
};

const editRow = (index) => {
  currentEditIndex.value = index;
  editForm.value = { ...tableData.value[index] };
  isDialogVisible.value = true;
  console.log(isDialogVisible.value)
};

const saveEdit = () => {
  if (currentEditIndex.value !== -1) {
    tableData.value[currentEditIndex.value] = { ...editForm.value };
  }
  isDialogVisible.value = false;
};

const addNewRow = () => {
  newRowForm.value = { email: '', phone: '' };
  isNewRowDialogVisible.value = true;
};

const saveNewRow = () => {
  tableData.value.push({ ...newRowForm.value });
  isNewRowDialogVisible.value = false;
};

const handleAttachmentChange = (file) => {
  emailForm.value.attachment = file.raw;
};

const sendEmail = async () => {
  const formData = new FormData();
  formData.append('title', emailForm.value.title);
  formData.append('content', emailForm.value.content);
  formData.append('attachment', emailForm.value.attachment);
  let datas = []

  tableData.value.forEach((row, index) => {
    datas.push({email:row.email,phone:row.phone});
  });
  formData.append("statusLogsAddRequests",JSON.stringify(datas));

  try {
    await axios.post('/your-backend-endpoint', formData);
    alert('邮件发送成功!');
    //数据置空
    tableData.value = [];
  } catch (error) {
    console.error(error);
  }
};
</script>

<style scoped>
/* 你可以在这里添加一些局部范围的样式 */
</style>