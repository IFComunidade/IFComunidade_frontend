import api from '../plugins/api'
import { ref } from 'vue'

const fotoKey = ref(null)

class UploadImagem {
  async upload(file) {
    if (!file) return null

    try {
      const formData = new FormData()
      formData.append('file', file)

      const { data } = await api.post('/media/images/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      fotoKey.value = data.attachment_key
      return fotoKey.value
    } catch (error) {
      console.error('Erro ao fazer upload da imagem', error)
      throw error
    }
  }
}

export default new UploadImagem()
