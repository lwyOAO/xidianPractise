import request from '@/utils/request'

// 获取订单详情
export const getOrderDetail = (params) => request.get('/order/page', { params })
