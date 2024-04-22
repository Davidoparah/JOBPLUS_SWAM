import React, {useState, useEffect} from 'react';
import '../styles/form.scss';

import Alert from '../alert/Alert';

import profileService from '../../services/ProfileService';
import sectorService from '../../services/SectorService';
import jobTypesService from '../../services/JobTypesService';

export default function profile() {
  const [profileData, setProfileData] = useState({
    desired_job_title: '',
    min_per_anum_salary: '',
    experience: '',
    job_types: [],
    sector: {},
  });
  const [sectors, setSectors] = useState([]);
  const [jobTypes, setJobTypes] = useState([]);
  const [alert, setAlert] = useState({});

  const { fetchSectors } = sectorService();
  const { fetchJobTypes } = jobTypesService();
  const { fetchProfile, saveProfile } = profileService();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setProfileData({
      ...profileData,
      [name]: name === 'sector' ? {id: parseInt(value)} : value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    const valueAsNumber = parseInt(value); // Convert the value to a number

    let updatedJobTypes = checked
      ? [...profileData.job_types, { id: valueAsNumber }]
      : profileData.job_types.filter(jt => jt.id !== valueAsNumber);

    setProfileData(prevData => ({
      ...prevData,
      job_types: updatedJobTypes,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    try {
      // Save the profile data
      saveProfile(profileData, (res) => {
        console.log(res);
      });
      setAlert({
        message: 'Profile updated successfully',
        details: [],
        type: 'success',
      });
    } catch (err) {
      setAlert(err);
    }
  }

  useEffect(() => {
    // Fetch the profile data
    fetchProfile((profileRes) => {
      if (profileRes.data) {
        setProfileData({
          desired_job_title: profileRes.data.desired_job_title,
          min_per_anum_salary: profileRes.data.min_per_anum_salary,
          experience: profileRes.data.experience,
          job_types: profileRes.data.job_types.map((jobType) => ({id: jobType.id})),
          sector: {id: profileRes.data.sector.id},
        });
      }
    });

    // Fetch the job types
    fetchJobTypes((jobTypesRes) => {
      if (jobTypesRes.data) {
        setJobTypes(jobTypesRes.data.data);
      }
    });

    // Fetch the sectors
    fetchSectors((sectorsRes) => {
      if (sectorsRes.data) {
        setSectors(sectorsRes.data);
      }
    });
  }, []);

  return (
    <>
      <Alert data={alert} />
      <form className="form form--page" onSubmit={handleSubmit}>
        <div className="form__group form__group--page">
          <label className="form__label">Desired job title</label>
          <input
            className="form__field"
            type="text"
            placeholder="Desired job title"
            name="desired_job_title"
            value={profileData.desired_job_title}
            onChange={handleInputChange}
          />
        </div>

        <div className="form__group form__group--page">
          <label className="form__label">Min per annum salary</label>
          <input
            className="form__field"
            type="text"
            placeholder="Min per annum salary"
            name="min_per_anum_salary"
            value={profileData.min_per_anum_salary}
            onChange={handleInputChange}
          />
        </div>

        <div className="form__group form__group--page">
          <label className="form__label">Job type</label>
          {jobTypes.map((jobType) => (
            <p className="form__checkbox" key={jobType.id}>
              <input 
              type="checkbox"
              name="job_types"
              value={jobType.id}
              checked={profileData.job_types.some(jt => jt.id === jobType.id)}
              onChange={handleCheckboxChange}
              /> {jobType.attributes.title}
            </p>
          ))}
        </div>

        <div className="form__group form__group--page">
          <label className="form__label">Sector</label>
          <br />
          <select 
            className="form__select"
            name="sector"
            value={profileData.sector.id}
            onChange={handleInputChange}
          >
            <option selected="">Choose a sector</option>
            {sectors.map((sector) => (
              <option key={sector.id} value={sector.id}>{sector.title}</option>
            ))}
          </select>
        </div>

        <div className="form__group form__group--page">
          <label className="form__label">Experience</label>
          <br />
          <textarea 
            className="form__textarea"
            name="experience"
            value={profileData.experience}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <div className="form__group form__group--page">
          <input className="form__btn" type="submit" value="Submit" />
        </div>
      </form>
    </>
  );
}
