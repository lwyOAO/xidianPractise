import { defineStore } from 'pinia'
import { ref } from 'vue'

// 用户模块
export const useFoodClassStore = defineStore(
  'foodClass',
  () => {
    const foodClassList = ref([
      {
        food_id: 10090,
        food_name: '王老吉',
        food_class: '饮品',
        price: '$1',
        last_date: '2023-2-1',
        sale_state: '在售'
      },
      {
        food_id: 10091,
        food_name: '梁氏烤鱼',
        food_class: '烤鱼',
        price: '$2',
        last_date: '2023-2-1',
        sale_state: '在售'
      },
      {
        food_id: 10092,
        food_name: '王氏煎饼',
        food_class: '煎饼',
        price: '$1',
        last_date: '2023-2-1',
        sale_state: '在售'
      }
    ])

    return {
      foodClassList
    }
  },
  {
    persist: true
  }
)
