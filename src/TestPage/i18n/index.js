import React, { Fragment } from 'react'
import I18n from 'i18nshell'

import globalI18n from '@/config/i18n'
import reactI18n from '@/helpers/reactI18n'

const resources = {
  en: I18n.load(() => import('./locales/en')),
  in: I18n.load(() => import('./locales/in')),
  zh: I18n.load(() => import('./locales/zh'))
}

const homeI18n = new I18n({
  fallback: [globalI18n],
  types: {
    default: { resources },
    jsx: {
      resources,
      format: (value, data) => (
        <Fragment>
          {I18n.template(value, data, { split: true }).map((item, idx) => (
            <Fragment key={idx}>{item}</Fragment>
          ))}
        </Fragment>
      )
    }
  }
})

window.homeI18n = homeI18n

// window.t = homeI18n.t

export default homeI18n
export const t = homeI18n.t
export const { withI18n, useI18n } = reactI18n(homeI18n)
