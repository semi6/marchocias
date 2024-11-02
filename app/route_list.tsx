import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import RouteButton from "./route_button"
import { openDB } from 'idb'

type ResultObject = { [key: string]: { [key: string]: { [key: string]: number } | null } | null };

const DB_NAME = 'RouteDB'
const STORE_NAME = 'route-data'

interface RouteListProps {
  selectedWall: string;
}

const RouteList: React.FC<RouteListProps> = ({ selectedWall }) => {
  const [result, setResult] = useState<ResultObject>({})

  const routeSettings: any = {
    w90: {
      g5: ['1', '2', '3', '4', 'A', 'B'],
      g4: ['1', '2', '3', '4', 'A', 'B', 'C'],
      g3: ['1', 'A', 'B', 'C', 'D'],
      g2: ['1', 'A', 'B'],
      g1: ['A', 'B'],
      g0: ['A'],
    },
    w115: {
      g5: ['1', '2', '3', 'A', 'B', 'C', 'D'],
      g4: ['1', '2', '3', 'A', 'B', 'C', 'D'],
      g3: ['1', '2', '3', 'A', 'B', 'C', 'D'],
      g2: ['1', '2', '3', 'A', 'B', 'C', 'D'],
      g1: ['1', '2', '3', 'A', 'B', 'C', 'D'],
      g0: ['1', '2', '3', 'A', 'B', 'C', 'D'],
    },
    w140: {
      g5: ['6', '7', '8', 'E', 'F', 'G'],
      g4: ['6', '7', '8', 'E', 'F', 'G'],
      g3: ['6', '7', '8', 'E', 'F', 'G'],
      g2: ['6', '7', '8', 'E', 'F', 'G'],
      g1: ['6', '7', '8', 'E', 'F', 'G'],
      g0: ['6', '7', '8', 'E', 'F', 'G'],
    },
    w170: {
      g5: ['1', '2'],
      g4: ['1', '2', 'A', 'B'],
      g3: ['1', '2', 'A', 'B', 'C'],
      g2: ['1', '2', 'A', 'B', 'C', 'D'],
      g1: ['1', 'A', 'B', 'C', 'D'],
      g0: ['1', 'A', 'B', 'C', 'D'],
    },
  }

  const wallLabel: any = {
    w90: '90°',
    w115: '115°',
    w140: '140°',
    w170: '170°'
  }

  useEffect(() => {
    const fetchData = async () => {
      const db = await openDB(DB_NAME, 1, {
        upgrade(db) {
          if (!db.objectStoreNames.contains(STORE_NAME)) {
            db.createObjectStore(STORE_NAME);
          }
        },
      })
      const resultData = await db.get(STORE_NAME, 'result-data');
      if (resultData) {
        setResult(resultData);
      }
    }

    fetchData()
  }, [])

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
                  <RouteButton key={`${i}-${j}-${k}`} wall={w} grade={g} route={r} defaultValue={result[w]?.[g]?.[r] === 1} />
                ))}
              </CardContent>
            ))}
          </Card>
        ) : null
      ))}
    </>
  )
}

export default RouteList;
