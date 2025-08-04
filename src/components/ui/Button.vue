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
        loading: {
          type: Boolean,
          default: false,
        },
    })
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="['btn', mod ? `btn--${mod}` : '', { 'btn--disabled': disabled || loading }]"
  >
    <span v-if="loading" class="loader"></span>
    <span v-else>{{ text }}</span>
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

.btn--disabled {
  pointer-events: none;
}

.loader {
  display: inline-block;
  width: 18px;
  height: 18px;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>