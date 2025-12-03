import { Box, Button, Divider, MenuItem, Select } from '@mui/material'
import { MoonStar, Sun } from 'lucide-react'
import React from 'react'

const CodeEditorMenu = ({editorTheme, setEditorTheme, language, setLanguage}) => {

    const changeEditorTheme = () => {
        if(editorTheme === "vs-light") {
            setEditorTheme('vs-dark');
        }
        else {
            setEditorTheme("vs-light");
        }
    };

    const changeEditorLanguage = (e) => {
        setLanguage(e.target.value);
    };

  return (
    <Box sx={{width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", p: 1, bgcolor: "grey.1200"}}>
        <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px" }}>
            <Select defaultValue={language} onChange={(e) => {changeEditorLanguage(e)}} size="small" sx={{bgcolor: "grey.1300", color: "additionalColorPalette.textColor"}}>
                <MenuItem value="python">Python</MenuItem>
                <MenuItem value="java">Java</MenuItem>
                <MenuItem value="cpp">C++</MenuItem>
            </Select>

            <Divider sx={{width: "2px", height: "20px", bgcolor: "grey.1300"}} />

            <Box sx={{cursor: "pointer"}}>
                {editorTheme === "vs-light" ? <MoonStar onClick={changeEditorTheme} color='white' opacity={0.7} width={16} height={16} /> : <Sun onClick={changeEditorTheme} color='white' opacity={0.7} width={16} height={16} />}
            </Box>

        </Box>
        
        <Box sx={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
            <Button>Run</Button>
            <Button>Submit</Button>
        </Box>
    </Box>
  )
}

export default CodeEditorMenu