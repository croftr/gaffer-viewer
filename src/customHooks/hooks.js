
import { useLayoutEffect, useState } from 'react';

export const useWindowSize = () => {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
}

export const usePayloadData = (initialState) => {

    const [data, setData] = useState(initialState);
    const [graphData, setGraphData] = useState(initialState);

    return [data, setData, graphData, setGraphData]

}

export const useShortestPath = () => {
    const [shortestPath, setShortestPath] = useState([]);                    
    return [shortestPath, setShortestPath]
}