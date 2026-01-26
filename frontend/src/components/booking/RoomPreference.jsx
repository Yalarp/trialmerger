import React from 'react';

const RoomPreference = ({ value, onChange }) => {
    return (
        <div className="card">
            <h3>Room Preference</h3>
            <div className="form-group">
                <label style={{ fontWeight: 'normal', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <input type="radio" name="roomType" value="AUTO" checked={value === 'AUTO'} onChange={(e) => onChange(e.target.value)} style={{ width: 'auto' }} />
                    Auto Assign
                </label>
            </div>
            <div className="form-group">
                <label style={{ fontWeight: 'normal', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <input type="radio" name="roomType" value="ODD_SINGLE_TWIN" checked={value === 'ODD_SINGLE_TWIN'} onChange={(e) => onChange(e.target.value)} style={{ width: 'auto' }} />
                    Odd Single / Twin
                </label>
            </div>
            <div className="form-group">
                <label style={{ fontWeight: 'normal', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <input type="radio" name="roomType" value="ALL_TWIN_RANDOM" checked={value === 'ALL_TWIN_RANDOM'} onChange={(e) => onChange(e.target.value)} style={{ width: 'auto' }} />
                    All Twin / Random
                </label>
            </div>
        </div>
    );
};

export default RoomPreference;
