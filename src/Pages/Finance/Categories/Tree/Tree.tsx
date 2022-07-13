import React, { useState } from 'react'


const Tree = ({ data = [] }) => {
    return (
        <div className="d-tree">
            <ul className="tree">
                {/* <ul className="d-flex d-tree-container flex-column"> */}
                {data.map((tree) => (
                    <TreeNode node={tree} />
                ))}
            </ul>
        </div>
    );
};

const TreeNode:React.FC<any> = ({ node }) => {
    const [childVisible, setChildVisiblity] = useState(false);
    const hasChild = node.children ? true : false;
    return (
        <li className="d-tree-node border-0 py-0 ">
            <span className="d-flex hoverClass">
                {hasChild && (
                    <div
                        className={`d-inline d-tree-toggler cirdularDesign ${childVisible ? "active" : ""
                            }`}
                    >
                        <i className={childVisible ? "fa fa-minus" : "fa fa-plus"} onClick={(e) => setChildVisiblity((v) => !v)}></i>
                    </div>
                )}
                <div className="col d-tree-head">
                    <i className={`mr-1 ${node.level <= 4 ? childVisible ? "fa fa-folder-open" : "fa fa-folder" : childVisible ? "fa fa-file" : "fa fa-file"}  icon-color-${node.level}`}> </i>
                    {node.name}
                </div>
            </span>

            {hasChild && childVisible && (
                <div className="d-tree-content">
                    <ul className="d-flex d-tree-container flex-column">
                        <Tree data={node.children} />
                    </ul>
                </div>
            )}
        </li>
    );
};

export default Tree;
