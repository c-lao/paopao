import { getRequestConfig } from 'next-intl/server'
import { defaultLocale } from './config'

export default getRequestConfig(async () => {
  // 对于静态导出，使用默认语言
  // 语言切换将通过客户端处理
  const locale = defaultLocale
  return {
    locale,
    messages: (await import(`@/messages/${locale}.json`)).default,
  }
})
