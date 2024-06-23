"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs"
import Menu from "./menu"
import WallTab from "./wall_tab"
import RouteList from "./route_list"

export default function Home() {
  const [selectedWall, setSelectedWall] = useState('all');

  const changeWallSelect = (w: string) => {
    setSelectedWall(w)
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-2">
      <Tabs defaultValue="all" className="w-[370px]">
        <div className="flex m-1">
          <WallTab onSelectedWall={changeWallSelect} />
          <Menu />
        </div>
        <TabsContent value={selectedWall}>
          <RouteList selectedWall={selectedWall} />
        </TabsContent>
      </Tabs>
    </main>
  );
}
