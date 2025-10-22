'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation' // ← 追加！
import { supabase } from '@/lib/supabaseClient'

export default function LoginPage() {
  const router = useRouter() // ← ルーターを使えるようにする
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      alert('ログイン失敗😭：' + error.message)
      console.error('ログインエラー:', error)
    } else {
      alert('ログイン成功🎉 ようこそ！')
      console.log('ログイン成功:', data)
      router.push('/') // ✅ トップページへ自動遷移！
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl p-8 w-80 space-y-4"
      >
        <h1 className="text-2xl font-semibold text-center text-gray-800">
          管理ログイン
        </h1>

        <div>
          <label className="block text-sm mb-1 text-gray-600">メールアドレス</label>
          <input
            type="email"
            className="w-full border rounded-lg px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@mail.com"
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1 text-gray-600">パスワード</label>
          <input
            type="password"
            className="w-full border rounded-lg px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
        >
          ログイン
        </button>
      </form>
    </div>
  )
}
