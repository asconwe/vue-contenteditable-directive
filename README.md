# vue-contenteditable-directive
v-model isn't compatible with contentdeditable divs - this directive fills in

## Usage 
``` 
import contenteditableDirective from 'vue-contenteditable-directive'
...
Vue.use(contenteditableDirective)
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
