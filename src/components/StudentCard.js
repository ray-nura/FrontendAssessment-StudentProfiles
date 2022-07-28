import React, { useState, useContext, useEffect } from 'react'
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { grey } from '@mui/material/colors';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';
import { Chip, IconButton, Stack, TextField } from '@mui/material';
import Grades from './Grades';
import { Context } from './ProviderContext';

export default function StudentCard({ student }) {
    const { studentsTags, passData, tagDelete } = useContext(Context)
    const [tag, setTag] = useState('')
    const [tags, setTags] = useState([])
    const [show, setShow] = useState(false);
    const [uI, setUI] = useState(false);

    let theme = createTheme();
    theme = responsiveFontSizes(theme);

    const handleTag = (e) => {
        let val = e.target.value;
        setTag(val)
    }

    const handleDelete = (i) => {
        tagDelete(i, student.id);
        setUI(!uI)
    }
    const createTagsOfArray = () => {
        passData(tag, student.id);
        setTag('')
    }
    useEffect(() => {
        const currStudentTags = studentsTags?.filter((t) => { return student.id === t.id })
        setTags(currStudentTags)
    }, [studentsTags])

    return (
        <ListItem alignItems="flex-start" key={student.id}>
            <ThemeProvider theme={theme}>
                <ListItemAvatar>
                    <Avatar alt={student.firstName} src={student.pic}
                        sx={{ width: 100, height: 100, border: 1, borderColor: grey[300], margin: 2 }}
                    />
                </ListItemAvatar>

                <ListItemText primary={<Typography variant="h4" sx={{ fontFamily: 'Raleway' }} >
                    {student.firstName.toUpperCase()} {student.lastName.toUpperCase()}</Typography>}
                    secondary={
                        <>
                            <Typography >Email: {student.email}</Typography>
                            <Typography > Company: {student.company}</Typography>
                            <Typography > Skill: {student.skill}</Typography>
                            <Typography marginBottom={1}> Average: {student.grades.reduce((a, b) =>
                                parseInt(a) + parseInt(b)) / student.grades.length}</Typography>
                            {show && <Grades grade={student.grades} />}
                            <Stack direction="row" spacing={1}>
                                <>
                                    {tags.length > 0 && tags[0].tags.map((tag, index) => { return (<Chip label={tag} key={index} onDelete={() => handleDelete(index)} />) })}
                                </>
                            </Stack>

                            <TextField id="hidden-label-normal" placeholder="Add a tag" variant="standard" margin="normal"
                                onChange={handleTag} value={tag}
                                onKeyPress={(e) => { if (e.key === "Enter") { createTagsOfArray(); } }}
                            />
                        </>
                    }
                />
                <IconButton aria-label="previous" size="large"
                    onClick={() => setShow(!show)}>
                    {show ? <RemoveIcon fontSize="inherit" /> : <AddIcon fontSize="inherit" />}
                </IconButton>
            </ThemeProvider>
        </ListItem>
    )
}
