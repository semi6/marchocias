import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import React from 'react';

interface WallTabProps {
  onSelectedWall: (value: string) => void;
}

const WallTab: React.FC<WallTabProps> = ({ onSelectedWall }) => {
  return (
    <TabsList>
      <TabsTrigger value="all" onClick={() => onSelectedWall("all")}>*</TabsTrigger>
      <TabsTrigger value="w90" onClick={() => onSelectedWall("w90")}>90°</TabsTrigger>
      <TabsTrigger value="w115" onClick={() => onSelectedWall("w115")}>115°</TabsTrigger>
      <TabsTrigger value="w140" onClick={() => onSelectedWall("w140")}>140°</TabsTrigger>
      <TabsTrigger value="w170" onClick={() => onSelectedWall("w170")}>170°</TabsTrigger>
    </TabsList>
  );
}

export default WallTab;