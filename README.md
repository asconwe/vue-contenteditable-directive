# vue-contenteditable-directive
v-model isn't compatible with contentdeditable divs - this directive fills in

## Usage 
``` 
import contenteditable from 'contenteditable'
...
Vue.use(contenteditable)
```
```
<template>
  <div v-contenteditable="message" />
</template>

<script>
export default {
  data() {
    return {
      message: "hello"
    }
  }
}
</script>
```
