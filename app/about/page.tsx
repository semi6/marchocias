"use client";

import { QRCodeSVG } from 'qrcode.react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function About() {

  const basePath = process.env.NODE_ENV === 'production' ? '/marchocias' : ''

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-2">
      <Card className="w-[370px]">
        <CardHeader>
          <CardTitle className='text-center'>課題表</CardTitle>
          <CardDescription className='text-center'>QRコードでアクセス</CardDescription>
        </CardHeader>
        <CardContent className='flex justify-center'>
          <QRCodeSVG value={`https://semi6.github.io/marchocias`} size={150} />
        </CardContent>
        <CardContent>
          <CardDescription className='ml-10'>
            ※データは端末に保存されます
          </CardDescription>
          <CardDescription className='ml-10'>
            ※データを別の端末で見るには<a href={`${basePath}/copy`} className='underline'>こちら</a>
          </CardDescription>
        </CardContent>

        <CardFooter className='flex justify-center'>
          <CardDescription><a href={`${basePath}/`}>もどる</a></CardDescription>
        </CardFooter>
      </Card>
    </main>
  );
}
