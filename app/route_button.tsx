import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { isMobile } from 'react-device-detect'
import { openDB } from 'idb'

interface RouteListProps {
  wall: string
  grade: string
  route: string
  defaultValue: boolean
}

type ResultObject = { [key: string]: { [key: string]: { [key: string]: number } | null } | null }

const DB_NAME = 'RouteDB'
const STORE_NAME = 'route-data'

const RouteList: React.FC<RouteListProps> = ({ wall, grade, route, defaultValue }) => {
  const [value, setValue] = useState<boolean>(defaultValue)
  const [startY, setStartY] = useState<number>(0)
  const [isScroll, setIsScroll] = useState<boolean>(false)

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

  useEffect(() => {
    setValue(defaultValue)
  }, [defaultValue])

  useEffect(() => {
    const initDB = async () => {
      const db = await openDB(DB_NAME, 1, {
        upgrade(db) {
          if (!db.objectStoreNames.contains(STORE_NAME)) {
            db.createObjectStore(STORE_NAME)
          }
        },
      })
      return db
    }

    initDB()
  }, [])

  const handleTouchStart = (e: React.TouchEvent<HTMLButtonElement>) => {
    setStartY(e.touches[0].pageY)
    setIsScroll(false)
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLButtonElement>) => {
    const deltaY = Math.abs(startY - e.touches[0].pageY)
    if (deltaY > 10) {
      setIsScroll(true)
    }
  }

  const toggleCompleted = async (tmpValue: boolean) => {
    if (!isScroll) {
      const db = await openDB(DB_NAME, 1)
      const resultData: ResultObject = (await db.get(STORE_NAME, 'result-data')) || {}

      resultData[wall] = resultData[wall] ?? {};
      resultData[wall]![grade] = resultData[wall]![grade] ?? {};
      resultData[wall]![grade]![route] = tmpValue ? 1 : 0;

      setValue(tmpValue)
      await db.put(STORE_NAME, resultData, 'result-data')
    }
  }

  return (
    <Button
      onClick={() => !isMobile && toggleCompleted(!value)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={() => toggleCompleted(!value)}
      className={`ml-1 w-10 h-10 ${value ? gradeSettings[grade].achieveColor : gradeSettings[grade].color} hover:${value ? gradeSettings[grade].achieveColor : gradeSettings[grade].color}`}
    >
      {route}
    </Button>
  )
}

export default RouteList