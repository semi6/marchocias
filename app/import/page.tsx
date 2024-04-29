"use client";

import { useEffect } from 'react';
import { permanentRedirect, useSearchParams } from "next/navigation";
import { Card, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';

export default function Inport() {
  type ResultObject = { [key: string]: { [key: string]: { [key: string]: number } } };
  const searchParams = useSearchParams();

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

    const resultData = localStorage.getItem('result-data');
    let parsedResultData: ResultObject = {}

    if (!resultData || !confirm('保存されたデータがあります。上書きしますか？')) {
      const resultStrings = searchParams.get('r')
      if (resultStrings) {
        let w
        let g
        for (let i = 0; i < resultStrings.length; i++) {
          if (queryWallList[resultStrings[i]]) {
            w = queryWallList[resultStrings[i]]
          } else if (queryGradeList[resultStrings[i]]) {
            g = queryGradeList[resultStrings[i]]
          } else {
            parsedResultData[w] ||= {}
            parsedResultData[w][g] ||= {}
            parsedResultData[w][g][resultStrings[i]] = 1
          }
        }
      }
    } else {
      parsedResultData = JSON.parse(resultData)
    }

    localStorage.setItem('result-data', JSON.stringify(parsedResultData));

    permanentRedirect('/')
  }, [searchParams]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-2">
      <Card className="w-[400px]">
        <CardHeader>
          <CardDescription className='text-center'>データを保存しています...</CardDescription>
        </CardHeader>
        <CardFooter className='flex justify-center'>
          <CardDescription><a href={`${basePath}/`}>もどる</a></CardDescription>
        </CardFooter>
      </Card>
    </main>
  );
}
