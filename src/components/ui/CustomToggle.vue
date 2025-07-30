<template>
  <div class="custom-toggle">
    <label>
      <input
        type="checkbox"
        :name="name"
        :checked="modelValue"
        @change="updateValue"
      />
      <span class="custom-toggle__icon">
        <inline-svg :src="checkIcon" />
      </span>
      <span class="custom-toggle__label">{{ label }}</span>
    </label>
  </div>
</template>

<script setup>
 const checkIcon = new URL('@/assets/svg/icon-check.svg', import.meta.url).href

const props = defineProps({
  modelValue: Boolean,
  label: String,
  name: String,
})

const emit = defineEmits(['update:modelValue'])

const updateValue = (e) => {
  emit('update:modelValue', e.target.checked)
}
</script>

<style scored>

.custom-toggle label {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.custom-toggle input {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  border: 0;
  padding: 0;
  white-space: nowrap;
  clip-path: inset(100%);
  clip: rect(0 0 0 0);
  overflow: hidden;
}

.custom-toggle__label {
  font-size: 16px;
  line-height: 100%;
  color: #355B3E;
  transition: opacity 0.3s ease;
}

.custom-toggle__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 13px;
  height: 13px;
  border-radius: 4px;
  border: 1px solid #029664;
  background-color: #029664;
  color: #fff;
  transition: background-color 0.3s ease;
}

.custom-toggle:has(input:checked) .custom-toggle__icon {
  background-color: #fff;
}

.custom-toggle label:hover .custom-toggle__label {
   opacity: 0.7;
}
</style>

