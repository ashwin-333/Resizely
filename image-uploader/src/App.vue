<template>
  <div id="app">
    <h1>Image Uploader and Resizer</h1>
    <input type="file" @change="handleFileUpload" />
    <button @click="uploadImage">Upload Image</button>
    <div v-if="imageUrl">
      <h2>Original Image</h2>
      <img :src="imageUrl" alt="Uploaded Image" />
    </div>
    <div v-if="resizedImageUrl">
      <h2>Resized Image</h2>
      <img :src="resizedImageUrl" alt="Resized Image" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      selectedFile: null,
      imageUrl: null,
      resizedImageUrl: null,
    };
  },
  methods: {
    handleFileUpload(event) {
      this.selectedFile = event.target.files[0];
    },
    async uploadImage() {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      try {
        const response = await axios.post('http://localhost:3000/upload', formData);
        this.imageUrl = response.data.originalImageUrl;
        this.resizedImageUrl = response.data.resizedImageUrl;
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    },
  },
};
</script>
