<template>
    <div class="custom-input">
        <span class="custom-input__label">{{ label }}</span>
        <label>
            <input
                ref="inputRef"
                :type="currentType"
                :placeholder="placeholder"
                :value="modelValue"
                @input="$emit('update:modelValue', $event.target.value)"
            />
        </label>
        <button v-if="type === 'password'" class="custom-input__btn" type="button" @click="toggleType">
            <inline-svg :src="eyeCloseIcon" />
            <inline-svg :src="eyeOpenIcon" />
        </button>
    </div>
</template>

<script setup>
import { ref } from 'vue'
const eyeCloseIcon = new URL('@/assets/svg/eye-close.svg', import.meta.url).href
const eyeOpenIcon = new URL('@/assets/svg/eye-open.svg', import.meta.url).href

const props = defineProps({
    label: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    type: { type: String, default: 'text' },
    modelValue: { type: [String, Number], default: '' },
})

defineEmits(['update:modelValue'])

const inputRef = ref(null)
const currentType = ref(props.type)

const toggleType = () => {
    currentType.value = currentType.value === 'password' ? 'text' : 'password'
}
</script>

<style scoped>
.custom-input {
  position: relative;
  margin-bottom: 24px;
}

.custom-input__label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  font-size: 16px;
  line-height: 100%;
  color: #355B3E;
}

.custom-input label {
  position: relative;
  display: flex;
  align-items: center;
  padding: 8px 16px;

  min-height: 56px;

  border: 1px solid #B8D6BF;
  border-radius: 8px;
  transition: border-color 0.3s ease;
}

.custom-input input {
  border: none;
  background: transparent;
  outline: none;
  width: 100%;
  font-size: 16px;
  line-height: 24px;
  color: #355B3E;
}

.custom-input label:hover,
.custom-input label:has(input:focus) {
   border-color: #58745E;
}

.custom-input__btn {
  position: absolute;
  bottom: 16px;
  right: 16px;
  width: 24px;
  height: 24px;
  padding: 0;
  border: none;
  background-color: transparent;
  color: #95B29B;
  transition: color 0.3s ease, visibility 0.3s ease;
  cursor: pointer;
}

.custom-input__btn:hover {
  color: #58745E;
}

.custom-input__btn svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.custom-input:has(input:placeholder-shown)  .custom-input__btn {
  visibility: hidden;
}

.custom-input:has(input[type="password"]) .eye-close {
  opacity: 1;
}

.custom-input:has(input[type="text"]) .eye-open {
  opacity: 1;
}
</style>