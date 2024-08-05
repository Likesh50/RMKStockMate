import React, { useState } from 'react';
import styled from 'styled-components';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import axios from 'axios';
import dayjs from 'dayjs';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  border-radius: 8px;
  background: #ffffff;
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 10px;
  color: #164863;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-weight: bold;
  color: #164863;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  background: white;
  &:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 5px #164863;
  }
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  background: white;
  width: 200px;
  &:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
`;

const MealSection = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 10px;
  background-color: #ffffff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
`;

const MealHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`;

const ItemEntry = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  align-items: center;
`;

const Button = styled.button`
  padding: 8px 12px;
  cursor: pointer;
  background-color: #164863;
  text-align: center;
  color: white;
  border: none;
  border-radius: 20px;
  font-size: 0.875rem;
  transition: background-color 0.3s, transform 0.2s;
  &:hover {
    background-color: #1D4F6F;
    transform: scale(1.05);
  }
  &:not(:last-child) {
    margin-right: 10px;
  }
`;

const Holder = styled.div`
  text-align: center;
`;

const AddEvent = () => {
  const [eventName, setEventName] = useState('');
  const [institution, setInstitution] = useState('');
  const [mealSections, setMealSections] = useState([{ mealType: '', items: [{ name: '', quantity: '' }] }]);
  const [eventDate, setEventDate] = useState(null);

  const handleAddMealSection = () => {
    setMealSections([...mealSections, { mealType: '', items: [{ name: '', quantity: '' }] }]);
  };

  const handleMealTypeChange = (index, value) => {
    const updatedMealSections = mealSections.map((section, i) =>
      i === index ? { ...section, mealType: value } : section
    );
    setMealSections(updatedMealSections);
  };

  const handleItemChange = (mealIndex, itemIndex, field, value) => {
    const updatedMealSections = mealSections.map((section, i) =>
      i === mealIndex
        ? {
            ...section,
            items: section.items.map((item, j) =>
              j === itemIndex ? { ...item, [field]: value } : item
            ),
          }
        : section
    );
    setMealSections(updatedMealSections);
  };

  const handleAddItem = (mealIndex) => {
    const updatedMealSections = mealSections.map((section, i) =>
      i === mealIndex
        ? { ...section, items: [...section.items, { name: '', quantity: '' }] }
        : section
    );
    setMealSections(updatedMealSections);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Format the event date
    const formattedEventDate = eventDate ? dayjs(eventDate).format('YYYY-MM-DD') : null;
  
    // Construct the event details in the required format
    const eventDetails = {
      event_name: eventName,
      institution: institution,
      event_date: formattedEventDate,
      meal_details: mealSections.map(section => ({
        mealType: section.mealType,
        items: section.items.map(item => ({
          name: item.name,
          quantity: parseInt(item.quantity, 10) // Convert quantity to integer
        }))
      }))
    };
  
    // Send data to the backend
    axios.post('http://localhost:3002/event/addevent', eventDetails)
      .then(response => {
        console.log(response.data);
        // handle success
        alert('Form has been successfully submitted!');
        // Clear form data
        setEventName('');
        setInstitution('');
        setMealSections([{ mealType: '', items: [{ name: '', quantity: '' }] }]);
        setEventDate(null);
      })
      .catch(error => {
        console.error("There was an error submitting the form!", error);
        // handle error
        alert('There was an error submitting the form. Please try again.');
      });
  };
  
  return (
    <Form onSubmit={handleSubmit}>
      <Section>
        <SectionTitle>Event Details</SectionTitle>
        <FormGroup>
          <Label>Event Name:</Label>
          <Input
            type="text"
            name="eventName"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Institution:</Label>
          <Input
            type="text"
            name="institution"
            value={institution}
            onChange={(e) => setInstitution(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Date:</Label>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={eventDate}
              onChange={(newValue) => setEventDate(newValue)}
              renderInput={(params) => <Input {...params} />}
              required
            />
          </LocalizationProvider>
        </FormGroup>
      </Section>
      <Section>
        <SectionTitle>Meal Details</SectionTitle>
        {mealSections.map((mealSection, mealIndex) => (
          <MealSection key={mealIndex}>
            <MealHeader>
              <FormGroup style={{ flexGrow: 1 }}>
                <Label>Meal Type:</Label>
                <Select
                  value={mealSection.mealType}
                  onChange={(e) => handleMealTypeChange(mealIndex, e.target.value)}
                  required
                >
                  <option value="">Select Meal Type</option>
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
                  <option value="Snacks">Snacks</option>
                  <option value="Beverages">Beverages</option>
                </Select>
              </FormGroup>
              <Button type="button" onClick={() => handleAddItem(mealIndex)}>
                Add Item
              </Button>
            </MealHeader>
            {mealSection.items.map((item, itemIndex) => (
              <ItemEntry key={itemIndex}>
                <FormGroup style={{ flexGrow: 1 }}>
                  <Label>Item Name:</Label>
                  <Input
                    type="text"
                    value={item.name}
                    onChange={(e) =>
                      handleItemChange(mealIndex, itemIndex, 'name', e.target.value)
                    }
                    required
                  />
                </FormGroup>
                <FormGroup style={{ flexGrow: 1 }}>
                  <Label>Quantity:</Label>
                  <Input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleItemChange(mealIndex, itemIndex, 'quantity', e.target.value)
                    }
                    required
                  />
                </FormGroup>
              </ItemEntry>
            ))}
          </MealSection>
        ))}
      </Section>
      <Holder>
        <Button type="button" onClick={handleAddMealSection}>
          Add Meal Type
        </Button>
        <Button type="submit">Submit</Button>
      </Holder>
    </Form>
  );
};

export default AddEvent;
