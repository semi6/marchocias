import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { isMobile } from "react-device-detect"

type ResultObject = { [key: string]: { [key: string]: { [key: string]: number } | null } | null };

interface RouteListProps {
  selectedWall: string;
}

const RouteList: React.FC<RouteListProps> = ({ selectedWall }) => {
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
      g5: ['1', '2', '3', 'A', 'B', 'C'],
      g4: ['1', '2', '3', 'A', 'B', 'C', 'D'],
      g3: ['1', '2', '3', 'A', 'B', 'C', 'D'],
      g2: ['1', '2', '3', 'A', 'B', 'C', 'D'],
      g1: ['1', '2', 'A', 'B', 'C'],
      g0: ['1', 'A', 'B'],
    },
    w115: {
      g5: ['1', '2', '3', '4', 'A', 'B'],
      g4: ['1', '2', '3', 'A', 'B', 'C'],
      g3: ['1', '2', '3', 'A', 'B', 'C', 'D'],
      g2: ['1', '2', '3', 'A', 'B', 'C', 'D'],
      g1: ['1', '2', '3', 'A', 'B', 'C', 'D'],
      g0: ['1', '2', '3', 'A', 'B', 'C', 'D', 'E'],
    },
    w140: {
      g5: ['6'],
      g4: ['6', '7', 'D', 'E'],
      g3: ['1', '2', 'A', 'B', 'C'],
      g2: ['1', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'],
      g1: ['1', 'A', 'B', 'C'],
      g0: ['1', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'],
    },
    w170: {
      g5: ['1', '2'],
      g4: ['1', '2', 'A'],
      g3: ['1', '2', 'A', 'B', 'C'],
      g2: ['1', '2', 'A', 'B', 'C', 'D', 'E'],
      g1: ['1', '2', 'A', 'B', 'C', 'D'],
      g0: ['1', 'A', 'B', 'C', 'D'],
    },
  }

  const wallLabel: any = {
    w90: '90°',
    w115: '115°',
    w140: '140°',
    w170: '170°'
  }

  const toggleCompleted = (w: string, g: string, r: string, resultTo: boolean) => {
    setResult(prevResult => {
      const newResult = { ...prevResult };
      newResult[w] = newResult[w] ?? {};
      newResult[w]![g] = newResult[w]![g] ?? {};
      newResult[w]![g]![r] = resultTo ? 1 : 0;

      return newResult;
    });
  };

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

  return (
    <>
      {Object.keys(routeSettings).map((w, i) => (
        selectedWall === 'all' || selectedWall === w ? (
          <Card className="m-1 mb-3 pb-1" key={i}>
            <CardHeader className="p-0 pl-3 pt-3">
              <CardTitle className="text-sm font-normal text-gray-500">{wallLabel[w]}</CardTitle>
            </CardHeader>
            {Object.keys(routeSettings[w]).map((g, j) => (
              <CardContent className="p-1 flex flex-wrap gap-y-1.5" key={`${i}-${j}`}>
                {routeSettings[w][g].map((r: string, k: number) => (
                  <Button
                    key={k}
                    onClick={() => !isMobile && toggleCompleted(w, g, r, !result[w]?.[g]?.[r])}
                    onTouchEnd={() => toggleCompleted(w, g, r, !result[w]?.[g]?.[r])}
                    className={`ml-1 w-11 h-11 ${result[w]?.[g]?.[r] === 1 ? gradeSettings[g].achieveColor : gradeSettings[g].color} hover:${result[w]?.[g]?.[r] === 1 ? gradeSettings[g].achieveColor : gradeSettings[g].color}`}
                  >
                    {r}
                  </Button>
                ))}
              </CardContent>
            ))}
          </Card>
        ) : null
      ))}
    </>
  );
}

export default RouteList;