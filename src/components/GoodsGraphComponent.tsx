import React, {useRef} from 'react';
import { GraphCanvas, GraphCanvasRef, GraphCanvasProps} from 'reagraph';
import { FunctionComponent, RefObject } from 'react';

const GoodsGraphComponent: FunctionComponent<{graphRef: RefObject<GraphCanvasRef>, onClickNode: any, onClickEdge: any}> = props => {

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
            '3TR': '2:5',
            '2TR': '3:5',
            '1TR': '4:5',
            'size': 4,
        }
    ]

    return (
        <GraphCanvas
            ref={props.graphRef}
            onNodeClick={props.onClickNode}
            onEdgeClick={props.onClickEdge}
            nodes={testNodes}
            edges={testEdges}

            //Visuals
            edgeArrowPosition='mid'
        />
    )
}

export default GoodsGraphComponent;