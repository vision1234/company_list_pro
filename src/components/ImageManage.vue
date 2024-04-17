<template>
  <div>
    <div class="container">
      <div class="handle-box">
        <el-select
          v-model="query.cate"
          placeholder="分类"
          class="handle-select mr10"
        >
          <el-option
            :key="index"
            :label="t"
            :value="t"
            v-for="(t, index) in this.cateList"
          ></el-option>
        </el-select>
        <el-input
          v-model="query.kw"
          placeholder="关键词"
          class="handle-input mr10"
        ></el-input>
        <el-button type="primary" :icon="Search" @click="handleSearch"
          >搜索</el-button
        >
        <el-button
          type="primary"
          :icon="Plus"
          tag="a"
          href="http://file.yiomiya.cn/"
          target="_blank"
          class="no-underline"
          >新增</el-button
        >
      </div>
      <el-table
        :data="requestData.tableData"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
      >
        <el-table-column
          prop="image_path"
          label="图片路径"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="thumbnail_path"
          label="缩略图路径"
        ></el-table-column>
        <el-table-column
          label="分类"
          prop="cate"
          align="center"
        ></el-table-column>
        <el-table-column label="缩略图" align="center">
          <template #default="scope">
            <el-image
              class="table-td-thumb"
              :src="`${this.$baseURL}${scope.row.thumbnail_path}`"
              :z-index="10"
              :preview-src-list="[`${this.$baseURL}${scope.row.image_path}`]"
              fit="contain"
              preview-teleported
              lazy
            >
            </el-image>
          </template>
        </el-table-column>

        <el-table-column label="标签" align="center">
          <template #default="scope">
            <el-tag
              v-for="(t, index) in scope.row.tag"
              :key="index"
              :type="tags[index % tags.length].type"
              >{{ t }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column label="创建时间">
          <template #default="scope">
            {{ formatDate(scope.row.create_time) }}
          </template>
        </el-table-column>
        <el-table-column label="修改时间">
          <template #default="scope">
            {{ formatDate(scope.row.update_time) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="220" align="center">
          <template #default="scope">
            <el-button
              type="primary"
              text
              :icon="Edit"
              @click="handleEdit(scope.row)"
            >
              编辑
            </el-button>
            <el-button
              type="danger"
              text
              :icon="Delete"
              class="red"
              @click="handleDelete(scope.row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          layout="total, prev, pager, next"
          :current-page="this.query.pageIndex"
          :page-size="this.requestData.pageSize"
          :total="this.requestData.pageTotal"
          @current-change="handlePageChange"
        ></el-pagination>
      </div>
    </div>

    <!-- 编辑弹出框 -->
    <el-dialog title="编辑" v-model="editVisible" width="30%">
      <el-form label-width="70px">
        <el-form-item label="id" v-if="showVisibleItem">
          <el-label :data="form.image_path"></el-label>
        </el-form-item>
        <el-form-item label="分类">
          <el-select
            v-model="form.cate"
            placeholder="分类"
            class="editSelect mr10"
          >
            <el-option
              :key="index"
              :label="t"
              :value="t"
              v-for="(t, index) in this.cateList"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标签">
          <el-input v-model="form.tag" class="editInput"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveEdit">确 定</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 删除确认 -->
    <el-dialog
      title="确认删除"
      v-model="deleteDialogVisible"
      @close="resetDeleteDialog"
      width="30%"
    >
      <span class="delMess">确定要删除吗？</span>
      <span class="dialog-footer">
        <el-button @click="resetDeleteDialog">取消</el-button>
        <el-button type="primary" @click="confirmDelete">确认</el-button>
      </span>
    </el-dialog>
    <!-- 新增弹出框 -->
    <el-dialog title="新增" v-model="addVisible" width="30%"> </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      query: { kw: "", cate: "", pageIndex: 1, pageSize: 1 },
      requestData: {
        tableData: [
          {
            cate: "游戏",
            create_time: "Sun, 26 Nov 2023 06:01:07 GMT",
            image_path:
              "static/images/游戏/170019434981901f7760262e6b9f52f8f44c78b4ac841e836f1017a2bf4e5460c2b344ec6ffd5.0.png",
            tag: ["原神", "宵宫"],
            thumbnail_path:
              "static/thumbnail/游戏/170019434981901f7760262e6b9f52f8f44c78b4ac841e836f1017a2bf4e5460c2b344ec6ffd5.0.png",
          },
        ],
        pageTotal: 1,
        pageIndex: 1,
        pageSize: 12,
      },
      tags: [
        { label: "Tag 1", type: "primary" },
        { label: "Tag 2", type: "warning" },
        { label: "Tag 3", type: "success" },
        { label: "Tag 4", type: "danger" },
      ],
      editVisible: false,
      form: {
        cate: "",
        tag: [],
      },
      cateList: [],
      showVisibleItem: false,
      deleteDialogVisible: false,
      deleteItem: {},
    };
  },
  mounted() {
    // 在组件加载时从后端获取数据
    this.fetchItems();
    this.fetchCates();
    // console.log(tableData);
  },
  methods: {
    formatDate(dateString) {
      if (!dateString) {
        return ""; // 或者你想要显示的默认文本
      }
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      const seconds = date.getSeconds().toString().padStart(2, "0");

      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    },
    async fetchItems() {
      try {
        console.log(this.$baseURL);
        const response = await axios.get(this.$baseURL + "search", {
          params: {
            keyword: this.query.kw,
            cate: this.query.cate,
            page: this.query.pageIndex,
          },
        }); // 替换成你的后端接口路径
        this.requestData = {
          tableData: response.data.data,
          pageTotal: response.data.total_pages,
        };
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    },
    async fetchCates() {
      try {
        console.log(this.$baseURL);
        const response = await axios.get(this.$baseURL + "getCate"); // 替换成你的后端接口路径
        this.cateList = response.data;
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    },
    async handlePageChange(newPage) {
      this.query.pageIndex = newPage;
      this.fetchItems();
    },
    async handleSearch() {
      this.fetchItems();
    },
    async handleEdit(row) {
      this.form.cate = row.cate;
      this.form.tag = row.tag;
      this.form.image_path = row.image_path;
      this.editVisible = true;
    },
    async saveEdit() {
      this.editVisible = false;
      this.updateItem(this.form);
      this.fetchItems();
    },
    async updateItem(item) {
      try {
        console.log(item);
        const response = await axios.post(`${this.$baseURL}/edit`, item); // 替换成你的后端接口路径
        const updatedItem = response.data;
        console.log(updatedItem);
        // if (updatedItem.success && updatedItem.modified_count) {
        //   alert("修改成功");
        // } else if (!updatedItem.success && !updatedItem.modified_count) {
        //   alert("没有修改");
        // } else {
        //   alert("修改失败");
        // }
      } catch (error) {
        console.error("Error updating item:", error);
      }
    },
    // handleEdit

    //
    // async addItem() {
    //   try {
    //     const response = await axios.post('/api/items', { name: this.newItem }); // 替换成你的后端接口路径
    //     this.items.push(response.data);
    //     this.newItem = '';
    //   } catch (error) {
    //     console.error('Error adding item:', error);
    //   }
    // },
    handleDelete(deleteItem) {
      this.deleteDialogVisible = true;
      this.deleteItem = deleteItem;
    },

    // 确认删除
    confirmDelete() {
      // 执行删除逻辑，比如调用 API 删除数据
      // ...
      this.delItem({
        image_path: this.deleteItem.image_path,
        thumbnail_path: this.deleteItem.thumbnail_path,
      });
      // 关闭删除确认对话框
      this.fetchItems();
    },

    // 重置删除确认对话框状态
    resetDeleteDialog() {
      this.deleteDialogVisible = false;
    },
    async delItem(deleteItem) {
      try {
        await axios.post(`${this.$baseURL}del`, deleteItem); // 替换成你的后端接口路径
        // if (response.data.deleted_count) {
        //   alert("删除成功");
        // }else
        //   alert("删除失败");
      } catch (error) {
        console.error("Error deleting item:", error);
      }
      this.deleteDialogVisible = false;
    },
    // async updateItem(item) {
    //   try {
    //     const newName = prompt('Enter the new name:', item.name);
    //     if (newName !== null) {
    //       const response = await axios.put(`/api/items/${item.id}`, { name: newName }); // 替换成你的后端接口路径
    //       const updatedItem = response.data;
    //       const index = this.items.findIndex(i => i.id === updatedItem.id);
    //       if (index !== -1) {
    //         this.items.splice(index, 1, updatedItem);
    //       }
    //     }
    //   } catch (error) {
    //     console.error('Error updating item:', error);
    //   }
    // },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
}

.table {
  width: 100%;
  font-size: 14px;
}

.red {
  color: #f56c6c;
}

.mr10 {
  margin-right: 10px;
}

.table-td-thumb {
  display: block;
  margin: auto;
  width: 100%;
  height: 160px;
  /* align-items: center; */
}

.no-underline {
  text-decoration: none;
}
.editInput {
  width: 40%;
}
.editSelect {
  width: 40%;
}
</style>
