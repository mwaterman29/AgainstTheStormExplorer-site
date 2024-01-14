import React, {useRef} from 'react';
import { GraphCanvas, GraphCanvasRef, GraphCanvasProps, NodeRenderer, NodeRendererProps} from 'reagraph';
import { FunctionComponent, RefObject } from 'react';
import { ThreeElements, ReactThreeFiber } from '@react-three/fiber';
import * as THREE from 'three';
import berries from '../assets/berries.png'
import { Canvas, useLoader } from '@react-three/fiber';

import { extend } from '@react-three/fiber'



//Data
import * as data from '../data/data.json';

const GoodsGraph: FunctionComponent<{graphRef: RefObject<GraphCanvasRef>, onClickNode: any, onClickEdge: any}> = props => {

    const testNodes = [
        {
            'id': "Pottery",
            'label': "Pottery",
        },        
        {
            'id': "Clay",
            'label': "Clay",
        },
        {
            'id': "Wood",
            'label': "Wood",
        },
        {
            'id': "Oil",
            'label': "Oil",
        },
        {
            'id': "Coal",
            'label': "Coal",
        },
        {
            'id': "Sea Marrow",
            'label': "Sea Marrow",
        },
    ]

    const testEdges = [
        {
            'id': "Clay->Pottery",
            'source': "Clay",
            'target': "Pottery",
            '3TR': '2:5x10s',
            '2TR': '3:5',
            '1TR': '4:5',
            'size': 4,
        }
    ]

    function Image() {
        const texture = useLoader(THREE.TextureLoader, berries)
        return (
          <mesh>
            <planeBufferGeometry attach="geometry" args={[3, 3]} />
            <meshBasicMaterial attach="material" map={texture} />
          </mesh>
        )
      }

    return (
        <GraphCanvas
            ref={props.graphRef}
            onNodeClick={props.onClickNode}
            onEdgeClick={props.onClickEdge}
            nodes={data.goods}
            edges={data.recipes}

            //Visuals
            edgeArrowPosition='mid'
            renderNode={(props: NodeRendererProps) => {
                const texture = useLoader(THREE.TextureLoader, berries)
                return (
                    <group>
                        <mesh position={[0, 0, 5]}>
                            <circleGeometry attach="geometry" args={[props.size, 32]}  />
                            <meshBasicMaterial
                                attach="material"
                                map={texture} // apply the texture
                                color={props.color}
                                opacity={props.opacity}
                                transparent
                            />
                        </mesh>
                  </group>
                )
            }}
        />
    )
}

export default GoodsGraph;