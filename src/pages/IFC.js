import React from 'react';
import { IfcViewerAPI } from 'web-ifc-viewer';

class App extends React.Component {
    componentDidMount() {
        const container = document.getElementById('viewer-container');
        const viewer = new IfcViewerAPI({ container });
        viewer.addAxes();
        viewer.addGrid();
        viewer.IFC.setWasmPath('../../');

        this.viewer = viewer;

        window.onmousemove = viewer.prepickIfcItem;
        window.ondblclick = viewer.addClippingPlane
    }
}

const IFC = () => {
    return (
        <div>
            test
        </div>
    );
};

export default IFC;