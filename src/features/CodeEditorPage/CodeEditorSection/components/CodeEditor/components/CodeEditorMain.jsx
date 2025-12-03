import { Editor } from '@monaco-editor/react'
import { Box } from '@mui/material'
import React from 'react'

const CodeEditorMain = ({editorTheme, language}) => {
  return (
    <Box sx={{height: "100%"}}>
        <Editor 
            height={"100%"}
            language={language}
            theme={editorTheme}
        />
    </Box>
  )
}

export default CodeEditorMain