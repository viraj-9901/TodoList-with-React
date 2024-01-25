import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions }  from '@mui/material/Autocomplete';
import axios from 'axios';
import toast from 'react-hot-toast';

function AutoCompleteComponent({getSelectedUsers, selectedUsers}) {
    const [options, setOptions] = useState([])
    const [value, setValue] = useState(null)
    const [inputValue, setInputValue] = useState('');
    const username = window.location.pathname.split('/')[2]

    useEffect(() => {

        axios.get(`${process.env.REACT_APP_URI_DOMAIN_PORT}/user/${username}/getAllUsers/${inputValue}`,
        {
            withCredentials: true,
        })
        .then((response) => setOptions(response.data.data))

    

    }, [inputValue])

    const filterOptions = createFilterOptions({
        matchFrom: 'start',
        stringify: (option) => option.username,
      });
  return (
    <div>
        <Autocomplete
            id='find-users'
            options={options}
            getOptionLabel={(option) => option.username}
            filterOptions={filterOptions}
            autoComplete
            includeInputInList
            value={value}
            noOptionsText="No User"
            onChange={(event, newValue) => {
                setOptions(newValue ? [ ...options, newValue ] : options);
                // setValue(newValue);
                setOptions([])
                getSelectedUsers(newValue)
                
            }}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
            }}
            renderInput={(params) => (
                <TextField {...params} placeholder='Select User' fullWidth variant="standard" 
                sx={{
                    '& .MuiInput-underline:before': { borderBottomColor: 'white' },
                    '& .MuiInput-underline:after': { borderBottomColor: 'white' },
                    input: { color: 'white', fontSize: 17 }
                  }}
                
                
                />
            )}
            
            className="form-input block w-full rounded-lg leading-none focus:outline-none placeholder-white/50  
                              [ transition-colors duration-200 ] 
                              [ py-3 pr-3 md:py-4 md:pr-4 lg:py-4 lg:pr-4 pl-5 ] 
                              [ bg-transparent focus:bg-transparent ] 
                              [ text-white focus:text-white ] 
                              [ border-[1px] border-solid border-white/40 border-opacity-10 focus:border-white/90]"
        />
    </div>

  )
}

export default AutoCompleteComponent