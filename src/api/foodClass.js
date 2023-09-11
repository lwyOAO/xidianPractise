import request from '@/utils/request'

// 新增菜品分类
export const foodCategoryAdd = (data) => request.post('/category', data)

// 菜品分页查询
export const foodCategoryPage = (page, pageSize) =>
  request.get('/category/page', {
    params: {
      page,
      pageSize
    }
  })

// 根据id删除分类
export const foodCategoryDelete = (ids) =>
  request.delete('/category', {
    params: {
      ids
    }
  })

// 根据id修改分类信息
export const foodCategoryUpdate = (data) => request.put('/category', data)

// 根据条件查询分类数据
export const foodCategorySearch = (params) =>
  request.get('/category/list', {
    params
  })
