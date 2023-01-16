import React, { FC } from 'react';
import { getBezierPath, ConnectionLineComponentProps, Node } from 'reactflow';

import { getEdgeParams } from './utils';

const FloatingConnectionLine: FC<ConnectionLineComponentProps> = (props) => {
    
  const {
    toX,
    toY,
    fromPosition,
    toPosition,
    fromNode,
  } = props  

  if (!fromNode) {
    return null;
  }

  const targetNode = {
    id: 'connection-target',
    width: 1,
    height: 1,
    position: { x: toX, y: toY },
  } as Node;
  const targetX = toX
  const targetY = toY
  const sourcePosition=fromPosition
  const targetPosition = toPosition
  const sourceNode = fromNode
  const { sx, sy } = getEdgeParams(sourceNode, targetNode);
  
  const d = getBezierPath({
    sourceX: sx,
    sourceY: sy,
    sourcePosition,
    targetPosition,
    targetX,
    targetY,
  });

  return (
    <g>
      <path fill="none" stroke="#222" strokeWidth={1.5} className="animated" d={d[0]} />
      <circle cx={toX} cy={toY} fill="#fff" r={3} stroke="#222" strokeWidth={1.5} />
    </g>
  );
};

export default FloatingConnectionLine;