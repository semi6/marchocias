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

  // 配列だとシングルクォートとカンマがスマホで直接編集しにくいため文字列split
  const routeSettings: any = {
    w90: {
      g5: '1234ABCD'.split(''),
      g4: '1234ABCD'.split(''),
      g3: '1234ABCD'.split(''),
      g2: '123ABCD'.split(''),
      g1: '1ABCD'.split(''),
      g0: '1ABC'.split(''),
    },
    w115: {
      g5: '123AB'.split(''),
      g4: '1234ABCD'.split(''),
      g3: '123ABCD'.split(''),
      g2: '123ABCD'.split(''),
      g1: '1234ABCD'.split(''),
      g0: '1ABCD'.split(''),
    },
    w140: {
      g5: '678'.split(''),
      g4: '67EF'.split(''),
      g3: '67EFG'.split(''),
      g2: '67EFG'.split(''),
      g1: '678EFGH'.split(''),
      g0: '67EFGH'.split(''),
    },
    w170: {
      g5: '12'.split(''),
      g4: '12AB'.split(''),
      g3: '123ABC'.split(''),
      g2: '12ABCD'.split(''),
      g1: '12ABCD'.split(''),
      g0: '12ABCD'.split(''),
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
          <Card className="m-1 mb-3 py-2" key={i}>
            {selectedWall === 'all' ? (
              <CardHeader className="p-0 pl-3">
                <CardTitle className="text-xs font-normal text-gray-500">{wallLabel[w]}</CardTitle>
              </CardHeader>
            ) : null}
            {Object.keys(routeSettings[w]).map((g, j) => (
              <CardContent className="py-1 px-1.5 flex flex-wrap gap-y-1.5 space-x-1" key={`${i}-${j}`}>
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
