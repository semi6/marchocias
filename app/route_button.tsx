import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button"
import { isMobile } from "react-device-detect"

interface RouteListProps {
  wall: string;
  grade: string;
  route: string;
  defaultValue: boolean;
}

type ResultObject = { [key: string]: { [key: string]: { [key: string]: number } | null } | null };

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

  const handleTouchStart = (e: React.TouchEvent<HTMLButtonElement>) => {
    setStartY(e.touches[0].pageY)
    setIsScroll(false)
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLButtonElement>) => {
    const deltaY = Math.abs(startY - e.touches[0].pageY)
    if (deltaY > 10) {
      setIsScroll(true)
    }
  }

  const toggleCompleted = (tmpValue: boolean) => {
    if (!isScroll) {
      const resultDataJson = localStorage.getItem('result-data')
      const resultData: ResultObject = !!resultDataJson ? JSON.parse(resultDataJson) : {}

      resultData[wall] = resultData[wall] ?? {}
      resultData[wall]![grade] = resultData[wall]![grade] ?? {}
      resultData[wall]![grade]![route] = tmpValue ? 1 : 0

      setValue(tmpValue)
      localStorage.setItem('result-data', JSON.stringify(resultData))
    }
  }

  return (
    <Button
      onClick={() => !isMobile && toggleCompleted(!value)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={() => toggleCompleted(!value)}
      className={`ml-1 w-11 h-11 ${value ? gradeSettings[grade].achieveColor : gradeSettings[grade].color} hover:${value ? gradeSettings[grade].achieveColor : gradeSettings[grade].color}`}
    >
      {route}
    </Button>
  )
}

export default RouteList