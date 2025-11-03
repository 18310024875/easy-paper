<template>
  <ul class="component-control">
    <template v-for="(item, name) in options" :key="name">
      <!-- input-model -->
      <li v-if="name === 'v-model'" style="margin-bottom: 8px">
        <div style="margin-bottom: 4px">
          <span style="font-weight: bold; color: #409eff"> v-model-name </span>
        </div>
        <div class="el-input el-input-group el-input-group--prepend">
          <div class="el-input-group__prepend">formData.</div>
          <div class="el-input__wrapper" tabindex="-1">
            <input
              class="el-input__inner"
              type="input"
              autocomplete="off"
              tabindex="0"
              :value="item.modelName"
              @blur="(...vals) => vModelBlur(item, ...vals)"
            />
          </div>
        </div>
      </li>
      <!-- option-labels  -->
      <li v-if="item.widget === 'option-labels'" style="margin-bottom: 8px">
        <div style="margin-bottom: 4px">
          <span style="font-weight: bold">{{ name }}</span>
        </div>
        <el-input
          v-model="item.string"
          style="margin-bottom: 4px"
          class="option-input"
          placeholder="input option name"
        />
        <el-button type="primary" size="small" @click="item.add(item)">
          confirm
        </el-button>
        <el-button size="small" @click="item.string = ''">cancel</el-button>
        <div>
          <el-tag
            v-for="(tag, i) in item.value"
            :key="i"
            class="mx-1"
            style="margin: 5px"
            closable
            @close="item.delete(item, i)"
          >
            {{ tag.value }}
            <br />
          </el-tag>
        </div>
      </li>
      <!-- file  -->
      <li v-if="item.widget === 'file'" style="margin-bottom: 8px">
        <div style="margin-bottom: 4px">
          <span style="font-weight: bold">{{ name }}</span>
        </div>
        <input
          type="file"
          accept="image/*"
          @change="changeFile(item, $event)"
        />
      </li>
      <!-- input  -->
      <li v-if="item.widget === 'input'" style="margin-bottom: 8px">
        <div style="margin-bottom: 4px">
          <span style="font-weight: bold">{{ name }}</span>
          <span style="color: #888"> ({{ item.type || "string" }})</span>
        </div>
        <el-input
          type="input"
          v-model="item.value"
          :placeholder="item.placeholder"
        />
      </li>
      <!-- textarea -->
      <li v-if="item.widget === 'textarea'" style="margin-bottom: 8px">
        <div style="margin-bottom: 4px">
          <span style="font-weight: bold">{{ name }}</span>
          <span style="color: #888"> ({{ item.type || "string" }})</span>
        </div>
        <el-input
          type="textarea"
          v-model="item.value"
          rows="3"
          autosize
          :placeholder="item.placeholder"
        />
      </li>
      <!-- number -->
      <li v-if="item.widget === 'number'" style="margin-bottom: 8px">
        <div style="margin-bottom: 4px">
          <span style="font-weight: bold">{{ name }}</span>
          <span style="color: #888"> ({{ item.type || "number" }})</span>
        </div>
        <el-input-number v-model="item.value" :min="0" />
      </li>
      <!-- select  -->
      <li v-if="item.widget === 'select'" style="margin-bottom: 8px">
        <div style="margin-bottom: 4px">
          <span style="font-weight: bold">{{ name }}</span>
          <span style="color: #888"> ({{ item.type || "string" }})</span>
        </div>
        <el-select v-model="item.value">
          <el-option v-for="name in item.options" :key="name" :value="name">
            {{ name || "空" }}
          </el-option>
        </el-select>
      </li>
      <!-- boolean  -->
      <li v-if="item.widget === 'boolean'" style="margin-bottom: 5px">
        <div style="margin-bottom: 4px">
          <span style="font-weight: bold">{{ name }}</span>
          <span style="color: #888"> ({{ item.type || "boolean" }})</span>
        </div>
        <el-radio-group v-model="item.value">
          <el-radio :label="true">true</el-radio>
          <el-radio :label="false">false</el-radio>
        </el-radio-group>
      </li>

      <!-- 自定义代码 返回对象 -->
      <li v-if="item.widget === 'function-return'">
        <div style="margin-bottom: 5px">
          <span style="font-weight: bold">{{ name }}</span>
          <span style="color: #888">
            ({{ item.type || " object | array" }})</span
          >
        </div>
        <Codemirror
          v-model="item.code"
          placeholder="请输入内容"
          :style="{ minHeight: '300px' }"
          :autofocus="false"
          :tabSize="2"
          :extensions="extensions"
          @blur="functionReturnBlur(item)"
        />
      </li>

      <!-- 自定义代码 函数 -->
      <li v-if="item.widget === 'function'">
        <div style="margin-bottom: 5px">
          <span style="font-weight: bold">{{ name }}</span>
          <span style="color: #888"> (function)</span>
        </div>
        <Codemirror
          v-model="item.code"
          placeholder="请输入内容"
          :style="{ minHeight: '300px' }"
          :autofocus="false"
          :tabSize="2"
          :extensions="extensions"
          @blur="functionBlur(item)"
        />
      </li>
    </template>
  </ul>
</template>
<script>
import { Codemirror } from "vue-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
export default {
  props: {
    options: {
      type: Array,
    },
    valueObj: {
      type: Object,
    },
  },
  components: {
    Codemirror,
  },
  data() {
    return {
      extensions: [javascript(), oneDark],
    };
  },
  methods: {
    functionReturnBlur(item) {
      if (item?.code?.trim()) {
        try {
          const value = new Function("return" + item.code)();
          item.value = value;
        } catch (error) {
          console.error(error);
        }
      }
    },
    functionBlur(item) {},
    vModelBlur(item, e) {
      item.modelName = e.target.value;
    },
    changeFile(item, e) {
      let file = e.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        item.value = reader.result;
      };
      reader.onerror = (e) => console.error(e);
    },
  },
};
</script>

<style lang="less">
.component-control {
  .el-input-group__prepend {
    padding-left: 8px;
    padding-right: 5px;
  }
}
</style>
