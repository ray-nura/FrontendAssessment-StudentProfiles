import { useEffect, useState, createContext } from 'react';
import axios from 'axios'

export const Context = createContext();

export const Provider = ({ children }) => {
    const [fetchedData, setFetchedData] = useState();
    const [studentsTags, setStudentsTags] = useState([{ id: '', tags: [] }]);
    const URL = 'https://api.hatchways.io/assessment/students'
    const getData = async () => {
        const res = await axios.get(URL);
        const data = await res.data;
        setFetchedData(data.students);
    }
    useEffect(() => {
        getData()
    }, [])


    const passData = (t, i) => {
        const foundIndex = studentsTags.findIndex(student => student.id === i)
        const newDataTags = studentsTags;
        if (foundIndex > 0) {
            let foundStudent = studentsTags?.filter(student => student.id === i)
            foundStudent[0].tags.push(t)
            newDataTags[foundIndex] = foundStudent[0]
            setStudentsTags(newDataTags)
        } else {
            const tag = { id: i, tags: [t] };
            setStudentsTags([...newDataTags, tag])
        }
    }
    const tagDelete = (indx, idSt) => {
        const foundIndex = studentsTags.findIndex(student => student.id === idSt)
        const newDataTags = studentsTags;
        let foundStudent = studentsTags?.filter(student => student.id === idSt)
        foundStudent[0].tags.splice(indx, 1)
        newDataTags[foundIndex] = foundStudent[0]
        setStudentsTags(newDataTags)
    }


    const data = {
        fetchedData: fetchedData,
        studentsTags: studentsTags,
        setStudentsTags: setStudentsTags,
        passData: passData,
        tagDelete: tagDelete
    }

    return <Context.Provider value={data}>{children}</Context.Provider>
}
