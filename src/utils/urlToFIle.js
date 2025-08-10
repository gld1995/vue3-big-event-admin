import axios from 'axios'

/**
 * 将网络图片转换为File对象
 * @param {string} url - 网络图片地址
 * @param {string} [filename] - 可选的自定义文件名
 * @param {string} [mimeType] - 可选的MIME类型
 * @returns {Promise<File>} - 返回一个Promise，解析为File对象
 */
async function urlToFile(url, filename, mimeType) {
  try {
    // 使用Axios获取图片数据，设置responseType为'blob'
    const response = await axios.get(url, {
      responseType: 'blob'
    })

    // 从响应头中获取MIME类型，如果未提供则使用默认值
    const contentType =
      mimeType || response.headers['content-type'] || 'image/jpeg'

    // 从URL中提取文件名（如果未提供）
    let finalFilename = filename
    if (!finalFilename) {
      // 从URL路径中提取文件名
      const urlParts = url.split('/')
      const lastPart = urlParts[urlParts.length - 1]

      // 移除查询参数
      const cleanFilename = lastPart.split('?')[0]

      // 如果URL中没有文件名，则使用默认文件名
      finalFilename = cleanFilename || 'downloaded-image.jpg'
    }

    // 从Blob创建File对象
    const blob = response.data
    // eslint-disable-next-line no-undef
    return new File([blob], finalFilename, {
      type: contentType,
      lastModified: Date.now()
    })
  } catch (error) {
    // 统一处理错误
    // eslint-disable-next-line no-undef
    console.error('图片转换失败:', error)
    throw new Error(`图片转换失败: ${error.message}`)
  }
}

export { urlToFile }
