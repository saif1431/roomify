import React from 'react'
import { useParams } from 'react-router'

function Visualizer() {
      const { id } = useParams()
      return (
            <div>Visualizer ID: {id}</div>
      )
}

export default Visualizer