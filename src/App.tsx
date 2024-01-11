import { useState } from 'react'
import './App.css'
import React from 'react';
import { GraphCanvas } from 'reagraph';

function App() {

  return (
    <div className='bg-gray-200 text-green-300 h-screen w-screen'>
      <div className='w-full h-[10%] bg-gray-400'>
        test header
      </div>
      <div className='bg-purple-600 h-[80%] w-full p-2'>
        <div className='relative h-full w-full'>
          <GraphCanvas
              nodes={[
                {
                  id: 'n-1',
                  label: '1'
                },
                {
                  id: 'n-2',
                  label: '2'
                }
              ]}
              edges={[
                {
                  id: '1->2',
                  source: 'n-1',
                  target: 'n-2',
                  label: 'Edge 1-2'
                }
              ]}
            />
        </div>

      </div>
      <div className='h-[10%]'>

      </div>

    </div>
  )
}

export default App
