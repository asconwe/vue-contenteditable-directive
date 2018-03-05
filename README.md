# vue-contenteditable-directive
Vue's built in v-model isn't compatible with contentdeditable divs - this directive fills in.

## Why use contenteditable divs?
First of all - if you can use a textarea or input with v-model, do that instead. There are a couple of quirks, though, in the implementation of textarea that make contentdeditable divs a good fit for certain applications.
* Editable divs shrink and grow with the text inside of them. Textarea does not.
* Formatting is generally more extensible in a contentdeditable div

## Usage 
``` 
import contenteditableDirective from 'vue-contenteditable-directive'
//...
Vue.use(contenteditableDirective)
```
```
<template>
  <div v-contenteditable:message="isEnabled" />
</template>

<script>
export default {
  data() {
    return {
      isEnabled: true,
      message: "hello"
    }
  }
}
</script>
```

The directive uses innerText to manipulate the DOM by default. However, you can use the modifier, dangerousHTML, to allow the directive to use and set the innerHTML of the editable element: 
```
v-contentdeditable:someDataKey.dangerousHTML="true"
```
Be sure to protect your app against XSS!
