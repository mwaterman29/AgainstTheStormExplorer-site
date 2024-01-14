import { GraphCanvas, GraphCanvasRef, GraphCanvasProps, NodeRenderer, NodeRendererProps, GraphNode, GraphEdge, useSelection, lightTheme, darkTheme} from 'reagraph';
import { FunctionComponent, RefObject, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useLoader } from '@react-three/fiber';

//Data
import * as data from '../data/data.json';

const GoodsGraph: FunctionComponent<{graphRef: RefObject<GraphCanvasRef>, onClickNode: any, onClickEdge: any}> = props => {

    const [selected, setSelected] = useState<string>();
    const [precursors, setPrecursors] = useState<string[]>();
    const [successors, setSuccessors] = useState<string[]>();

    useEffect(() => {
        console.log(selected);
        console.log(precursors);
        console.log(successors); 
    }, [selected, precursors, successors]);

    return (
        <GraphCanvas
            ref={props.graphRef}
            onNodeClick={
                (node, collapseProps) => {
                    //Call passed onClick
                    props.onClickNode(node, collapseProps);

                    //Update internal state of selection
                    setSelected(node.id);
                    setPrecursors(data.goods.filter(good => good.usedIn?.includes(node.id)).map(good => good.id));
                    setSuccessors(data.goods.filter(good => good.usesFirst?.includes(node.id) || good.usesSecond?.includes(node.id)).map(good => good.id));
                    
                }}
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
                let selectionColor = new THREE.Color("#00DD00");
                let precursorColor = new THREE.Color("#FFAAAA");
                let successorColor = new THREE.Color("#AAFFAA");

                return (
                    <group>
                        {selected == props.node.id &&
                            <mesh position={[0, 0, 5]}>
                                <circleGeometry attach="geometry" args={[props.size + 3, 32]}  />
                                <meshBasicMaterial
                                    attach="material"
                                    color={selectionColor}
                                />
                            </mesh>
                        }
                        {precursors?.includes(props.id) &&
                            <mesh position={[0, 0, 5]}>
                                <circleGeometry attach="geometry" args={[props.size + 3, 32]}  />
                                <meshBasicMaterial
                                    attach="material"
                                    color={precursorColor}
                                />
                            </mesh>
                        }
                        {successors?.includes(props.id) &&
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