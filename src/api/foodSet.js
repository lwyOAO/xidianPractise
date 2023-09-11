import request from '@/utils/request'

// 新增套餐
export const addPackage = (data) => request.post('/setmeal', data)

// 套餐分页查询
export const packagePage = (params) =>
  request.get('/setmeal/page', {
    params
  })

// 根据条件查询套餐数据
export const packageList = (params) =>
  request.get('/setmeal/list', {
    params
  })

// 删除套餐
export const deletePackage = (ids) =>
  request.delete('/setmeal/', {
    params: {
      ids
    }
  })
