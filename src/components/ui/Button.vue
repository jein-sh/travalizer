<script setup>
    const props = defineProps({
        type: {
            type: String,
            default: 'button',
        },
        mod: {
            type: String,
            default: '', 
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        text: {
            type: String,
            required: true,
        },
    })
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="['btn', mod ? `btn--${mod}` : '']"
  >
    {{ text }}
  </button>
</template>

<style>
 .btn {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 16px;
  width: 100%;
  min-height: 48px;
  border: 1px solid #029664;
  border-radius: 8px;
  font-family: 'Inter', 'Arial', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 130%;
  text-align: center;
  background-color:  #029664;
  color: #fff;
  cursor: pointer;
  transition: color 0.3s ease, background-color 0.3s ease;
}

.btn:hover {
  background-color:  #fff;
  color: #029664;
}

.btn--bordered {
  background-color: transparent;
  color: #029664;
}

.btn--bordered:hover {
  color:  #fff;
  background-color: #029664;
}
</style>