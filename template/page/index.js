import React, { useEffect, useState } from 'react'
import sensors from '@/sa/sa.js'
import Cookies from 'js-cookie'
import { withI18n } from './i18n'
import * as JsBridge from '@/config/bridge'
import {} from './request'
import { toast } from '@/components'

import './style.module.scss'

/*
 * @Author: XXXX
 * @Date: 2021-03-16
 * @Description: XXX
 * @url: 页面路由地址
 */
function REPLACE_PAGE_NAME({ t }) {
  const [xx, setXX] = useState()

  useEffect(() => {}, [])

  return <div className="REPLACE_PAGE_CLASS_NAME"></div>
}

export default withI18n()(REPLACE_PAGE_NAME)
