import './App.css';
import { useEffect, useState, useContext } from 'react';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { Box } from '@mui/system';
import { Paper, TextField } from '@mui/material';
import StudentCard from './components/StudentCard';
import { Context } from './components/ProviderContext';

function App() {
  const { fetchedData, studentsTags } = useContext(Context)
  const [students, setStudents] = useState();
  const [searchName, setSearchName] = useState('');
  const [searchTag, setSearchTag] = useState('');
  useEffect(() => {
    setStudents(fetchedData)
  }, [fetchedData])

  useEffect(() => {
    let newDataTag = [];
    let newDataname = [];
    if (searchTag.length > 1) {
      newDataTag = handleSearchTag(); setStudents(newDataTag);
    }
    if (searchName.length > 1) {
      newDataname = handleSearchName(); setStudents(newDataname);
    }
    if (searchTag.length > 1 && searchName.length > 1) {
      const result = newDataname.filter(c => newDataTag.findIndex(x => x.id == c.id) > -1)
      setStudents(result)
    }
    if (searchName.length === 0 && searchTag.length === 0) {
      setStudents(fetchedData)
    }
  }, [searchTag, searchName])

  const handleSearchName = () => {
    return fetchedData.filter(student => {
      return (student.lastName.toLowerCase().includes(searchName.toLowerCase()) || student.firstName.toLowerCase().includes(searchName.toLowerCase()))
    })
  };
  const handleSearchTag = () => {
    const foundTags = studentsTags.filter(student => { return student.tags.includes(searchTag) })
    const result = fetchedData.filter(c => foundTags.findIndex(x => x.id == c.id) > -1)
    return result
  };
  return (
    <Box marginTop={10}
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 'auto',
          width: 1000,
          height: 800,
        },
      }}
    >
      <Paper elevation={2} style={{ overflow: 'auto' }}>
        <TextField id="hidden-label-normal" fullWidth placeholder="Search by name" variant="standard" margin="normal"
          value={searchName} onChange={(e) => setSearchName(e.target.value)} />
        <TextField id="hidden-label-normal" fullWidth placeholder="Search by name" variant="standard" margin="normal"
          value={searchTag} onChange={(e) => setSearchTag(e.target.value)} />
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>

          {students?.map((student) => {
            return (
              <>
                <StudentCard student={student} />
                <Divider />
              </>
            )
          })}
        </List>
      </Paper>
    </Box>
  );
}

export default App;

