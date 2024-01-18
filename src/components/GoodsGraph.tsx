import { GraphCanvas, GraphCanvasRef, NodeRendererProps} from 'reagraph';
import { FunctionComponent, RefObject, useEffect, useState } from 'react';
import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';

//Data
import * as data from '../data/data.json';

const GoodsGraph: FunctionComponent<{
    graphRef: RefObject<GraphCanvasRef>,
    onClickNode: any, 
    onClickEdge: any, 
    selected: {type: string, id: string}, 
    precursors: string[], 
    successors: string[]}> = graphProps => 
    {

    /*
    useEffect(() => {
        console.log(selected);
        console.log(precursors);
        console.log(successors); 
    }, [selected, precursors, successors]);
    */

    return (
        <GraphCanvas
            ref={graphProps.graphRef}
            onNodeClick={graphProps.onClickNode}
            onEdgeClick={graphProps.onClickEdge}
            nodes={data.goods}
            edges={data.recipes}            

            //Visuals -- going to have to manually handle 
            // edges drawn by: https://github.com/reaviz/reagraph/blob/c95b8c96b90ea7383ce2eade74a91aa08e746787/src/symbols/edges/useEdgeGeometry.ts#L33

            edgeArrowPosition='mid'
            renderNode={(props: NodeRendererProps) => {

                //console.log(graphProps.graphRef.current?.getGraph());
                console.log(props.node.position.x, props.node.position.y);

                const baseUrl = import.meta.env.BASE_URL;
                const imageUri = baseUrl + 'icons/' + props.id + '.png';
                const encodedUri = encodeURI(imageUri);

                const texture = useLoader(THREE.TextureLoader, encodedUri)

                let color = new THREE.Color("#FFFFFF");
                let selectionColor = new THREE.Color("#0000DD");
                let precursorColor = new THREE.Color("#DD0000");
                let successorColor = new THREE.Color("#00DD00");

                

                return (
                    <group>
                        {graphProps.selected.id == props.node.id &&
                            <mesh position={[0, 0, 5]}>
                                <circleGeometry attach="geometry" args={[props.size + 3, 32]}  />
                                <meshBasicMaterial
                                    attach="material"
                                    color={selectionColor}
                                />
                            </mesh>
                        }
                        {graphProps.precursors?.includes(props.id) &&
                            <mesh position={[0, 0, 5]}>
                                <circleGeometry attach="geometry" args={[props.size + 3, 32]}  />
                                <meshBasicMaterial
                                    attach="material"
                                    color={precursorColor}
                                />
                            </mesh>
                        }
                        {graphProps.successors?.includes(props.id) &&
                            <mesh position={[0, 0, 5]}>
                                <circleGeometry attach="geometry" args={[props.size + 3, 32]}  />
                                <meshBasicMaterial
                                    attach="material"
                                    color={successorColor}
                                />
                            </mesh>
                        }
                        <mesh position={[0, 0, 6]}>
                            <circleGeometry attach="geometry" args={[props.size, 32]}  />
                            <meshBasicMaterial
                                attach="material"
                                map={texture} // apply the texture
                                //color={props.color}
                                color={color}
                                opacity={props.opacity}
                                transparent
                            />
                        </mesh>
                        
                  </group>
                )
            }}

            /*
            theme={{
                ...lightTheme,
                node: {
                    ...lightTheme.node,
                }
            }}
            */
        />
    )
}

export default GoodsGraph;