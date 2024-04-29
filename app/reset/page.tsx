"use client";

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"

export default function Reset() {
  const basePath = process.env.NODE_ENV === 'production' ? '/marchocias' : ''

  const resetData = () => {
    if (confirm('データをリセットします。よろしいですか？')) {
      localStorage.removeItem('result-data');
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-2">
      <Card className="w-[400px]">
        <CardHeader>
          <CardDescription className='text-center'>データを削除できます。</CardDescription>
        </CardHeader>
        <CardContent className='flex justify-center'>
          <Button variant="outline" onClick={() => resetData()}>リセット</Button>
        </CardContent>
        <CardFooter className='flex justify-center'>
          <CardDescription><a href={`${basePath}/`}>もどる</a></CardDescription>
        </CardFooter>
      </Card>
    </main>
  );
}
