import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import { v4 as uuidv4 } from 'uuid';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';


import { makeStyles } from '@material-ui/core/styles';
import { FormControlLabel } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  button: {
    margin: theme.spacing(1),
  }
}))

function App() {
  const classes = useStyles()
  const [inputFields, setInputFields] = useState([
    { id: uuidv4(), firstName: '', lastName: '', courses: [], degree: 'bachelor' },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("InputFields", inputFields);
  };

  const handleChangeInput = (id, event) => {
    const { name, value } = event.target;
    const newInputFields = inputFields.map((i) => {
      if (id === i.id) {
        if (name === 'courses') {
          i.courses = Array.isArray(i.courses)
            ? event.target.checked
              ? [...i.courses, value]
              : i.courses.filter((course) => course !== value)
            : [value]; // Initialize as an array if undefined
        } else {
          i[name] = value;
        }
      }
      return i;
    });
  
    setInputFields(newInputFields);
  };

  const handleAddFields = () => {
    setInputFields([...inputFields, { id: uuidv4(), firstName: '', lastName: '' }])
  }

  const handleRemoveFields = id => {
    const values = [...inputFields];
    values.splice(values.findIndex(value => value.id === id), 1);
    setInputFields(values);
  }

  return (
    <Container>
      <h1>Add New Member</h1>
      <form className={classes.root} onSubmit={handleSubmit}>
        {inputFields.map((inputField) => (
          <div key={inputField.id}>
            <TextField
              name="firstName"
              label="First Name"
              variant="filled"
              value={inputField.firstName}
              onChange={(event) => handleChangeInput(inputField.id, event)}
            />
            <RadioGroup
              name="degree"
              value={inputField.degree}
              onChange={(event) => handleChangeInput(inputField.id, event)}
            >
              <FormControlLabel
                value="bachelor"
                control={<Radio />}
                label="Bachelor"
              />
              <FormControlLabel
                value="master"
                control={<Radio />}
                label="Master"
              />
              <FormControlLabel
                value="phd"
                control={<Radio />}
                label="Ph.D."
              />
            </RadioGroup>

            <div>
              <Checkbox
                name="courses"
                value="math"
                checked={Array.isArray(inputField.courses) && inputField.courses.includes('math')}
                onChange={(event) => handleChangeInput(inputField.id, event)}
              />

              Math
              <Checkbox
                name="courses"
                value="science"
                checked={Array.isArray(inputField.courses) && inputField.courses.includes('science')}
                onChange={(event) => handleChangeInput(inputField.id, event)}
              />
              Science
              <Checkbox
                name="courses"
                value="history"
                checked={Array.isArray(inputField.courses) && inputField.courses.includes('history')}
                onChange={(event) => handleChangeInput(inputField.id, event)}
              />
              History
            </div>
            <IconButton
              disabled={inputFields.length === 1}
              onClick={() => handleRemoveFields(inputField.id)}
            >
              <RemoveIcon />
            </IconButton>
            <IconButton onClick={handleAddFields}>
              <AddIcon />
            </IconButton>
          </div>
        ))}

        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          type="submit"
          endIcon={<Icon>send</Icon>}
          onClick={handleSubmit}
        >Send</Button>
      </form>
    </Container>
  );
}

export default App;
