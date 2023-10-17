import React, { useState } from 'react';
import PropTypes from "prop-types";
import {
  postupdate
} from '../../../services/OrganigrammeService'

const propTypes = {
  nodeData: PropTypes.object.isRequired
};

const colors = [
  '#6E6B6F',
  '#18A8B6',
  '#F45754',
  '#96C62C',
  '#BD7E16',
  '#802F74',
];

const TreeNode = ({ nodeData, setsource }) => {
  console.log(setsource)
  var data = nodeData
  const color = colors[nodeData.postion];
  const imageDim = 80;
  const lightCircleDim = 95;
  const outsideCircleDim = 110;
  const onDrop = async (e)=> {
    let sourceid = e.nativeEvent.srcElement.offsetParent.id
    let targetid = e.nativeEvent.target.offsetParent.id
    // if(sourceid.startsWith("P_")) {

    // }
    // let obj = {
    //   nodeId: nodeData.id.replace("P_", ""),
    //   parentNodeId: id.replace("P_", ""),
    // }
    console.log(e)
    // const datametierexistant = await postupdate(obj)
    // await datametierexistant
  }
  return (
    <div
      style={{
        backgroundColor: 'white',
        height: '186px'
      }}
      onDrop= {onDrop}
      draggable={true}
    >
      <div
        style={{
          backgroundColor: color,
          marginTop: `0`,
          marginLeft: `21.5px`,
          borderRadius: '100px',
          width: `110px`,
          height: `110px`,
        }}
      ></div>
      <div
        style={{
          backgroundColor: '#ffffff',
          marginTop: `-102px`,
          marginLeft: `30px`,
          borderRadius: '100px',
          width: `95px`,
          height: `95px`,
        }}
      >
        <img
          src={data.imageUrl}
          style={{
            borderRadius: '100px',
            width: `95px`,
            height: `95px`,
          }}
        />
      </div>
      
      <div
        className="card"
        style={{
          marginTop:"15px",
          height: '30px',
          width: `153px`,
          backgroundColor: '#3AB6E3',
        }}
      >
        <div
          style={{
            backgroundColor: color,
            height: '28px',
            textAlign: 'center',
            paddingTop: '10px',
            color: '#ffffff',
            fontWeight: 'bold',
            fontSize: '16px',
          }}
        >
          {data.personne}
        </div>
        <div
          style={{
            backgroundColor: '#F0EDEF',
            height: '28px',
            textAlign: 'center',
            paddingTop: '10px',
            color: '#424142',
            fontSize: '16px',
          }}
        >
          {data.titre}
        </div>
      </div>
    </div>
  );
}

export default TreeNode;