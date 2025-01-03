'use client'

import { Suspense, useEffect } from 'react'
import { permanentRedirect, useSearchParams } from 'next/navigation'
import { Card, CardDescription, CardFooter, CardHeader } from '@/components/ui/card'
import { openDB } from 'idb'

const DB_NAME = 'RouteDB'
const STORE_NAME = 'route-data'

const ImportPage = () => {
  type ResultObject = { [key: string]: { [key: string]: { [key: string]: number } } }
  const searchParams = useSearchParams()

  const basePath = process.env.NODE_ENV === 'production' ? '/marchocias' : ''

  useEffect(() => {
    const queryWallList: any = {
      a: 'w90',
      b: 'w115',
      c: 'w125',
      d: 'w170',
    }

    const queryGradeList: any = {
      e: 'g8',
      f: 'g7',
      g: 'g6',
      h: 'g5',
      i: 'g4',
      j: 'g3',
      k: 'g2',
      l: 'g1',
      m: 'g0',
    }


    const importData = async () => {
      const db = await openDB(DB_NAME, 1)
      let parsedResultData: ResultObject = {}
      const existingData = await db.get(STORE_NAME, 'result-data')

      if (!existingData || !confirm('保存されたデータがあります。上書きしますか？')) {
        const resultStrings = searchParams.get('r')
        if (resultStrings) {
          let w: string | undefined
          let g: string | undefined
          for (let i = 0; i < resultStrings.length; i++) {
            if (queryWallList[resultStrings[i]]) {
              w = queryWallList[resultStrings[i]]
            } else if (queryGradeList[resultStrings[i]]) {
              g = queryGradeList[resultStrings[i]]
            } else if (w && g) {
              parsedResultData[w] ||= {}
              parsedResultData[w][g] ||= {}
              parsedResultData[w][g][resultStrings[i]] = 1
            }
          }
        }
      } else {
        parsedResultData = existingData
      }

      await db.put(STORE_NAME, parsedResultData, 'result-data')
      permanentRedirect('/')
    }

    importData();
  }, [searchParams])

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-2'>
      <Card className='w-[370px]'>
        <CardHeader>
          <CardDescription className='text-center'>データを保存しました。</CardDescription>
        </CardHeader>
        <CardFooter className='flex justify-center'>
          <CardDescription><a href={`${basePath}/`}>もどる</a></CardDescription>
        </CardFooter>
      </Card>
    </main>
  )
}

export default function Import() {
  return (
    <Suspense>
      <ImportPage />
    </Suspense>
  )
}
