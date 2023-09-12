import request from '@/utils/request'

// 获取用户信息
export const getUserInfoService = () => {
  return request.get('/employee/info')
}

// 修改用户信息
export const updateUserInfoService = (params) => {
  return request.post('/employee/update', params)
}

// 修改密码
export const updatePasswordService = (params) => {
  return request.post('/employee/updatePassword', params)
}

// 员工信息分页查询
export const getEmployeeList = (params) => {
  return request.get('/employee/page', {
    params
  })
}

//  新增员工
export const addEmployeeService = (data) => {
  return request.post('/employee', data)
}

// 根据id修改员工信息
export const updateEmployeeService = (data) => {
  console.log('发送')
  console.log(data)
  return request.put('/employee', data)
}

// 根据id查询员工信息
export const getEmployeeByIdService = (id) => {
  return request.get(`/employee/${id}`)
}

// 删除员工
export const deleteEmployeeService = (id) => {
  return request.delete('/employee', {
    params: {
      id
    }
  })
}

// 批量删除员工
export const deleteEmployeesService = (ids) => {
  return request.delete('/employee/batch', {
    params: {
      ids
    }
  })
}

// 导出员工信息


export const userGetInfoService = () => {}