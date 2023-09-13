import request from '@/utils/request'

// 获取菜品数据
export const getDishes = (params) =>
  request.get('/dish/page', {
    params
  })

// 删除菜品
export const deleteDish = (ids) =>
  request.delete('/dish', {
    params: { ids }
  })

// 根据套餐id获取菜品
export const getDishesByTypeId = (SetId) =>
  request.get(`/setmeal/dish/${SetId}`)

// 添加菜品
export const addDish = (data) => request.post('/dish', data)
