import React from 'react';

const PassengerForm = ({ passenger, index, onChange, onRemove, showRemove }) => {
    const handleChange = (e) => {
        onChange(index, e.target.name, e.target.value);
    };

    // Passenger Form needs: Name, DOB, Type, etc.
    // Assuming basic fields for now. 
    /* 
      Usually: Name, Age, Type (Adult/Child), Gender
    */

    return (
        <div className="card" style={{ padding: '15px', marginBottom: '10px', borderLeft: '4px solid var(--accent-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <h4>Passenger {index + 1}</h4>
                {showRemove && <button type="button" onClick={() => onRemove(index)} className="btn btn-danger" style={{ padding: '5px 10px', fontSize: '0.8rem' }}>Remove</button>}
            </div>

            <div className="form-group">
                <label>Full Name</label>
                <input type="text" name="passengerName" value={passenger.passengerName} onChange={handleChange} required placeholder="Name as per ID" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div className="form-group">
                    <label>Age</label>
                    <input type="number" name="age" value={passenger.age} onChange={handleChange} required min="1" max="120" />
                </div>
                <div className="form-group">
                    <label>Gender</label>
                    <select name="gender" value={passenger.gender} onChange={handleChange} required>
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
            </div>
            <div className="form-group">
                <label>Passenger Type</label>
                <select name="passengerType" value={passenger.passengerType} onChange={handleChange} required>
                    <option value="Adult">Adult</option>
                    <option value="ChildWithBed">Child With Bed</option>
                    <option value="ChildWithoutBed">Child Without Bed</option>
                </select>
            </div>
        </div>
    );
};

export default PassengerForm;
