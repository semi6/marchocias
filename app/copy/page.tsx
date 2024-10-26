'use client'

import { QRCodeSVG } from 'qrcode.react'
import { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from '@/components/ui/card'
import { openDB } from 'idb'

const DB_NAME = 'RouteDB'
const STORE_NAME = 'route-data'

export default function Copy() {
  type ResultObject = { [key: string]: { [key: string]: { [key: string]: number } } }
  const [result, setResult] = useState<ResultObject>({})
  const [resultArr, _] = useState<Array<string>>([])

  const basePath = process.env.NODE_ENV === 'production' ? '/marchocias' : ''

  const queryStringList: any = {
    w90: 'a',
    w115: 'b',
    w125: 'c',
    w170: 'd',
    g8: 'e',
    g7: 'f',
    g6: 'g',
    g5: 'h',
    g4: 'i',
    g3: 'j',
    g2: 'k',
    g1: 'l',
    g0: 'm',
  }

  useEffect(() => {
    const fetchData = async () => {
      const db = await openDB(DB_NAME, 1)
      const resultData = await db.get(STORE_NAME, 'result-data')
      if (resultData) {
        setResult(resultData)
      }
    }

    fetchData()
  }, [])

  Object.keys(result).forEach(w => {
    resultArr.push(queryStringList[w])
    Object.keys(result[w]).forEach(g => {
      resultArr.push(queryStringList[g])
      Object.keys(result[w][g]).forEach(r => {
        if (result[w][g][r] === 1) {
          resultArr.push(r)
        }
      })
    })
  })

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-2'>
      <Card className='w-[370px]'>
        <CardHeader>
          <CardDescription className='text-center'>QRコードで別の端末にコピーできます</CardDescription>
        </CardHeader>
        <CardContent className='flex justify-center'>
          {resultArr.length > 0 && (
            <QRCodeSVG value={`https://semi6.github.io/marchocias/import?r=${resultArr.join('')}`} size={150} />
          )}
        </CardContent>
        <CardFooter className='flex justify-center'>
          <CardDescription><a href={`${basePath}/`}>もどる</a></CardDescription>
        </CardFooter>
      </Card>
    </main>
  )
}
