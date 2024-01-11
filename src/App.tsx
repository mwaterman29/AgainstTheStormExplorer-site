import { useState } from 'react'
import './App.css'
import { GraphCanvas, GraphCanvasRef, GraphCanvasProps} from 'reagraph';
import { FunctionComponent, RefObject } from 'react';
import { useRef } from 'react';

//Components
import GoodsGraph from './components/GoodsGraph'
import InfoPanel from './components/InfoPanel'

//Data

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
  const [selected, setSelected] = useState({
    type: '',
    id: ''
  })

  function onClickNode(node: any) {
    console.log(node);
    setSelected({
      type: 'good',
      id: node.id
    })
  }
  
  function onClickEdge(edge: any) {
    console.log(edge);
    setSelected({
      type: 'recipe',
      id: edge.id
    })
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
            <GoodsGraph
                graphRef={graphRef}
                onClickNode={onClickNode}
                onClickEdge={onClickEdge}
              />
          </div>
          <div className='h-full w-1/4 p-2'>
            <InfoPanel
              type={selected.type}
              id={selected.id}
             />
          </div>
        </div>

      </div>
      <div className='h-[10%]'>

      </div>

    </div>
  )
}

export default App
