'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from '@/components/ui/card'
import { useRouter } from 'next/navigation'
import { openDB } from 'idb'

const DB_NAME = 'RouteDB'
const STORE_NAME = 'route-data'

export default function Reset() {
  const router = useRouter()
  const basePath = process.env.NODE_ENV === 'production' ? '/marchocias' : ''

  const resetData = async () => {
    if (confirm('データをリセットします。よろしいですか？')) {
      const db = await openDB(DB_NAME, 1)
      await db.clear(STORE_NAME)
      router.push('/')
    }
  }

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-2'>
      <Card className='w-[370px]'>
        <CardHeader>
          <CardDescription className='text-center'>データを削除できます。</CardDescription>
        </CardHeader>
        <CardContent className='flex justify-center'>
          <Button variant='outline' onClick={() => resetData()}>リセット</Button>
        </CardContent>
        <CardFooter className='flex justify-center'>
          <CardDescription><a href={`${basePath}/`}>もどる</a></CardDescription>
        </CardFooter>
      </Card>
    </main>
  )
}
