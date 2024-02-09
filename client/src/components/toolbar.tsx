import React, {useState} from "react";
import './toolbar.css';
import {DndContext} from '@dnd-kit/core';
import {useDraggable} from '@dnd-kit/core';
import {useDroppable} from '@dnd-kit/core';
import {CSS} from '@dnd-kit/utilities';
//import {DraggableStory} from '@dnd-kit/utilities';

function Grid(){
  () => {
    const [gridSize, setGridSize] = React.useState(30);
    const style = {
      alignItems: 'flex-start',
    };
    const buttonStyle = {
      marginLeft: gridSize - 20 + 1,
      marginTop: gridSize - 20 + 1,
      width: gridSize * 8 - 1,
      height: gridSize * 2 - 1,
    };
    const snapToGrid = useMemo(() => createSnapModifier(gridSize), [gridSize]);
  
    return (
      <>
        <DraggableStory
          label={`Snapping to ${gridSize}px increments`}
          modifiers={[snapToGrid]}
          style={style}
          buttonStyle={buttonStyle}
          key={gridSize}
        />
        <Grid size={gridSize} onSizeChange={setGridSize} />
      </>
    );
  }
}
function Toolbar() {
    return (
      <div className="toolbar">
       
        <section className="gate-container">
            <h1>Gates</h1>
            <div className="gates">
                <div className="gate-object">X</div>
                <div className="gate-object">Y</div>
                <div className="gate-object">Z</div>
                <div className="gate-object">H</div>
                <Example />
            </div>
        </section>
      </div>
    );
  }

  function Example() {
    const [parent, setParent] = useState(null);
    const draggable = (
      <Draggable id="draggable">
        Go ahead, drag me.
      </Draggable>
    );
  
    return (<div>
      <DndContext onDragEnd={handleDragEnd}>
        {!parent ? draggable : null}
        <Droppable id="droppable">
        {parent === "droppable" ? draggable : 'Drop here'}
      </Droppable>
      </DndContext></div>
    );
  
    function handleDragEnd({over}:any) {
      setParent(over ? over.id : null);
    }
  }

  function Droppable(props:any) {
    const {isOver, setNodeRef} = useDroppable({
      id: props.id,
    });
    const style = {
      opacity: isOver ? 1 : 0.5,
    };
  
    return (
      <div ref={setNodeRef} style={style}>
        {props.children}
      </div>
    );
  }

  function Draggable(props:any) {
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
      id: props.id,
    });
    const style = {
      // Outputs `translate3d(x, y, 0)`
      transform: CSS.Translate.toString(transform),
    };
  
    return (<div>
      <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
        {props.children}
      </button></div>
    );
  }
  
  export default Toolbar;