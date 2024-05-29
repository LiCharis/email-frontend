<template>
  <div>
    <h1>Welcome to Home</h1>
    <el-dialog
        v-model="dialogVisible"
        title="Tips"
        width="500"
        :before-close="handleClose"
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
        <el-button @click="isDialogVisible=false">Cancel</el-button>
        <el-button type="primary" @click="saveEdit">Save</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
</script>