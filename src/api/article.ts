import request from '@/utils/request'
export const artGetChannelsService = () => request.get('/my/cate/list')

// 添加文章分类
export const artAddChannelService = (data: any) =>
  request.post('/my/cate/add', data)
// 编辑文章分类
export const artEditChannelService = (data: any) =>
  request.put('/my/cate/info', data)

export const artDelChannelService = (id: any) =>
  request.delete('/my/cate/del', {
    params: { id }
  })

export const artGetListService = (params: any) =>
  request.get('/my/article/list', { params })

// 发布文章
export const artPublishService = (data: any) =>
  request.post('/my/article/add', data)

// 获取文章详情
export const artGetDetailService = (id: number) =>
  request.get('my/article/info', { params: { id } })

//编辑文章
export const artEditService = (data: any) =>
  request.put('my/article/info', data)

// 删除文章
export const artDelService = (id: number) =>
  request.delete('my/article/info', { params: { id } })
