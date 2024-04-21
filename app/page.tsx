"use client";

import { useState, useEffect, Key } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import dynamic from 'next/dynamic';

export default function Home() {
  type ResultObject = { [key: string]: { [key: string]: { [key: string]: number } | null } | null };
  const [result, setResult] = useState<ResultObject>({});

  const gradeSettings: any = {
    g8: { achieveColor: 'bg-purple-100', color: 'bg-purple-600' },
    g7: { achieveColor: 'bg-yellow-100', color: 'bg-yellow-400' },
    g6: { achieveColor: 'bg-orange-100', color: 'bg-orange-400' },
    g5: { achieveColor: 'bg-red-100', color: 'bg-red-500' },
    g4: { achieveColor: 'bg-green-100', color: 'bg-green-600' },
    g3: { achieveColor: 'bg-cyan-100', color: 'bg-cyan-400' },
    g2: { achieveColor: 'bg-stone-100', color: 'bg-stone-400' },
    g1: { achieveColor: 'bg-indigo-100', color: 'bg-indigo-700' },
    g0: { achieveColor: 'bg-slate-100', color: 'bg-slate-800' },
  }

  const routeSettings: any = {
    w90: {
      g8: ['1', '2', '3', '4', 'A', 'B', 'C', 'D'],
      g7: ['1', '2', '3', '4', 'A', 'B', 'C', 'D'],
      g6: ['1', '2', '3', '4', 'A', 'B', 'C', 'D'],
      g5: ['1', '2', '3', '4', 'A', 'B', 'C', 'D'],
      g4: ['1', '2', '3', '4', 'A', 'B', 'C', 'D'],
      g3: ['1', '2', '3', '4', 'A', 'B', 'C', 'D'],
      g2: ['1', '2', '3', '4', 'A', 'B', 'C', 'D'],
      g1: ['1', '2', '3', '4', 'A', 'B', 'C', 'D'],
      g0: ['1', '2', '3', '4', 'A', 'B', 'C', 'D'],
    },
    w115: {
      g8: ['1', '2', '3', '4', 'A', 'B', 'C', 'D'],
      g7: ['1', '2', '3', '4', 'A', 'B', 'C', 'D'],
      g6: ['1', '2', '3', '4', 'A', 'B', 'C', 'D'],
      g5: ['1', '2', '3', '4', 'A', 'B', 'C', 'D'],
      g4: ['1', '2', '3', '4', 'A', 'B', 'C', 'D'],
      g3: ['1', '2', '3', '4', 'A', 'B', 'C', 'D'],
      g2: ['1', '2', '3', '4', 'A', 'B', 'C', 'D'],
      g1: ['1', '2', '3', '4', 'A', 'B', 'C', 'D'],
      g0: ['1', '2', '3', '4', 'A', 'B', 'C', 'D'],
    },
    w125: {
      g8: ['1', '2', '3', '4', 'A', 'B', 'C', 'D'],
      g7: ['1', '2', '3', '4', 'A', 'B', 'C', 'D'],
      g6: ['1', '2', '3', '4', 'A', 'B', 'C', 'D'],
      g5: ['1', '2', '3', '4', 'A', 'B', 'C', 'D'],
      g4: ['1', '2', '3', '4', 'A', 'B', 'C', 'D'],
      g3: ['1', '2', '3', '4', 'A', 'B', 'C', 'D'],
      g2: ['1', '2', '3', '4', 'A', 'B', 'C', 'D'],
      g1: ['1', '2', '3', '4', 'A', 'B', 'C', 'D'],
      g0: ['1', '2', '3', '4', 'A', 'B', 'C', 'D'],
    },
    w170: {
      g8: ['1', '2', '3', '4', 'A', 'B', 'C', 'D'],
      g7: ['1', '2', '3', '4', 'A', 'B', 'C', 'D'],
      g6: ['1', '2', '3', '4', 'A', 'B', 'C', 'D'],
      g5: ['1', '2', '3', '4', 'A', 'B', 'C', 'D'],
      g4: ['1', '2', '3', '4', 'A', 'B', 'C', 'D'],
      g3: ['1', '2', '3', '4', 'A', 'B', 'C', 'D'],
      g2: ['1', '2', '3', '4', 'A', 'B', 'C', 'D'],
      g1: ['1', '2', '3', '4', 'A', 'B', 'C', 'D'],
      g0: ['1', '2', '3', '4', 'A', 'B', 'C', 'D'],
    },
  }

  useEffect(() => {
    const resultData = localStorage.getItem('result-data');
    if (resultData) {
      const storedData = JSON.parse(resultData)
      setResult(storedData);
    }
  }, []);

  useEffect(() => {
    if (Object.keys(result).length !== 0) {
      localStorage.setItem('result-data', JSON.stringify(result));
    }
  }, [result]);

  const handleChange = (w: string, g: string, r: string, resultTo: boolean) => {
    setResult(prevResult => {
      const newResult = { ...prevResult };
      newResult[w] = newResult[w] ?? {};
      newResult[w]![g] = newResult[w]![g] ?? {};
      newResult[w]![g]![r] = resultTo ? 1 : 0;
      return newResult;
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-2">
       <Tabs defaultValue="all" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="all">*</TabsTrigger>
          <TabsTrigger value="w-90">90°</TabsTrigger>
          <TabsTrigger value="w-115">115°</TabsTrigger>
          <TabsTrigger value="w-125">125°</TabsTrigger>
          <TabsTrigger value="w-170">170°</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          {Object.keys(routeSettings).map((w, i) => (
            Object.keys(routeSettings[w]).map((g, j) => (
              <Card className="m-1" key={`${i}-${j}`}>
                <CardContent className="p-3">
                  {routeSettings[w][g].map((r: string, k: number) => (
                    <Button
                      className={`ml-1 ${result[w]?.[g]?.[r] === 1 ? gradeSettings[g].achieveColor : gradeSettings[g].color}`}
                      key={k}
                      onClick={() => handleChange(w, g, r, !result[w]?.[g]?.[r])}
                    >
                      {r}
                    </Button>
                  ))}
                </CardContent>
              </Card>
            ))
          ))}
        </TabsContent>
        <TabsContent value="w-90">Make changes to your account here.</TabsContent>
        <TabsContent value="w-115">Change your password here.</TabsContent>
        <TabsContent value="w-125">Change your password here.</TabsContent>
        <TabsContent value="w-170">Change your password here.</TabsContent>
      </Tabs>
    </main>
  );
}
