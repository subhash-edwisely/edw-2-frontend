import { Chip, Paper, Stack, Typography } from '@mui/material'
import React from 'react'
import { Panel } from 'react-resizable-panels'

const ProblemDescriptionSection = ({problemData}) => {

  const {title, difficulty} = problemData;

  return (
    <Panel minSize={5}>

      {/* for components having card-like appearance */}
      <Paper
        sx={{
          height: "100%",
          bgcolor: "grey.1200",
          color: "white",
          p: 2,
          overflowY: "auto"
        }}
      >
        
        <Typography variant='h5'>
          {title}
        </Typography>

        <Chip
          bgcolor = "success.900"
          label = {difficulty}
          color = {difficulty === "Easy" ? "success" : difficulty === "Medium" ? "warning" : difficulty === "Hard" ? "error" : "grey.1300"}  
          size="small"
        />

        <Stack />

      </Paper>
    
    
    </Panel>
  )
}

export default ProblemDescriptionSection