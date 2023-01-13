import React, { FC, useMemo, CSSProperties } from 'react';
import { EdgeProps, useStore, getBezierPath, ReactFlowState, getStraightPath } from 'reactflow';

import { getEdgeParams } from './utils';

const nodeSelector = (s: ReactFlowState) => s.nodeInternals;

const FloatingEdge: FC<EdgeProps> = ({ id, source, target, style }) => {
  const nodeInternals = useStore(nodeSelector);

  const sourceNode = useMemo(() => nodeInternals.get(source), [source, nodeInternals]);
  const targetNode = useMemo(() => nodeInternals.get(target), [target, nodeInternals]);

  if (!sourceNode || !targetNode) {
    return null;
  }

  const { sx, sy, tx, ty, sourcePos, targetPos } = getEdgeParams(sourceNode, targetNode);

  const d = getStraightPath({
    sourceX: sx,
    sourceY: sy,
    targetX: tx,
    targetY: ty,
  });

  return (
    <g className="react-flow__connection">
      <path id={id} className="react-flow__edge-path" d={d[0]} style={style as CSSProperties} />
    </g>
  );
};

export default FloatingEdge;