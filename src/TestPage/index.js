import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { withI18n } from './i18n'
import {} from './request'
import { toast } from '@/components'

import './style.module.scss'

/*
 * @Author: XXXX
 * @Date: 2021-03-16
 * @Description: XXX
 * @url: 页面路由地址
 */
function TestPage({ t }) {
  const [xx, setXX] = useState()

  useEffect(() => {}, [])

  return <div className="test-page"></div>
}

export default withI18n()(TestPage)
