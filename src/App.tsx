import { useState } from 'react'
import './App.css'
import GoodsGraphComponent from './components/GoodsGraphComponent'
import { GraphCanvas, GraphCanvasRef, GraphCanvasProps} from 'reagraph';
import { FunctionComponent, RefObject } from 'react';
import { useRef } from 'react';

function App() {

  /*
  ATS appropriate colors
  -sky-900
  -blue-950
  -blue-400
  -sky-200
  -slate-500

  */

  const graphRef = useRef<GraphCanvasRef | null>(null);

  function onClickNode(node: any) {
    console.log(node);
  }
  
  function onClickEdge(edge: any) {
    console.log(edge);
  }

  return (
    <div className='h-screen w-screen'>
      <div className='flex flex-row w-full h-[10%] bg-gray-400'>
        <p className='flex h-full items-center text-2xl p-4'>Against The Storm Explorer</p>
        <div className='h-full mx-4 w-1 bg-gray-800'></div>
      </div>
      <div className='bg-blue-950 h-[80%] w-full p-2'>
        <div className='flex flex-row relative h-full w-full'>
          <div className='relative h-full w-3/4 mr-2'>
            <GoodsGraphComponent 
                graphRef={graphRef}
                onClickNode={onClickNode}
                onClickEdge={onClickEdge}
              />
          </div>
          <div className='h-full w-1/4 p-2 bg-slate-500'>
            info panel goes here
          </div>
        </div>

      </div>
      <div className='h-[10%]'>

      </div>

    </div>
  )
}

export default App
