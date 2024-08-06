/*
 * @Author: wway 951357249@qq.com
 * @Date: 2024-07-31 17:28:43
 * @LastEditors: wway 951357249@qq.com
 * @LastEditTime: 2024-07-31 17:43:13
 * @FilePath: \manage-system\src\untils\observes.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
import { ref, onMounted, onUnmounted } from 'vue';
export function useObserver() {


  const isIntersecting = ref(false);


  const observer = new IntersectionObserver((entries) => {


    entries.forEach(entry => {


      isIntersecting.value = entry.isIntersecting;


    });


  });


  const observe = (element: Element) => {


    if (element) {


      observer.observe(element);


    }


  };


  onUnmounted(() => {


    observer.disconnect();


  });


  return { isIntersecting, observe };


}