import { GraphCanvas, GraphCanvasRef, GraphCanvasProps, NodeRenderer, NodeRendererProps, useSelection, lightTheme, darkTheme} from 'reagraph';
import { FunctionComponent, RefObject } from 'react';
import * as THREE from 'three';
import { Canvas, useLoader } from '@react-three/fiber';




//Data
import * as data from '../data/data.json';

const GoodsGraph: FunctionComponent<{graphRef: RefObject<GraphCanvasRef>, onClickNode: any, onClickEdge: any}> = props => {

    return (
        <GraphCanvas
            ref={props.graphRef}
            onNodeClick={props.onClickNode}
            onEdgeClick={props.onClickEdge}
            nodes={data.goods}
            edges={data.recipes}            

            //Visuals -- going to have to manually handle 

            edgeArrowPosition='mid'
            renderNode={(props: NodeRendererProps) => {


                const baseUrl = import.meta.env.BASE_URL;
                const imageUri = baseUrl + 'icons/' + props.id + '.png';
                const encodedUri = encodeURI(imageUri);

                const texture = useLoader(THREE.TextureLoader, encodedUri)

                let color = new THREE.Color("#FFFFFF");

                return (
                    <group>
                        <mesh position={[0, 0, 5]}>
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