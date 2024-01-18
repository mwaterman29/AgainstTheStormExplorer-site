import { useState } from 'react'
import './App.css'
import { GraphCanvasRef,} from 'reagraph';
import { useRef } from 'react';

//Components
import GoodsGraph from './components/GoodsGraph'
import InfoPanel from './components/InfoPanel'
import * as data from './data/data.json';

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
  const [precursors, setPrecursors] = useState<string[]>([]);
  const [successors, setSuccessors] = useState<string[]>([]);

  function onClickNode(node: any) {
    console.log(node);
    updateSelected({
      type: 'good',
      id: node.id
    })
  }
  
  function onClickEdge(edge: any) {
    console.log(edge);
    updateSelected({
      type: 'recipe',
      id: edge.id
    })
  }

  function updateSelected(selected: any) {
    setPrecursors(data.goods.filter(good => good.usedIn?.includes(selected.id)).map(good => good.id));
    setSuccessors(data.goods.filter(good => good.usesFirst?.includes(selected.id) || good.usesSecond?.includes(selected.id)).map(good => good.id));
    setSelected(selected);
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
                selected={selected}
                precursors={precursors}
                successors={successors}
              />
          </div>
          <div className='h-full w-1/4 p-2'>
            <InfoPanel
              updateSelected={updateSelected}
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
