import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Logo from '@/components/Logo'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '别扭键盘 - 外语键盘练习工具',
  description: '为外语初学者提供的键盘打字训练工具',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <header className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-6 shadow-lg">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center gap-2">
              <Logo />
              <p className="text-center text-gray-400 text-sm mt-2">
                让外语键盘练习变得有趣 | 支持多语种 | 实时反馈
              </p>
            </div>
          </div>
        </header>
        
        <main className="container mx-auto px-4 py-8 flex-grow">
          {children}
        </main>

        <footer className="fixed bottom-0 left-0 right-0 bg-gray-100/95 backdrop-blur-sm py-3 shadow-lg z-50">
          <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
            <div className="flex items-center justify-center gap-2">
              <Logo />
            </div>
            <p>© 2024 别扭键盘 - 让外语打字不再别扭</p>
          </div>
        </footer>

        {/* 添加一个占位 div，防止内容被 fixed footer 遮挡 */}
        <div className="h-24"></div>
      </body>
    </html>
  )
}
